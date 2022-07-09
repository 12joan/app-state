const { default: popPathString } = require('../src/popPathString')

test('cannot pop empty path string', () => {
  expect(() => popPathString('')).toThrow()
})

test('popping singular path string returns empty parent', () => {
  expect(popPathString('hello')).toEqual(['', 'hello'])
})

test('popping path string with multiple levels returns parent and child', () => {
  expect(popPathString('hello.world')).toEqual(['hello', 'world'])
  expect(popPathString('hello.world.test')).toEqual(['hello.world', 'test'])
})
