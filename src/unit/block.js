import { blockShape, origin } from './const'

// 定义方块类
class Block {
  constructor(option) {
    // 方块类型
    this.type = option.type

    // 旋转索引，默认为 0
    if (!option.rotateIndex) {
      this.rotateIndex = 0
    } else {
      this.rotateIndex = option.rotateIndex
    }

    // 时间戳，默认为当前时间
    if (!option.timeStamp) {
      this.timeStamp = Date.now()
    } else {
      this.timeStamp = option.timeStamp
    }

    // 方块形状，初始化时根据类型设定形状
    if (!option.shape) {
      this.shape = blockShape[option.type]
    } else {
      this.shape = option.shape
    }

    // 方块初始坐标，根据类型设定
    if (!option.xy) {
      switch (option.type) {
        case 'I': // I 形状
          this.xy = [0, 3]
          break
        case 'L': // L 形状
          this.xy = [-1, 4]
          break
        case 'J': // J 形状
          this.xy = [-1, 4]
          break
        case 'Z': // Z 形状
          this.xy = [-1, 4]
          break
        case 'S': // S 形状
          this.xy = [-1, 4]
          break
        case 'O': // O 形状
          this.xy = [-1, 4]
          break
        case 'T': // T 形状
          this.xy = [-1, 4]
          break
        default:
          break
      }
    } else {
      this.xy = option.xy
    }
  }

  // 旋转方法
  rotate() {
    const shape = this.shape
    let result = []

    // 旋转矩阵
    shape.forEach(m =>
      m.forEach((n, k) => {
        const index = m.length - k - 1
        if (result[index] === undefined) {
          result[index] = []
        }
        result[index].push(n)
        const tempK = [...result[index]]
        result[index] = tempK
      })
    )

    // 计算旋转后的新坐标
    const nextXy = [
      this.xy[0] + origin[this.type][this.rotateIndex][0],
      this.xy[1] + origin[this.type][this.rotateIndex][1]
    ]

    // 更新旋转索引
    const nextRotateIndex = this.rotateIndex + 1 >= origin[this.type].length
      ? 0
      : this.rotateIndex + 1

    // 返回新的方块状态
    return {
      shape: result,
      type: this.type,
      xy: nextXy,
      rotateIndex: nextRotateIndex,
      timeStamp: this.timeStamp
    }
  }

  // 下落方法，默认为下降一行
  fall(n = 1) {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0] + n, this.xy[1]],
      rotateIndex: this.rotateIndex,
      timeStamp: Date.now()
    }
  }

  // 向右移动
  right() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] + 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp
    }
  }

  // 向左移动
  left() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] - 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp
    }
  }
}

export default Block
