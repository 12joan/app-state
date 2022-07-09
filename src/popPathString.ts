const popPathString = (pathString: string) : [string, string] => {
  if (!pathString.match(/[^.]/))
    throw new Error(`Invalid pathString: ${pathString}`)

  const path: string[] = pathString.split('.')
  const basename: string = path.pop() || ''
  const parent: string = path.join('.')

  return [parent, basename]
}

export default popPathString
