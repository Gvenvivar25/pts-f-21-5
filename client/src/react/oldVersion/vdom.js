const { createElementNode, ReactDOM, addAttribute } = require('./react')

let isFirstRender = false

export const mount = (vnode, container) => {
  const el = createElementNode(vnode)
  ReactDOM(el, container)
  vnode.$el = el
  isFirstRender = true
}

const unmount = (vnode) => {
  vnode.$el.remove()
}

const patch = (oldVNode, newVNode) => {
  // different tags
  if (oldVNode.tag !== newVNode.tag) {
    mount(newVNode, oldVNode.$el.parentNode)
    unmount(oldVNode)
  } else {
    newVNode.$el = oldVNode.$el

    //children sting
    if (typeof newVNode.children === 'string') {
      newVNode.$el.textContent = newVNode.children
    } else {
      while (newVNode.$el.attributes.length > 0) {
        newVNode.$el.removeAttribute(newVNode.$el.attributes[0].name)
      }

      newVNode.$el = addAttribute(newVNode.props, newVNode.$el)

      if (typeof oldVNode.children === 'string') {
        newVNode.$el.textContent = null
        newVNode.children.forEach((child) => {
          mount(child, newVNode.$el)
        })
      } else {
        const minLengthChildren = Math.min(
          oldVNode.children.length,
          newVNode.children.length
        )

        for (let i = 0; i < minLengthChildren; i++) {
          patch(oldVNode.children[i], newVNode.children[i])
        }

        if (oldVNode.children.length > newVNode.children.length) {
          oldVNode.children.slice(newVNode.children.length).forEach((child) => {
            unmount(child)
          })
        }
        if (newVNode.children.length > oldVNode.children.length) {
          newVNode.children.slice(oldVNode.children.length).forEach((child) => {
            mount(child, newVNode.$el)
          })
        }
      }
    }
  }
}
