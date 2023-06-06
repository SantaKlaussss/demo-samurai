
let objectUpdateInArray = (items, itemId, objPropName, newObjProps) => {
  return items.map(u => {
    if (u[objPropName] === itemId) {
      return {...u, ...newObjProps}
    }
    return u
  })
}
export default objectUpdateInArray;
