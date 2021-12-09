const appendChild = (parent, child) => {
  if (Array.isArray(child))
    child.forEach((nestedChild) => appendChild(parent, nestedChild))
  else
    parent.appendChild(child.nodeType ? child : document.createTextNode(child))
}

const createElement = (tag, props, ...children) => {
  if (typeof tag === 'function') return tag(props, ...children)
  const element = document.createElement(tag)

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window)
      element.addEventListener(name.toLowerCase().slice(2), value)
    else element.setAttribute(name, value.toString())
  })

  children.forEach((child) => {
    appendChild(element, child)
  })

  return element
}

const createFragment = (props, ...children) => {
  return children
}

// const CastomReact = {
//   createElement,
//   createFragment,
//   appendChild,
// }

// export default CastomReact

const ReactDOM = (element, node) => {
  if (node.firstChild) {
    console.log('node', node.firstChild)
    node.innerHTML = ''
  }

  node.appendChild(element)
}

module.exports = {
  createElement,
  createFragment,
  appendChild,
  ReactDOM,
}
