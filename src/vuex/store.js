import Vue from 'vue'
import Vuex from 'vuex'
import { getNextType } from '../unit'
import mutations from './mutations'
import { isFocus } from '../unit/'
import { blankMatrix, lastRecord, maxPoint, blockType } from '../unit/const'
import Block from '../unit/block'
import { hasWebAudioAPI } from '../unit/music'

Vue.use(Vuex) // 使用 Vuex

// 初始化消除行数的状态
let clearLinesInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.clearLines, 10))
  ? parseInt(lastRecord.clearLines, 10)
  : 0
if (clearLinesInitState < 0) {
  clearLinesInitState = 0
}

// 初始化当前方块的状态
const curInitState = (() => {
  if (!lastRecord || !lastRecord.cur) {
    // 无记录或有记录但方块为空, 返回 null
    return null
  }
  const cur = lastRecord.cur
  const option = {
    type: cur.type,
    rotateIndex: cur.rotateIndex,
    shape: cur.shape,
    xy: cur.xy
  }
  return new Block(option)
})()

// 初始化是否快速下落的状态
const dropInitState = lastRecord && lastRecord.drop !== undefined
  ? !!lastRecord.drop
  : false

// 初始化是否锁定的状态
const lockInitState = lastRecord && lastRecord.lock !== undefined
  ? !!lastRecord.lock
  : false

// 初始化矩阵状态
const matrixInitState = lastRecord && Array.isArray(lastRecord.matrix)
  ? lastRecord.matrix
  : blankMatrix

// 初始化最高分数状态
let maxInitState = lastRecord && !isNaN(parseInt(lastRecord.max, 10))
  ? parseInt(lastRecord.max, 10)
  : 0

if (maxInitState < 0) {
  maxInitState = 0
} else if (maxInitState > maxPoint) {
  maxInitState = maxPoint
}

// 初始化音乐状态
let musicInitState = lastRecord && lastRecord.music !== undefined
  ? !!lastRecord.music
  : true
if (!hasWebAudioAPI.data) {
  musicInitState = false
}

// 初始化下一个方块的类型
const nextInitState = lastRecord && blockType.indexOf(lastRecord.next) !== -1
  ? lastRecord.next
  : getNextType()

// 初始化暂停状态
const pauseInitState = lastRecord && lastRecord.pause !== undefined
  ? !!lastRecord.pause
  : false

// 初始化当前得分状态
let pointsInitState = lastRecord && !isNaN(parseInt(lastRecord.points, 10))
  ? parseInt(lastRecord.points, 10)
  : 0

if (pointsInitState < 0) {
  pointsInitState = 0
} else if (pointsInitState > maxPoint) {
  pointsInitState = maxPoint
}

// 初始化游戏运行速度状态
let speedRunInitState = lastRecord && !isNaN(parseInt(lastRecord.speedRun, 10))
  ? parseInt(lastRecord.speedRun, 10)
  : 1
if (speedRunInitState < 1 || speedRunInitState > 6) {
  speedRunInitState = 1
}

// 初始化游戏开始速度状态
let speedStartInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.speedStart, 10))
  ? parseInt(lastRecord.speedStart, 10)
  : 1
if (speedStartInitState < 1 || speedStartInitState > 6) {
  speedStartInitState = 1
}

// 初始化游戏开始时的消除行数状态
let startLinesInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.startLines, 10))
  ? parseInt(lastRecord.startLines, 10)
  : 0
if (startLinesInitState < 0 || startLinesInitState > 10) {
  startLinesInitState = 0
}

// 初始化重置状态
const resetInitState = lastRecord && lastRecord.reset
  ? !!lastRecord.reset
  : false

// 定义 Vuex 状态
const state = {
  music: musicInitState, // 音乐状态
  pause: pauseInitState, // 暂停状态
  matrix: matrixInitState, // 矩阵状态
  next: nextInitState, // 下一个方块类型
  cur: curInitState, // 当前方块状态
  speedStart: speedStartInitState, // 游戏开始速度
  speedRun: speedRunInitState, // 游戏运行速度
  startLines: startLinesInitState, // 游戏开始时的消除行数
  clearLines: clearLinesInitState, // 当前消除行数
  points: pointsInitState, // 当前得分
  max: maxInitState, // 最高得分
  reset: resetInitState, // 重置状态
  drop: dropInitState, // 是否快速下落
  keyboard: { // 键盘状态
    drop: false,
    down: false,
    left: false,
    right: false,
    rotate: false,
    reset: false,
    music: false,
    pause: false
  },
  lock: lockInitState, // 是否锁定
  focus: isFocus() // 是否聚焦
}

// 导出 Vuex Store 实例
export default new Vuex.Store({
  state,
  // getters,
  // actions,
  mutations
})
