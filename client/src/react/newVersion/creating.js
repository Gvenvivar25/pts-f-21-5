const createVComponent = (tag, props) => {
  return {
    tag,
    props,
    dom: null,
  }
}

const createVElement = (tag, propsElement = {}, children = null) => {
  let style
  let className
  if (propsElement != null) {
    style = propsElement.style
    className = propsElement.className
  }

  return {
    tag,
    style,
    props: {
      children,
    },
    className,
    dom: null,
  }
}

const createElement = (tag, props, ...children) => {
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
