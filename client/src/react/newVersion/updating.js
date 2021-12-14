export const update = (prevElement, nextElement) => {
  if (prevElement.tag === nextElement.tag) {
    if (typeof prevElement.tag === 'string') {
      updateVElement(prevElement, nextElement)
    } else if (typeof prevElement.tag === 'function') {
      updateVComponent(prevElement, nextElement)
    } else {
      // todo
      // console.log(nextElement)
    }
  }
}

const updateVText = (prevText, nextText, parentDOM) => {
  console.log(nextText)
  if (prevText !== nextText) {
    parentDOM.textContent = ''
    parentDOM.appendChild(document.createTextNode(nextText))
  }
}

const updateChildren = (prevChildren, nextChildren, container) => {
  if (!Array.isArray(nextChildren)) {
    nextChildren = [nextChildren]
  }
  if (!Array.isArray(prevChildren)) {
    prevChildren = [prevChildren]
  }
  console.log(nextChildren)
  // for (let i = 0; i < nextChildren.length; i++) {
  //   const nextChild = nextChildren[i]
  //   const prevChild = prevChildren[i]

  //   if (typeof nextChild === 'string' && typeof prevChild === 'string') {
  //     updateVText(prevChild, nextChild, container)
  //     continue
  //   } else {
  //   }
  // }
}

const updateVElement = (prevElement, nextElement) => {
  const dom = prevElement.dom
  nextElement.dom = dom

  if (nextElement.props.children) {
    updateChildren(prevElement.props.children, nextElement.props.children, dom)
  }

  if (prevElement.style !== nextElement.style) {
    Object.keys(nextElement.style).forEach(
      (s) => (dom.style[s] = nextElement.style[s])
    )
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

  if (_instance.shouldComponentUpdate()) {
    const prevRenderElement = _currentElement
    const nextRenderElement = _instance.render()

    nextComponent._instance._currentElement = nextRenderElement

    update(prevRenderElement, nextRenderElement, _instance._parentNode)
  }
}
