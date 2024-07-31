import assert from 'node:assert'
import { describe, it } from 'node:test'
describe('Service', () => {
  it('should parse user', () => {
    const user = {
      email: 'djamilson@gmail.com',
    }
    assert.deepStrictEqual(user, {
      name: 'djamilson@gmaill.com'.toUpperCase(),
    })
  })
})
