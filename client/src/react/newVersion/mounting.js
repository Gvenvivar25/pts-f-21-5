const mountVText = (vText, container) => {
  container.textContent = vText
}

const mountVElement = (vElement, container) => {
  const { className, tag, props, style } = vElement

  const domNode = document.createElement(tag)
  vElement.dom = domNode

  if (props.children) {
    if (Array.isArray(props.children)) {
      props.children.forEach((child) => mount(child, domNode))
    } else {
      mount(props.children, domNode)
    }
  }
  if (className !== undefined) {
    domNode.className = className
  }

  if (style !== undefined) {
    Object.keys(style).forEach((s) => (domNode.style[s] = style[s]))
  }

  container.appendChild(domNode)

  return domNode
}

const mount = (vNode, container) => {
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return mountVText(vNode, container)
  }
}
