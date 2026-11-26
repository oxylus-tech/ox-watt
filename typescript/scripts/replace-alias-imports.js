
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const defaultSourceDir = path.resolve(scriptDir, "../packages/ox-watt/src")

/**
 * Parses command-line arguments.
 *
 * @returns {{ sourceDir: string, dryRun: boolean }}
 */
function parseArgs() {
    const args = process.argv.slice(2)

    let sourceDir = defaultSourceDir
    let dryRun = false

    for (let index = 0; index < args.length; index++) {
        const arg = args[index]

        switch (arg) {
            case "--dry-run":
                dryRun = true
                break

            case "--source":
            case "-s":
                if (!args[index + 1]) {
                    throw new Error(`Missing directory after ${arg}`)
                }

                sourceDir = path.resolve(args[++index])
                break

            case "--help":
            case "-h":
                console.log(`
Usage:
    node scripts/replace-alias-imports.mjs [options]

Options:
    --dry-run           Display changes without modifying files
    --source, -s <dir>  Source directory to process
    --help, -h          Display this help
`)
                process.exit(0)

            default:
                throw new Error(`Unknown argument: ${arg}`)
        }
    }

    return { sourceDir, dryRun }
}

/**
 * Converts an @/ alias import into a relative import.
 *
 * @param {string} specifier - Original module specifier.
 * @param {string} filePath - Absolute path of the importing file.
 * @param {string} sourceDir - Source directory used as the alias root.
 * @returns {string} Converted relative module specifier.
 */
function convertImport(specifier, filePath, sourceDir) {
    if (!specifier.startsWith("@/")) {
        return specifier
    }

    const targetPath = path.resolve(sourceDir, specifier.slice(2))
    let relativePath = path.relative(path.dirname(filePath), targetPath)

    relativePath = relativePath.split(path.sep).join("/")

    if (!relativePath.startsWith(".")) {
        relativePath = `./${relativePath}`
    }

    return relativePath
}

/**
 * Processes a source file and replaces all @/ imports.
 *
 * @param {string} filePath - Absolute path of the source file.
 * @param {string} sourceDir - Source directory used as the alias root.
 * @param {boolean} dryRun - Whether to display changes without writing.
 * @returns {boolean} Whether the file contains modifications.
 */
function processFile(filePath, sourceDir, dryRun) {
    const source = fs.readFileSync(filePath, "utf8")

    const updated = source.replace(
        /((?:from\s*|import\s*\(\s*|import\s*)["'])(@\/[^"']+)(["'])/g,
        (match, prefix, specifier, suffix) => {
            return `${prefix}${convertImport(specifier, filePath, sourceDir)}${suffix}`
        }
    )

    if (source === updated) {
        return false
    }

    console.log(`\n${path.relative(sourceDir, filePath)}`)

    if (dryRun) {
        const originalLines = source.split("\n")
        const updatedLines = updated.split("\n")

        for (let index = 0; index < originalLines.length; index++) {
            if (originalLines[index] !== updatedLines[index]) {
                console.log(`- ${originalLines[index]}`)
                console.log(`+ ${updatedLines[index]}`)
            }
        }
    } else {
        fs.writeFileSync(filePath, updated)
        console.log("  Updated")
    }

    return true
}

/**
 * Recursively processes TypeScript, JavaScript and Vue files.
 *
 * @param {string} directory - Directory to process.
 * @param {string} sourceDir - Source directory used as the alias root.
 * @param {boolean} dryRun - Whether to display changes without writing.
 * @returns {number} Number of modified files.
 */
function processDirectory(directory, sourceDir, dryRun) {
    let modifiedCount = 0

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name)

        if (entry.isDirectory()) {
            modifiedCount += processDirectory(entryPath, sourceDir, dryRun)
        } else if (/\.(ts|tsx|js|jsx|vue)$/.test(entry.name)) {
            if (processFile(entryPath, sourceDir, dryRun)) {
                modifiedCount++
            }
        }
    }

    return modifiedCount
}

try {
    const { sourceDir, dryRun } = parseArgs()

    if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
        throw new Error(`Invalid source directory: ${sourceDir}`)
    }

    console.log(`Source directory: ${sourceDir}`)
    console.log(`Mode: ${dryRun ? "Dry run" : "Write"}`)

    const modifiedCount = processDirectory(sourceDir, sourceDir, dryRun)

    console.log(`\n${modifiedCount} file(s) ${dryRun ? "would be modified" : "modified"}.`)
} catch (error) {
    console.error(error.message)
    process.exit(1)
}
