# 常见布局

## 水平垂直居中

CSS实现水平垂直居中的方式大概有：

* 仅居中元素定宽高适用
  * absolute + 负margin
  * absolute + margin auto
  * absolute + calc
* 居中元素不定宽高
  * absolute + transform
  * line-height + vertical-align（父元素定高）
  * table-cell（父元素定宽）
  * flex
  * grid

详情参考文章<a href="https://www.baidu.com/s?wd=CSS%E5%AE%9E%E7%8E%B0%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD%E7%9A%841010%E7%A7%8D%E6%96%B9%E5%BC%8F(%E5%8F%B2%E4%B8%8A%E6%9C%80%E5%85%A8)" target="_blank">CSS实现水平垂直居中的1010种方式（史上最全）</a>



## Table布局

- #### display: table

  - 如果table设置了宽度，宽度默认被它里面的td平均分。如果给某一个td设置宽度，那么table剩余的宽度会被其他的td平分。
  - 给table设置的高度起到只是min-height的作用，当内容高度高于设置的高度时，table会被撑高。


- #### display: table-row

    - 给tr设置高度只起到min-height的作用，默认会平分table的高度。
    - tr中的td默认高度会继承tr的高度，若给任一td设置了高度，其他td的高度也同样变高。适合多列等高布局。
    - 设置宽度、margin、都不起作用

- #### display: table-cell

      - td默认继承tr的高度，且平分table的宽度。
      - 若table（display:table）不存在，给td设置的宽高不能用百分比只能用准确的数值。
      - 给td设置vertical-align: middle; td元素里面(除float、position:absolute)所有的块级、非块级元素都会相对于td垂直居中。
      - 给td设置text-align: center; td元素里面所有非block元素(除float、position:absolute)都会相对于td水平居中，虽然block元素不居中，但其中的文字或inline元素会水平居中。




## 两栏布局

* 一栏定宽一栏自适应
  * 一栏使用float，一栏使用margin
  * 一栏使用float，一栏使用overflow创建BFC
  * 自适应栏使用绝对定位
  * flex
* 一栏不定宽一栏自适应
  * 一栏使用float，一栏使用overflow创建BFC
  * flex



## 三栏布局

```html
<div class="wrapper">
  <div>MAIN</div>
  <div>LEFT</div>
  <div>RIGHT</div>
</div>
```

* 左右定宽中间自适应

  * MAIN使用margin，LEFT和RIGHT使用绝对定位；

  * 圣杯布局/双飞翼布局

    MAIN、LEFT和RIGHT三者使用FLOAT，通过负margin和LEFT、RIGHT的相对定位以及在wrapper上利用padding或margin达成目的；该方式需要注意清除浮动；

  * box-sizing: border-box

  * 使用flex

* 其他

  * table布局



## flex & margin: auto

* **BFC**中`margin-top` 和 `margin-bottom` 的值如果是 auto，则他们的值都为 0
* **flex 格式化上下文**中，在通过 `justify-content` 和 `align-self` 进行对齐之前，任何正处于空闲的空间都会分配到该方向的自动 margin 中去
* 单个方向上的自动 margin 也非常有用，它的计算值为该方向上的剩余空间
* 使用了自动 margin 的 flex 子项目，它们父元素设置的 `justify-content` 以及它们本身的 `align-self` 将不再生效



## 瀑布流布局

* multi-column + break-inside: avoid；
* grid布局