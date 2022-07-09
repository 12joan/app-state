const { default: AppState } = require('../src/appState')

let appState

beforeEach(() => {
  appState = new AppState({
    app: {
      user: {
        name: 'Alice',
        age: 25,
      },
    },
  })
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

test('can transform values', () => {
  appState.transform('app.user.age', age => age + 1)
  expect(appState.get('app.user.age')).toBe(26)
})

test('can add and remove event listeners', () => {
  const appListener = jest.fn()
  const appUserListener = jest.fn()
  const appUserNameListener = jest.fn()
  const appUserAgeListener = jest.fn()

  appState.addEventListener('app', appListener)
  appState.addEventListener('app.user', appUserListener)
  appState.addEventListener('app.user.name', appUserNameListener)
  appState.addEventListener('app.user.age', appUserAgeListener)

  appState.removeEventListener('app.user.age', appUserAgeListener)

  appState.set('app.user', { name: 'Bob', age: 30 })

  expect(appListener).toHaveBeenCalledWith({ user: { name: 'Bob', age: 30 } })
  expect(appUserListener).toHaveBeenCalledWith({ name: 'Bob', age: 30 })
  expect(appUserNameListener).toHaveBeenCalledWith('Bob')
  expect(appUserAgeListener).not.toHaveBeenCalled()
})

test('transactions cause event listeners to only fire once', () => {
  const appListener = jest.fn()
  appState.addEventListener('app', appListener)

  appState.transaction(t => {
    t.set('app.user', { name: 'Bob', age: 30 })
    t.set('app.user.name', 'Charlie')
  })

  expect(appListener).toHaveBeenCalledTimes(1)
  expect(appListener).toHaveBeenCalledWith({ user: { name: 'Charlie', age: 30 } })
})
