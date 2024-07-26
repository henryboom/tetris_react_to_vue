<template>
    <!-- 外部容器，包含按钮的主要样式和位置 -->
    <div class="button" :class="color + ' ' + size" :style="'top:' + top + 'px;' + 'left:' + left + 'px'">
        <!-- 图标元素，依据 'active' 属性决定是否添加 'active' 类 -->
        <i :class="{ 'active': active }" />
        <!-- em 元素，只有在 size 为 's1' 时才显示，应用箭头样式和缩放 -->
        <em :style="'transform:' + arrow + ' scale(1,2)'" v-show="size === 's1'" />
        <!-- span 元素，依据 'position' 属性决定是否添加 'position' 类，显示标签文本 -->
        <span :class="position ? 'position' : ''">
            {{ label }}
        </span>
    </div>
</template>

<script>
import { transform } from '../../../unit/const'

export default {
    props: [
        'active',   // 布尔类型，表示图标是否处于活动状态，决定 <i> 元素的 'active' 类
        'color',    // 字符串类型，按钮的颜色，应用于外部容器的类名
        'size',     // 字符串类型，按钮的大小，应用于外部容器的类名
        'top',      // 数字类型，按钮相对父容器的顶部位置，应用于外部容器的内联样式
        'left',     // 数字类型，按钮相对父容器的左侧位置，应用于外部容器的内联样式
        'label',    // 字符串类型，按钮的文本标签，显示在 <span> 元素内
        'position', // 布尔类型，表示是否添加 'position' 类到 <span> 元素，控制样式
        'arrow'     // 字符串类型，表示箭头的变换样式，应用于 <em> 元素的 'transform' 样式
    ]
}

</script>


<style lang="less" scoped>
.background(@from, @to) {
    background: (@from + @to)/2;
    background: -webkit-gradient(linear, left top, left bottom, from(@from), to(@to));
    background: -moz-linear-gradient(top, @from, @from); // IE9使用filter背景渐变, 但因为使用了borader-radius, 所以不兼容, IE9使用中和的背景色即可
    //filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='@{from}', endColorstr='@{to}');
}

.button {
    position: absolute;
    text-align: center;
    color: #111;
    position: absolute;
    white-space: nowrap;
    line-height: 1.6;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &.s2 {
        font-size: 16px;
    }

    span.position {
        position: absolute;
        top: 5px;
        left: 102px;
    }

    i {
        display: block;
        position: relative;
        border: 1px solid #000;
        border-radius: 50%;

        &:before,
        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 50%;
            box-shadow: 0 5px 10px rgba(255, 255, 255, .8) inset;
        }

        &:after {
            box-shadow: 0 -5px 10px rgba(0, 0, 0, .8) inset;
        }

        &.active {
            &:before {
                box-shadow: 0 -3px 6px rgba(255, 255, 255, .6) inset;
            }

            &:after {
                box-shadow: 0 5px 5px rgba(0, 0, 0, .6) inset;
            }
        }

        box-shadow: 0 3px 3px rgba(0, 0, 0, .2);
    }

    &.blue i {
        .background(#6e77ef, #4652f3);
    }

    &.green i {
        .background(#4bc441, #0ec400);
    }

    &.red i {
        .background(#dc3333, #de0000);
    }

    &.s0 i {
        width: 160px;
        height: 160px;
    }

    &.s1 i {
        width: 100px;
        height: 100px;
    }

    &.s2 i {
        width: 52px;
        height: 52px;

        &:before,
        &:after {
            box-shadow: 0px 3px 6px rgba(255, 255, 255, .8) inset;
        }

        &:after {
            box-shadow: 0px -3px 6px rgba(0, 0, 0, .8) inset;
        }

        &.active {
            &:before {
                box-shadow: 0px -1px 2px rgba(255, 255, 255, .6) inset;
            }

            &:after {
                box-shadow: 0px 3px 3px rgba(0, 0, 0, .7) inset;
            }
        }

        box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
    }

    &.s1 {
        em {
            display: block;
            width: 0;
            height: 0;
            border: 8px solid;
            border-color: transparent transparent #111;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -12px 0 0 -8px;
        }
    }
}
</style>