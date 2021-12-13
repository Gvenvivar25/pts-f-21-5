const appendChild = (parent, child) => {
  if (Array.isArray(child))
    child.forEach((nestedChild) => appendChild(parent, nestedChild))
  else
    parent.appendChild(child.nodeType ? child : document.createTextNode(child))
}

const addAttribute = (props, el) => {
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window)
      el.addEventListener(name.toLowerCase().slice(2), value)
    else el.setAttribute(name, value.toString())
  })
}

const createElement = (tag, props, ...children) => {
  return { tag, props, children }
}

const createElementNode = ({ tag, props, children }) => {
  if (typeof tag === 'function') {
    return createElementNode(tag(props, children))
  }
  let el = document.createElement(tag)

  addAttribute(props, el)

  children.forEach((child) => {
    typeof child === 'string'
      ? appendChild(el, child)
      : appendChild(el, createElementNode(child))
  })
  return el
}

const createFragment = (props, ...children) => {
  return children
}

const ReactDOM = (el, container) => {
  container.appendChild(el)
}

module.exports = {
  createElement,
  createFragment,
  appendChild,
  ReactDOM,
  addAttribute,
  createElementNode,
}
