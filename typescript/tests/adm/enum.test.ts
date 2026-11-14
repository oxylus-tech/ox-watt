import { beforeEach, describe, expect, it, vi } from 'vitest'

import { t } from '@/i18n'
import { Enum } from '@/adm/enum'

vi.mock('@/i18n', () => ({
    t: vi.fn((key: string) => key),
}))

describe('Enum', () => {
    const members = {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        PENDING: 'pending',
    } as const

    let Status: ReturnType<typeof Enum.create<typeof members>>

    beforeEach(() => {
        vi.mocked(t).mockImplementation((key: string) => key)

        Status = Enum.create('app.enums.Status', members)
    })

    describe('creation', () => {
        it('should store the translation prefix', () => {
            expect(Status.prefix).toBe('app.enums.Status')
        })

        it('should expose its members directly', () => {
            expect(Status.ACTIVE).toBe('active')
            expect(Status.INACTIVE).toBe('inactive')
            expect(Status.PENDING).toBe('pending')
        })

        it('should expose the member definitions', () => {
            expect(Status.members).toEqual(members)
        })

        it('should freeze the member definitions', () => {
            expect(Object.isFrozen(Status.members)).toBe(true)
        })

        it('should not modify the original definitions', () => {
            expect(Object.isFrozen(members)).toBe(false)
        })
    })

    describe('keys, values and entries', () => {
        it('should return member keys', () => {
            expect(Status.keys).toEqual([
                'ACTIVE',
                'INACTIVE',
                'PENDING',
            ])
        })

        it('should return member values', () => {
            expect(Status.values).toEqual([
                'active',
                'inactive',
                'pending',
            ])
        })

        it('should return member entries', () => {
            expect(Status.entries).toEqual([
                ['ACTIVE', 'active'],
                ['INACTIVE', 'inactive'],
                ['PENDING', 'pending'],
            ])
        })
    })

    describe('translation', () => {
        it('should translate the enum itself', () => {
            vi.mocked(t).mockReturnValue('Status')

            expect(Status.label()).toBe('Status')
            expect(Status.toString()).toBe('Status')

            expect(t).toHaveBeenCalledWith('app.enums.Status')
        })

        it('should translate a member using its key', () => {
            vi.mocked(t).mockImplementation((key: string) => {
                return key === 'app.enums.Status.ACTIVE'
                    ? 'Active'
                    : key
            })

            expect(Status.label('ACTIVE')).toBe('Active')
            expect(Status.toString('ACTIVE')).toBe('Active')
        })

        it('should translate a member using its value', () => {
            vi.mocked(t).mockImplementation((key: string) => {
                return key === 'app.enums.Status.active'
                    ? 'Active'
                    : key
            })

            expect(Status.label('active')).toBe('Active')
        })

        it('should use the fallback translation namespace', () => {
            vi.mocked(t).mockImplementation((key: string) => {
                return key === 'app.enums.Status._.ACTIVE'
                    ? 'Active'
                    : key
            })

            expect(Status.label('ACTIVE')).toBe('Active')
        })

        it('should return a formatted key when no translation exists', () => {
            expect(Status.label('ACTIVE')).toBe('ACTIVE')
            expect(Status.label('INACTIVE')).toBe('INACTIVE')
        })

        it('should return the original value for unknown members', () => {
            expect(Status.label('UNKNOWN' as never)).toBe('UNKNOWN')
        })
    })

    describe('items', () => {
        it('should return items suitable for selection components', () => {
            expect(Status.items).toEqual([
                {
                    key: 'ACTIVE',
                    value: 'active',
                    title: 'ACTIVE',
                },
                {
                    key: 'INACTIVE',
                    value: 'inactive',
                    title: 'INACTIVE',
                },
                {
                    key: 'PENDING',
                    value: 'pending',
                    title: 'PENDING',
                },
            ])
        })

        it('should use translated labels', () => {
            vi.mocked(t).mockImplementation((key: string) => {
                const translations: Record<string, string> = {
                    'app.enums.Status.ACTIVE': 'Active',
                    'app.enums.Status.INACTIVE': 'Inactive',
                    'app.enums.Status.PENDING': 'Pending',
                }

                return translations[key] ?? key
            })

            expect(Status.items).toEqual([
                { key: 'ACTIVE', value: 'active', title: 'Active' },
                { key: 'INACTIVE', value: 'inactive', title: 'Inactive' },
                { key: 'PENDING', value: 'pending', title: 'Pending' },
            ])
        })
    })

    describe('clone', () => {
        it('should create an enum with a different prefix', () => {
            const cloned = Status.clone('app.models.Customer.enums.Status')

            expect(cloned.prefix).toBe('app.models.Customer.enums.Status')
            expect(cloned.ACTIVE).toBe('active')
            expect(cloned.members).toEqual(Status.members)
        })

        it('should use its own translation prefix', () => {
            const cloned = Status.clone('app.models.Customer.enums.Status')

            vi.mocked(t).mockImplementation((key: string) => {
                return key === 'app.models.Customer.enums.Status.ACTIVE'
                    ? 'Active'
                    : key
            })

            expect(cloned.label('ACTIVE')).toBe('Active')
        })
    })
})

