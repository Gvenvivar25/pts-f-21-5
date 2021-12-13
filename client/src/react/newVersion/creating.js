export const createVComponent = (tag, props) => {
  return {
    tag,
    props,
    dom: null,
  }
}

export const createVElement = (tag, props, children = null) => {
  const { className, style } = props

  return {
    tag,
    style,
    props: {
      children,
    },
    className: className,
    dom: null,
  }
}

export const createElement = (tag, props, children) => {
  typeof tag === 'function'
    ? createVComponent(tag, props)
    : createVElement(tag, props, children)
}
