import { describe, it, expect } from 'vitest'
import { encode, decode } from '../index'

describe('URL State Management', () => {
    describe('encode', () => {
        it('should encode basic types correctly', () => {
            const state = {
                string: 'hello',
                number: 42,
                boolean: true,
                null: null
            }
            const result = encode(state)
            expect(result).toBe('string=hello&number=42&boolean=true&null=null')
        })

        it('should encode objects and arrays', () => {
            const state = {
                obj: { name: 'test', value: 123 },
                arr: [1, 2, 3]
            }
            const result = encode(state)
            expect(result).toBe('obj={\'name\':\'test\',\'value\':123}&arr=[1,2,3]')
        })

        it('should handle defaults correctly', () => {
            const state = { count: 5, name: 'test' }
            const defaults = { count: 5, name: 'default' }
            const result = encode(state, defaults)
            expect(result).toBe('name=test')
        })
    })

    describe('decode', () => {
        it('should decode a plus correctly', () => {
            const url = 'http://localhost:5174/#/avatar?arichId=3411689479021914293129481741080038S'
            const result = decode(url)
            expect(result).toEqual({
                arichId: '3411689479021914293129481741080038S'
            })
        })

        it('should decode basic types correctly', () => {
            const params = 'string=hello&number=42&boolean=true&null=null'
            const result = decode(params)
            expect(result).toEqual({
                string: 'hello',
                number: 42,
                boolean: true,
                null: null
            })
        })

        it('should decode objects and arrays', () => {
            const params = 'obj={\'name\':\'test\',\'value\':123}&arr=[1,2,3]'
            const result = decode(params)
            expect(result).toEqual({
                obj: { name: 'test', value: 123 },
                arr: [1, 2, 3]
            })
        })

        it('should use defaults when values are invalid', () => {
            const params = 'count=invalid&name=test'
            const defaults = { count: 0, name: 'default' }
            const result = decode(params, defaults)
            expect(result).toEqual({
                count: 0,
                name: 'test'
            })
        })
    })
})
