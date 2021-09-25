# 基本配置

## zIndex

UILib 的基准 index 值，如果你想配合 element 一起使用，建议 index 设置为 5000 以上

-   类型：`Number`
-   默认：`5000`
-   必填：否

配置方式:

在 main.js 中写入以下内容：

```js
Vue.use(UILib, { zIndex: 5000 })
```

## size

组件默认大小，可选 medium / small / mini

-   类型：`String`
-   默认：`medium`
-   必填：否
