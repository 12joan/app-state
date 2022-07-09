import resolvePathString from './resolvePathString' 
import popPathString from './popPathString' 
import pathStringAncestors from './pathStringAncestors'
import descendantPathStrings from './descendantPathStrings'

interface TransactionHelper {
  transform: (pathString: string, transform: (value: any) => any, emitEvents: boolean) => void
  set: (pathString: string, value: any, emitEvents: boolean) => void
}

class AppState implements TransactionHelper {
  state: any
  eventListeners: { [pathString: string]: ((value: any) => void)[] } = {}
  bufferedChanges: { [pathString: string]: any } = {}

  constructor(initialState = {}) {
    this.state = initialState
  }

  get(pathString: string) : any {
    return resolvePathString(this.state, pathString)
  }

  transform(pathString: string, transform: (value: any) => any, emitEvents: boolean = true) : void {
    const [parent, basename] = popPathString(pathString)
    const parentState = resolvePathString(this.state, parent) || this.state
    parentState[basename] = transform(parentState[basename])

    const ancestors = pathStringAncestors(pathString)
    const descendants = descendantPathStrings(pathString, parentState[basename])

    ancestors.concat(descendants).forEach(pathString => {
      // Only enqueue the change if there's a corresponding event listener
      if (this.eventListeners[pathString] !== undefined) {
        this.bufferedChanges[pathString] = this.get(pathString)
      }
    })

    if (emitEvents) {
      this.emitEvents()
    }
  }

  set(pathString: string, value: any, emitEvents: boolean = true) : void {
    this.transform(pathString, () => value, emitEvents)
  }

  transaction(procedure: (t: TransactionHelper) => void) : void {
    procedure({
      transform: (pathString, transform, emitEvents = false) => this.transform(pathString, transform, emitEvents),
      set: (pathString, value, emitEvents = false) => this.set(pathString, value, emitEvents),
    })

    this.emitEvents()
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

  emitEvents() : void {
    Object.keys(this.bufferedChanges).forEach(pathString => {
      const value = this.bufferedChanges[pathString]
      this.eventListeners[pathString]?.forEach((handler: (value: any) => void) => handler(value))
    })

    this.bufferedChanges = {}
  }
}

export default AppState
