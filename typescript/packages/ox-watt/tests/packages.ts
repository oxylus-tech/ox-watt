
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { PackageManager } from '@/packages'
import type { Package } from '@/packages'

const { registerMock } = vi.hoisted(() => ({
    registerMock: vi.fn(),
}))

vi.mock('../src/i18n', () => ({
    i18n: {
        register: registerMock,
    },
}))

describe('PackageManager', () => {
    let manager: PackageManager

    beforeEach(() => {
        manager = new PackageManager()
        registerMock.mockReset()
        registerMock.mockResolvedValue(undefined)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('use', () => {
        it('should initialize a package without locales or install callback', async () => {
            const pkg: Package = {
                name: 'test-package',
            }

            await expect(manager.use(pkg)).resolves.toBeUndefined()

            expect(registerMock).not.toHaveBeenCalled()
        })

        it('should register locales before calling install', async () => {
            const order: string[] = []

            registerMock.mockImplementation(async () => {
                order.push('register')
            })

            const pkg: Package = {
                name: 'test-package',
                locales: {
                    en: async () => ({}),
                },
                install: async () => {
                    order.push('install')
                },
            }

            await manager.use(pkg)

            expect(order).toEqual(['register', 'install'])
        })

        it('should pass the package to its install callback', async () => {
            const install = vi.fn()

            const pkg: Package = {
                name: 'test-package',
                install,
            }

            await manager.use(pkg)

            expect(install).toHaveBeenCalledOnce()
            expect(install).toHaveBeenCalledWith(pkg)
        })

        it('should initialize a package only once', async () => {
            const install = vi.fn()

            const pkg: Package = {
                name: 'test-package',
                locales: {
                    en: async () => ({}),
                },
                install,
            }

            await manager.use(pkg)
            await manager.use(pkg)

            expect(registerMock).toHaveBeenCalledOnce()
            expect(install).toHaveBeenCalledOnce()
        })

        it('should share the initialization promise between concurrent calls', async () => {
            let resolveInstall!: () => void

            const installPromise = new Promise<void>((resolve) => {
                resolveInstall = resolve
            })

            const install = vi.fn(() => installPromise)

            const pkg: Package = {
                name: 'test-package',
                install,
            }

            const first = manager.use(pkg)
            const second = manager.use(pkg)

            expect(install).toHaveBeenCalledOnce()

            resolveInstall()

            await expect(Promise.all([first, second])).resolves.toEqual([
                undefined,
                undefined,
            ])

            expect(install).toHaveBeenCalledOnce()
        })

        it('should allow retrying initialization after a failure', async () => {
            const install = vi.fn()
                .mockRejectedValueOnce(new Error('Installation failed'))
                .mockResolvedValueOnce(undefined)

            const pkg: Package = {
                name: 'test-package',
                install,
            }

            await expect(manager.use(pkg)).rejects.toThrow('Installation failed')

            await expect(manager.use(pkg)).resolves.toBeUndefined()

            expect(install).toHaveBeenCalledTimes(2)
        })

        it('should allow retrying locale registration after a failure', async () => {
            registerMock
                .mockRejectedValueOnce(new Error('Locale registration failed'))
                .mockResolvedValueOnce(undefined)

            const pkg: Package = {
                name: 'test-package',
                locales: {
                    en: async () => ({}),
                },
            }

            await expect(manager.use(pkg)).rejects.toThrow(
                'Locale registration failed',
            )

            await expect(manager.use(pkg)).resolves.toBeUndefined()

            expect(registerMock).toHaveBeenCalledTimes(2)
        })

        it('should reject packages without a name', async () => {
            const pkg = {
                name: '',
            } as Package

            await expect(manager.use(pkg)).rejects.toThrow(
                'A package must have a name.',
            )
        })

        it('should initialize multiple packages sequentially', async () => {
            const order: string[] = []

            const first: Package = {
                name: 'first-package',
                install: async () => {
                    order.push('first')
                },
            }

            const second: Package = {
                name: 'second-package',
                install: async () => {
                    order.push('second')
                },
            }

            const third: Package = {
                name: 'third-package',
                install: async () => {
                    order.push('third')
                },
            }

            await manager.use(first, second, third)

            expect(order).toEqual(['first', 'second', 'third'])
        })

        it('should not initialize subsequent packages if one fails', async () => {
            const secondInstall = vi.fn()

            const first: Package = {
                name: 'first-package',
                install: async () => {
                    throw new Error('Installation failed')
                },
            }

            const second: Package = {
                name: 'second-package',
                install: secondInstall,
            }

            await expect(manager.use(first, second)).rejects.toThrow(
                'Installation failed',
            )

            expect(secondInstall).not.toHaveBeenCalled()
        })
    })
})
