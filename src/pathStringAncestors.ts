const pathStringAncestors = (pathString: string) : string[] => {
  if (!pathString.match(/[^.]/))
    throw new Error(`Invalid pathString: ${pathString}`)

  return pathString.split('.').reduce((acc: string[], curr: string) : string[] => (
    acc.length === 0
      ? [curr]
      : [...acc, `${acc[acc.length - 1]}.${curr}`]
  ), [])
}

export default pathStringAncestors
