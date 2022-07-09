const resolvePathString = (object: any, pathString: string) => (
  pathString.split('.').reduce((acc, key) => acc[key], object)
)

export default resolvePathString
