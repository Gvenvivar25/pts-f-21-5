export const unmount = (prevElement) => {
  removeEventListener(prevElement)
  prevElement.componentWillUnmount()
  prevElement.dom.remove()
}

const removeEventListener = (vNode) => {
  let { eventListeners, dom, props } = vNode
  if (eventListeners && eventListeners.length > 0) {
    eventListeners.forEach(([type, value]) => {
      dom.removeEventListener(type, value)
    })
  }

  if (props.children) {
    if (Array.isArray(props.children)) {
      props.children.forEach((child) => removeEventListener(child))
    } else {
      removeEventListener(props.children)
    }
  }
}
