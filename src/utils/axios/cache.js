export default class CachedPromise {
  constructor() {
    this.cache = {}
  }

  get(id) {
    if (!id) {
      return
    }
    const cache = this.cache[id] ? this.cache[id] : null
    if (cache == null) {
      return
    }

    if (+new Date() > cache.expiredAt) {
      this.delete(id)
      return null
    } else {
      return cache.promise
    }
  }

  set(id, promise, time) {
    Object.assign(this.cache, {
      [id]: { promise, expiredAt: +new Date() + time },
    })
  }

  delete(id) {
    delete this.cache[id]
    return Promise.resolve(id)
  }
}
