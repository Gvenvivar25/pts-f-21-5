export const unmount = (prevElement, container) => {
  // debugger
  if (typeof prevElement === 'string') {
    container.textContent = container.textContent.replace(prevElement, '')
  } else {
    if (prevElement?.tag && typeof prevElement.tag === 'function') {
      removeEventListener(prevElement?._instance?._currentElement)
      prevElement._instance.componentWillUnmount()
    } else {
      removeEventListener(prevElement)
      prevElement.componentWillUnmount()
    }

    prevElement.dom.remove()
  }
}

const removeEventListener = (vNode) => {
  if (!vNode) return

  let { eventListeners, dom, props } = vNode
  if (eventListeners && eventListeners.length > 0) {
    eventListeners.forEach(([type, value]) => {
      dom.removeEventListener(type, value)
    })
  }

  if (props?.children) {
    if (Array.isArray(props.children)) {
      props.children.forEach((child) => removeEventListener(child))
    } else {
      removeEventListener(props.children)
    }
  }
}
