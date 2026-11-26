import { t } from '../i18n'

/**
 * Supported enum member values.
 */
export type EnumValue = string | number

/**
 * Enum member definitions.
 */
export type EnumDefinition = Record<string, EnumValue>

/**
 * An item suitable for selection components.
 */
export interface EnumItem<TValue extends EnumValue = EnumValue> {
    /** Enum member name. */
    key: string

    /** Enum member value. */
    value: TValue

    /** Translated member label. */
    title: string
}

/**
 * Enum class providing values and translation utilities.
 *
 * @typeParam T - Enum member definitions.
 */
export class Enum<T extends EnumDefinition = EnumDefinition> {
    /** Enum member definitions. */
    readonly members: Readonly<T>

    /** Translation namespace. */
    readonly prefix: string

    /**
     * Create an enum instance.
     *
     * @param prefix - Translation namespace.
     * @param members - Enum member definitions.
     */
    protected constructor(prefix: string, members: T) {
        this.prefix = prefix
        this.members = Object.freeze({ ...members })

        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop === 'toString')
                    return target.toString.bind(receiver)

                if (typeof prop === 'string' && prop in target.members)
                    return target.members[prop as keyof T]

                return Reflect.get(target, prop, receiver)
            },
        })
    }

    /**
     * Create an enum instance.
     *
     * @param prefix - Translation namespace.
     * @param members - Enum member definitions.
     * @returns Enum instance with direct member access.
     */
    static create<T extends EnumDefinition>(
        prefix: string,
        members: T,
    ): Enum<T> & T {
        return new Enum(prefix, members) as Enum<T> & T
    }

    /**
     * Create a new instance sharing the same member definitions.
     *
     * @param prefix - New translation namespace.
     * @returns Cloned enum instance.
     */
    clone(prefix: string): Enum<T> & T {
        return Enum.create(prefix, this.members as T)
    }

    /**
     * Return enum member names.
     */
    get keys(): (keyof T)[] {
        return Object.keys(this.members) as (keyof T)[]
    }

    /**
     * Return enum member values.
     */
    get values(): T[keyof T][] {
        return Object.values(this.members) as T[keyof T][]
    }

    /**
     * Return enum member entries.
     */
    get entries(): [keyof T, T[keyof T]][] {
        return Object.entries(this.members) as [keyof T, T[keyof T]][]
    }

    /**
     * Translate an enum or one of its members.
     *
     * @param prop - Optional enum member name or value.
     * @returns Translated enum or member label.
     */
    label(prop?: keyof T | T[keyof T]): string {
        if (prop === undefined) {
            return t(this.prefix)
        }

        const entry = this.entries.find(
            ([key, value]) => key === prop || value === prop,
        )

        if (!entry)
            return String(prop)

        const [key, value] = entry

        for (const candidate of [key, value]) {
            const name = String(candidate)
            const direct = `${this.prefix}.${name}`

            const translated = t(direct)

            if (translated !== direct)
                return translated

            const fallback = `${this.prefix}._.${name}`
            const fallbackTranslated = t(fallback)

            if (fallbackTranslated !== fallback)
                return fallbackTranslated
        }

        return String(key)
            .replaceAll('_', ' ')
            .replace(/^./, char => char.toUpperCase())
    }

    /**
     * Return translated enum items suitable for selection components.
     */
    get items(): EnumItem<T[keyof T]>[] {
        return this.entries.map(([key, value]) => ({
            key: String(key),
            value,
            title: this.label(key),
        }))
    }

    /**
     * Return the translated label of an enum or one of its members.
     *
     * @param prop - Optional enum member name or value.
     * @returns Translated enum or member label.
     */
    toString(prop?: keyof T | T[keyof T]): string {
        return this.label(prop)
    }
}
