const mountVText = (vText, container) => {
  return container.appendChild(document.createTextNode(vText))
}

const mountVElement = (vElement, container) => {
  // debugger
  const { className, tag, props, style, attrs } = vElement
  const domNode = document.createElement(tag)
  vElement.dom = domNode
  vElement.eventListeners = []

  // add style
  if (style != undefined) {
    Object.keys(style).forEach((s) => (domNode.style[s] = style[s]))
  }
  // add class
  if (className != undefined && className != '') {
    // debugger
    domNode.className = className
  }
  // add children
  if (props.children) {
    // debugger
    if (Array.isArray(props.children)) {
      props.children.forEach((child) => mount(child, domNode))
    } else {
      mount(props.children, domNode)
    }
  }

  // add attributes
  Object.entries(attrs || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      let type = name.toLowerCase().slice(2)

      vElement.eventListeners.push([type, value])

      domNode.addEventListener(type, value)
    } else {
      // if (name === 'disabled' && value) {
      //   domNode.disabled = true
      // } else
      if (value) {
        // debugger
        if (name === 'defaultChecked') {
          domNode.setAttribute('checked', value.toString())
        } else {
          domNode.setAttribute(name, value.toString())
        }
      }
    }
  })

  container.appendChild(domNode)

  return domNode
}

// const isContainerRoot = (container) => {
//   if (container === window.root) {
//     container.textContent = ''
//   }
// }

const mountVComponent = (vComponent, container) => {
  // debugger
  const { tag, props } = vComponent
  const Component = tag
  const instance = new Component(props)

  const nextRenderedElement = instance.render() || ''

  instance._currentElement = nextRenderedElement

  instance._parentNode = container
  vComponent._instance = instance

  // debugger
  const dom = mount(nextRenderedElement, container)
  vComponent.dom = dom

  // isContainerRoot(container)
  if (Array.isArray(nextRenderedElement)) {
    nextRenderedElement.forEach((element) => container.appendChild(element.dom))
  } else {
    container.appendChild(dom)
  }

  instance.componentDidMount()
  return dom
}

export const mount = (vNode, container) => {
  // debugger

  if (Array.isArray(vNode)) {
    vNode.forEach((node) => mount(node, container))
  } else {
    if (typeof vNode === 'string' || typeof vNode === 'number') {
      return mountVText(vNode, container)
    }

    if (vNode === undefined) {
      return mountVText('', container)
    }

    if (typeof vNode.tag === 'function') {
      return mountVComponent(vNode, container)
    }

    if (typeof vNode.tag === 'string') {
      return mountVElement(vNode, container)
    }
  }
}
