const descendantPathStrings = (prefix: string, object: any) : string[] => {
  if (typeof object !== 'object') return []

  return Object.keys(object || {}).flatMap(key => ([
    `${prefix}.${key}`,
    ...descendantPathStrings(`${prefix}.${key}`, object[key])
  ]))
}

export default descendantPathStrings
