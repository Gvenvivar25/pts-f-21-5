const mountVText = (vText, container) => {
  container.appendChild(document.createTextNode(vText))
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
  if (className != undefined) {
    domNode.className = className
  }

  if (style != undefined) {
    Object.keys(style).forEach((s) => (domNode.style[s] = style[s]))
  }

  container.appendChild(domNode)

  return domNode
}

const mountVComponent = (vComponent, container) => {
  const { tag, props } = vComponent
  const Component = tag
  const instance = new Component(props)

  const nextRenderedElement = instance.render()

  instance._currentElement = nextRenderedElement

  instance._parentNode = container

  const dom = mount(nextRenderedElement, container)

  vComponent._instance = instance
  vComponent.dom = dom

  container.textContent = ''
  container.appendChild(dom)
}

export const mount = (vNode, container) => {
  // debugger
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return mountVText(vNode, container)
  }

  if (typeof vNode.tag === 'function') {
    return mountVComponent(vNode, container)
  }

  if (typeof vNode.tag === 'string') {
    return mountVElement(vNode, container)
  }
}
