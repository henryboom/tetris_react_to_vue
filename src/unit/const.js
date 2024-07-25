import i18nJSON from '../i18n.json'

// 定义俄罗斯方块的形状
export const blockShape = {
  I: [[1, 1, 1, 1]], // I 形状
  L: [[0, 0, 1], [1, 1, 1]], // L 形状
  J: [[1, 0, 0], [1, 1, 1]], // J 形状
  Z: [[1, 1, 0], [0, 1, 1]], // Z 形状
  S: [[0, 1, 1], [1, 1, 0]], // S 形状
  O: [[1, 1], [1, 1]], // O 形状
  T: [[0, 1, 0], [1, 1, 1]] // T 形状
}

// 定义每种方块类型的旋转原点
export const origin = {
  I: [[-1, 1], [1, -1]], // I 形状
  L: [[0, 0]], // L 形状
  J: [[0, 0]], // J 形状
  Z: [[0, 0]], // Z 形状
  S: [[0, 0]], // S 形状
  O: [[0, 0]], // O 形状
  T: [[0, 0], [1, 0], [-1, 1], [0, -1]] // T 形状
}

// 所有方块类型的列表
export const blockType = Object.keys(blockShape)

// 定义不同等级的下落速度（毫秒）
export const speeds = [800, 650, 500, 370, 250, 160]

// 定义按键之间的延迟时间（毫秒）
export const delays = [50, 60, 70, 80, 90, 100]

// 定义一条填满的行
export const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

// 定义一条空白的行
export const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// 定义空白矩阵
export const blankMatrix = (() => {
  const matrix = []
  for (let i = 0; i < 20; i++) {
    matrix.push(blankLine)
  }
  return matrix
})()

// 定义消除行数后的得分
export const clearPoints = [100, 300, 700, 1500]

// 存储键名
export const StorageKey = 'TETRIS'

// 获取上次游戏的状态
export const lastRecord = (() => {
  // 从本地存储中获取数据
  let data = window.localStorage.getItem(StorageKey)
  if (!data) {
    return false
  }
  try {
    if (window.btoa) {
      data = atob(data)
    }
    data = decodeURIComponent(data)
    data = JSON.parse(data)
  } catch (e) {
    if (window.console || window.console.error) {
      window.console.error('读取记录错误:', e)
    }
    return false
  }
  return data
})()

// 定义最高分
export const maxPoint = 999999

// 获取支持的变换属性
export const transform = (function () {
  const trans = [
    'transform',
    'webkitTransform',
    'msTransform',
    'mozTransform',
    'oTransform'
  ]
  const body = document.body
  return trans.filter(e => body.style[e] !== undefined)[0]
})()

// 每消除一定行数后增加速度
export const eachLines = 20

// 获取浏览器参数
export const getParam = param => {
  const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`)
  const m = window.location.toString().match(r)
  return m ? decodeURI(m[1]) : ''
}

// 获取语言参数
export const lan = (() => {
  let l = getParam('lan').toLowerCase()
  if (!l && navigator.languages) {
    l = navigator.languages.find(l => i18nJSON.lan.indexOf(l) !== -1)
  }
  l = i18nJSON.lan.indexOf(l) === -1 ? i18nJSON.default : l
  return l
})()

// 设置文档标题
document.title = i18nJSON.data.title[lan]

// 导出 i18n 数据
export let i18n = i18nJSON.data
