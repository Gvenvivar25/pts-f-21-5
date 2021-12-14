const createVComponent = (tag, props) => {
  return {
    tag,
    props,
    dom: null,
  }
}

const createVElement = (tag, propsElement, children = null) => {
  if (propsElement == null) propsElement = {}
  let { style, className, ...attrs } = propsElement

  return {
    tag,
    style,
    attrs,
    props: {
      children,
    },
    className,
    dom: null,
  }
}

const createElement = (tag, props, ...children) => {
  // debugger
  if (typeof tag === 'function') {
    return createVComponent(tag, props)
  }
  return createVElement(tag, props, children)
}

const createFragment = (props, ...children) => {
  return children
}

module.exports = {
  createElement,
  createFragment,
}
