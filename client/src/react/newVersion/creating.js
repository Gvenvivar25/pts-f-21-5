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
    if (tag.name === 'createFragment') {
      // debugger
      return children
    }
    return createVComponent(tag, { ...props, children: [...children] })
  }
  return createVElement(tag, props, children)
}

const createFragment = (children) => {
  return children
}

module.exports = {
  createElement,
  createFragment,
}
