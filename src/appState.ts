import resolvePathString from './resolvePathString' 

class AppState {
  state: any;

  constructor(initialState = {}) {
    this.state = initialState;
  }

  get(pathString: string) : any {
    return resolvePathString(this.state, pathString)
  }
}

export default AppState
