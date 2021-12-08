const dynamic = (fn) => {
  return async () => {
    const modul = await fn()
    return modul.default
  }
}

export default dynamic
