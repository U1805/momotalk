class Bus {
  eventList: any;
  constructor() {
    this.eventList = {} // 事件列表，这项是必须的
  }

  // 订阅
  $on(name: string, fn: any) {
    this.eventList[name] = this.eventList[name] || []
    this.eventList[name].push(fn)
  }

  // 发布
  $emit(name: string, data: any) {
    if (this.eventList[name]) {
      this.eventList[name].forEach((fn: any) => {
        fn(data)
      });
    }
  }

  // 取消订阅
  $off(name: string) {
    if (this.eventList[name]) {
      delete this.eventList[name]
    }
  }
}

export default new Bus()