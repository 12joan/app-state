const { default: resolvePathString } = require('../src/resolvePathString')

const myObject = {
  app: {
    user: {
      name: 'Alice',
      age: 25,
      friends: [
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 35 },
        { name: 'Dave', age: 40 },
      ]
    },
  },
}

test('can dig into objects and arrays', () => {
  expect(resolvePathString(myObject, 'app.user.name')).toBe(myObject.app.user.name)
  expect(resolvePathString(myObject, 'app.user.age')).toBe(myObject.app.user.age)
  expect(resolvePathString(myObject, 'app.user.friends.0')).toBe(myObject.app.user.friends[0])
  expect(resolvePathString(myObject, 'app.user.friends.0.name')).toBe(myObject.app.user.friends[0].name)
})
