const { default: AppState } = require('../src/appState')

const appState = new AppState({
  app: {
    user: {
      name: 'Alice',
      age: 25,
    },
  },
})

test('can get deeply nested values', () => {
  expect(appState.get('app.user.name')).toBe('Alice')
})

test('can set deeply nested values', () => {
  appState.set('app.user', { name: 'Bob', age: 30 })
  expect(appState.get('app.user.name')).toBe('Bob')
  expect(appState.get('app.user.age')).toBe(30)
})

test('can set top-level values', () => {
  appState.set('app', { user: { name: 'Charlie', age: 35 } })
  expect(appState.get('app.user.name')).toBe('Charlie')
  expect(appState.get('app.user.age')).toBe(35)
})
