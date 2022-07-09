import resolvePathString from './resolvePathString' 
import popPathString from './popPathString' 

class AppState {
  state: any

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
  }

  set(pathString: string, value: any) : void {
    this.transform(pathString, () => value)
  }
}

export default AppState
