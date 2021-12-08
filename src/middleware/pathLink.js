const getPathLink = (e, router) => {
  const a = e.target.closest('a')
  if (!a || !e.currentTarget.contains(a)) return

  e.preventDefault()
  const path = a.getAttribute('href')
  router.push(path)
}

export default getPathLink
