const { default: descendantPathStrings } = require('../src/descendantPathStrings')

const myObject = {
  a: {
    b: [
      { c: 123 },
      { d: 'hello' },
    ],
    e: new Date(),
    f: () => {},
    g: undefined,
  },
  h: null,
  i: true,
  j: false,
  k: NaN,
}

test('handles all types of object correctly', () => {
  expect(descendantPathStrings('my.prefix', myObject)).toEqual([
    'my.prefix.a',
    'my.prefix.a.b',
    'my.prefix.a.b.0',
    'my.prefix.a.b.0.c',
    'my.prefix.a.b.1',
    'my.prefix.a.b.1.d',
    'my.prefix.a.e',
    'my.prefix.a.f',
    'my.prefix.a.g',
    'my.prefix.h',
    'my.prefix.i',
    'my.prefix.j',
    'my.prefix.k',
  ])
})
