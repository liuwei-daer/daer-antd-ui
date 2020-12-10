/**
 * 构造树型结构数据
 * @param {*} source 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function treeData (source, permsCode, parentCode, children, rootId) {
  console('source : ', source)
  permsCode = permsCode || 'permsCode'
  parentCode = parentCode || 'parentCode'
  children = children || 'children'
  rootId = rootId || 0
  const cloneData = JSON.parse(JSON.stringify(source))// 对源数据深度克隆
  return cloneData.filter(father => {
    const branchArr = cloneData.filter(child => father[permsCode] === child[parentCode])// 返回每一项的子级数组
    branchArr.length > 0 ? father[children] = branchArr : delete father[children]// 如果存在子级，则给父级添加一个children属性，并赋值
    return father[parentCode] === rootId // 返回第一层
  })
}

export function buildtree (list) {
  list.forEach(item => {
    if (item.children.length > 0) {
      this.buildtree(item.children)
    } else {
      delete item.children
    }
  })
  return list
}
