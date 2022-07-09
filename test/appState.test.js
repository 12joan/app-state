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
