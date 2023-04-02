const myComponent = function () {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('hello'),
    },
    children: 'click me again',
  }
}

const vnode = {
  tag: myComponent
}

function Renderer(vnode,container) {
  const el = vnode.tag
  if (typeof vnode.tag === 'string') {
    MountElement(el, container)
  } else if ( typeof vnode.tag === 'function') {
    MountComponent(el, container)
  }
}

function MountElement(vnode, container) {
  const el = vnode.tag
  if (typeof vnode.tag === 'string') {
    const text = document.createTextNode(el)
    el.appendChild(text)
  } else if (Array.isArray(vnode.children)) {
    vnode.children(child => MountElement(child, el))
  }
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(key.substring(2).toLowerCase(), vnode.props[key])
    }
  }
  container.appendChild(el)
}

function MountComponent(vnode, container) {
  const subStree = vnode.tag()
  MountElement(subStree, container)
}