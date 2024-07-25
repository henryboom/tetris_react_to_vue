import store from '../vuex/store'
import todo from './todo'

// 定义键盘按键对应的动作
const keyboard = {
  37: 'left',    // 左箭头
  38: 'rotate',  // 上箭头
  39: 'right',   // 右箭头
  40: 'down',    // 下箭头
  32: 'space',   // 空格
  83: 's',       // S 键
  82: 'r',       // R 键
  80: 'p'        // P 键
}

let keydownActive // 当前激活的按键

// 获取所有定义的按键码
const boardKeys = Object.keys(keyboard).map(e => parseInt(e, 10))

// 键盘按下事件处理函数
const keyDown = e => {
  // 忽略带有 metaKey 的按键和未定义的按键
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return
  }
  const type = keyboard[e.keyCode] // 获取按键类型
  if (type === keydownActive) {
    return // 如果按键已经激活，则忽略
  }
  keydownActive = type // 设置当前激活按键
  todo[type].down(store) // 执行对应的按键按下操作
}

// 键盘松开事件处理函数
const keyUp = e => {
  // 忽略带有 metaKey 的按键和未定义的按键
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return
  }
  const type = keyboard[e.keyCode] // 获取按键类型
  if (type === keydownActive) {
    keydownActive = '' // 重置当前激活按键
  }
  todo[type].up(store) // 执行对应的按键松开操作
}

// 添加键盘事件监听
document.addEventListener('keydown', keyDown, true)
document.addEventListener('keyup', keyUp, true)
