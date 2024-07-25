// 事件名称映射对象，用于存储各事件的定时器ID
const eventName = {}

// 按下处理函数
const down = o => {
  // 获取所有事件名称的键
  const keys = Object.keys(eventName)
  // 清除所有事件的定时器
  keys.forEach(i => {
    clearTimeout(eventName[i])
    eventName[i] = null
  })

  // 如果没有回调函数，直接返回
  if (!o.callback) {
    return
  }

  // 清除当前事件的定时器的函数
  const clear = () => {
    clearTimeout(eventName[o.key])
  }

  // 执行回调函数，并传递清除定时器的函数作为参数
  o.callback(clear)

  // 如果只执行一次，不进行后续操作
  if (o.once === true) {
    return
  }

  // 设置初始延迟时间和循环间隔时间
  let begin = o.begin || 100
  const interval = o.interval || 50

  // 定义一个循环函数，用于递归设置定时器
  const loop = () => {
    eventName[o.key] = setTimeout(() => {
      begin = null // 只在第一次设置初始延迟时间
      loop() // 递归调用
      o.callback(clear) // 执行回调函数
    }, begin || interval) // 使用初始延迟时间或间隔时间
  }

  // 开始循环
  loop()
}

// 松开处理函数
const up = o => {
  // 清除当前事件的定时器
  clearTimeout(eventName[o.key])
  eventName[o.key] = null

  // 如果没有回调函数，直接返回
  if (!o.callback) {
    return
  }

  // 执行回调函数
  o.callback()
}

// 清除所有事件的定时器
const clearAll = () => {
  const keys = Object.keys(eventName)
  keys.forEach(i => {
    clearTimeout(eventName[i])
    eventName[i] = null
  })
}

// 导出模块，包括按下、松开和清除所有事件处理函数
export default {
  down,
  up,
  clearAll
}
