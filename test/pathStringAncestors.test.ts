const { default: pathStringAncestors } = require('../src/pathStringAncestors')

test('computes ancestors', () => {
  expect(pathStringAncestors('one.two.three.flour')).toEqual([
    'one',
    'one.two',
    'one.two.three',
    'one.two.three.flour',
  ])
})
