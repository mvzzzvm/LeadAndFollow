import del from 'del'

export const resetEverything = () => {
   return del(`${app.path.clean}*`)
}
export const resetPathChildren = (path) => {
   if (!path || typeof path === 'function') {
      throw new Error('Invalid argument for resetPath: ', path)
   }
   if (path.substr(path.length - 1, 1) === '/') path += '*'
   console.log('resetting the path', `'${path}'`)
   return del(`${path}`)
}
