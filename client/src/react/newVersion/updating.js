import { mount } from './mounting'
import { unmount } from './unmouting'

export const update = (prevElement = '', nextElement = '', parentDOM) => {
  // debugger
  if (!prevElement) {
    mount(nextElement, parentDOM)
  } else {
    if (
      prevElement?.tag &&
      nextElement?.tag &&
      prevElement.tag === nextElement.tag
    ) {
      // same tags
      if (typeof prevElement.tag === 'string') {
        updateVElement(prevElement, nextElement)
      }
      if (typeof prevElement.tag === 'function') {
        updateVComponent(prevElement, nextElement)
      }
      if (typeof prevElement === 'string' || typeof prevElement === 'number') {
        updateVText(prevElement, nextElement, parentDOM)
      }
    } else {
      if (Array.isArray(prevElement) && Array.isArray(nextElement)) {
        updateChildren(prevElement, nextElement, parentDOM)
      } else {
        if (
          (typeof prevElement === 'string' &&
            typeof nextElement === 'string') ||
          (typeof nextElement === 'number' && typeof nextElement === 'number')
        ) {
          updateVText(prevElement, nextElement, parentDOM)
        } else {
          unmount(prevElement, parentDOM)
          // debugger
          mount(nextElement, parentDOM)
        }
      }
    }
  }
}

const updateVText = (prevText, nextText, parentDOM) => {
  if (prevText !== nextText) {
    if (prevText == undefined) {
      parentDOM.appendChild(document.createTextNode(nextText))
    }
    if (nextText == undefined) {
      parentDOM.textContent = parentDOM.textContent.replace(prevText, '')
    } else {
      parentDOM.textContent = parentDOM.textContent.replace(prevText, nextText)
    }
  }
}

const updateChildren = (prevChildren, nextChildren, container) => {
  // debugger
  if (typeof prevChildren === 'string') {
    container.textContent = null
    nextChildren.forEach((child) => {
      mount(child, container)
    })
  } else {
    const minLengthChildren = Math.min(prevChildren.length, nextChildren.length)

    for (let i = 0; i < minLengthChildren; i++) {
      update(prevChildren[i], nextChildren[i], container)
    }

    if (prevChildren.length > nextChildren.length) {
      prevChildren.slice(nextChildren.length).forEach((child) => {
        if (typeof child === 'string') {
          unmount(child, container)
        } else {
          unmount(child)
        }
      })
    }
    if (nextChildren.length > prevChildren.length) {
      nextChildren.slice(prevChildren.length).forEach((child) => {
        mount(child, container)
      })
    }
  }
  // if (!Array.isArray(nextChildren)) {
  //   nextChildren = [nextChildren]
  // }
  // if (!Array.isArray(prevChildren)) {
  //   prevChildren = [prevChildren]
  // }
  // console.log(nextChildren)
  // for (let i = 0; i < nextChildren.length; i++) {
  //   const nextChild = nextChildren[i]
  //   const prevChild = prevChildren[i]

  //   if (typeof nextChild === 'string' || typeof prevChild === 'string') {
  //     if (prevChild !== nextChild) {
  //       const nextChildNode = mount(nextChild, container)
  //       container.replaceWith(nextChildNode)
  //     }
  //   }
  // }
}

const addAttributes = (attrs, container) => {
  attrs.forEach(([type, value]) => {
    if (type.startsWith('on') && type.toLowerCase() in window)
      container.addEventListener(type.toLowerCase().slice(2), value)
    else container.setAttribute(type, value.toString())
  })
}

const remodeAttributes = (attrs, container) => {
  attrs.forEach(([type, value]) => {
    if (type.startsWith('on') && type.toLowerCase() in window)
      container.removeEventListener(type.toLowerCase().slice(2), value)
    else container.removeAttribute(type, value.toString())
  })
}

const updateAttribute = (prevAttrs, nextAttrs, container) => {
  let keysPrevAttrs = Object.entries(prevAttrs || {})
  let keysNextAttrs = Object.entries(nextAttrs || {})
  if (keysNextAttrs.length !== 0 && keysPrevAttrs.length !== 0) {
    if (keysPrevAttrs.length === 0) {
      addAttributes(keysNextAttrs, container)
    } else if (keysNextAttrs.length === 0) {
      remodeAttributes(keysPrevAttrs, container)
    } else {
      remodeAttributes(keysPrevAttrs, container)
      addAttributes(keysNextAttrs, container)
      // const minLengthAttrs = Math.min(keysPrevAttrs.length, keysNextAttrs.length)

      // for (let i = 0; i < minLengthChildren; i++) {
      //   patch(oldVNode.children[i], newVNode.children[i])
      // }
    }
  }
}

const updateVElement = (prevElement, nextElement) => {
  const dom = prevElement.dom
  nextElement.dom = dom

  if (nextElement.props.children) {
    updateChildren(prevElement.props.children, nextElement.props.children, dom)
  }

  // update style
  if (prevElement.style !== nextElement.style) {
    if (nextElement.style != undefined) {
      dom.removeAttribute('style')
      Object.keys(nextElement.style).forEach(
        (s) => (dom.style[s] = nextElement.style[s])
      )
    } else {
      dom.removeAttribute('style')
    }
  }
  // update class
  if (prevElement.className !== nextElement.className) {
    dom.className = nextElement.className
  }

  if (prevElement.attrs !== nextElement.attrs) {
    updateAttribute(prevElement.attrs, nextElement.attrs, dom)
  }
}

const updateVComponent = (prevComponent, nextComponent) => {
  const { _instance } = prevComponent
  const { _currentElement } = _instance

  const prevProps = prevComponent.props
  const nextProps = nextComponent.props

  nextComponent.dom = prevComponent.dom
  nextComponent._instance = _instance
  nextComponent._instance.props = nextProps

  const nextState = nextComponent._instance.state
  // debugger
  if (_instance.shouldComponentUpdate(nextProps, nextState, prevComponent)) {
    const prevRenderElement = _currentElement
    _instance.componentDidUpdate(prevProps, _instance.state)
    const nextRenderElement = _instance.render()

    nextComponent._instance._currentElement = nextRenderElement

    update(prevRenderElement, nextRenderElement, _instance._parentNode)
  }
}
