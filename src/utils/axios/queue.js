export default class RequestQueue {
  constructor() {
    this.queue = []
  }

  get(id) {
    if (!id) {
      return this.queue
    }
    return this.queue.find((request) => request.requestId === id)
  }

  set(newRequest) {
    if (
      !this.queue.some((request) => request.requestId === newRequest.requestId)
    ) {
      this.queue.push(newRequest)
    }
  }

  delete(id) {
    const target = this.queue.find((request) => request.requestId === id)
    if (!target) {
      return
    }

    const index = this.queue.indexOf(target)
    this.queue.splice(index, 1)
  }

  cancel(requestIds) {
    let cancelQueue = []
    if (!requestIds) {
      cancelQueue = [...this.queue]
    } else if (Array.isArray(requestIds)) {
      requestIds.forEach((requestId) => {
        const cancelRequest = this.get(requestId)
        if (cancelRequest) {
          cancelQueue.push(cancelRequest)
        }
      })
    } else {
      const cancelRequest = this.get(requestIds)
      if (cancelRequest) {
        cancelQueue.push(cancelRequest)
      }
    }
    try {
      cancelQueue.forEach((request) => {
        request.cancelExcutor(request)
        this.delete(request.requestId)
      })
      return Promise.resolve(requestIds)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
