import resolvePathString from './resolvePathString' 
import popPathString from './popPathString' 
import pathStringAncestors from './pathStringAncestors'
import descendantPathStrings from './descendantPathStrings'

class AppState {
  state: any
  eventListeners: { [pathString: string]: ((value: any) => void)[] } = {}

  constructor(initialState = {}) {
    this.state = initialState
  }

  get(pathString: string) : any {
    return resolvePathString(this.state, pathString)
  }

  transform(pathString: string, transform: (value: any) => any) : void {
    const [parent, basename] = popPathString(pathString)
    const parentState = resolvePathString(this.state, parent) || this.state
    parentState[basename] = transform(parentState[basename])

    const ancestors = pathStringAncestors(pathString)
    const descendants = descendantPathStrings(pathString, parentState[basename])

    ancestors.concat(descendants).forEach(pathString => {
      const handlers = this.eventListeners[pathString] || []
      handlers.forEach(handler => handler(this.get(pathString)))
    })
  }

  set(pathString: string, value: any) : void {
    this.transform(pathString, () => value)
  }

  addEventListener(pathString: string, handler: (value: any) => void) : void {
    this.eventListeners[pathString] = this.eventListeners[pathString] || []
    this.eventListeners[pathString].push(handler)
  }

  removeEventListener(pathString: string, handler: (value: any) => void) : void {
    const handlers = this.eventListeners[pathString]
    if (handlers === undefined) return
    const index = handlers.indexOf(handler)
    if (index === -1) return
    handlers.splice(index, 1)
  }
}

export default AppState
