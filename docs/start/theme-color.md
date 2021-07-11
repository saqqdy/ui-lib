# 主题色

## 四种主题色

```less
@green: #00d1a0;
@orange: #fe703f;
@blue: #5e80eb;
@purple: #875bfc;
```

| 参数    | 说明                                |
| ------- | ----------------------------------- |
| @green  | <font color="#00d1a0">清新绿</font> |
| @blue   | <font color="#fe703f">活力橙</font> |
| @orange | <font color="#5e80eb">商务蓝</font> |
| @purple | <font color="#875bfc">典雅紫</font> |

## hover 效果

hover 效果即变浅效果，采用设置透明度为 0.8

```less
// less下使用16进制
.mouse {
    color: #00d1a0;
    &:hover {
        color: rgba(#00d1a0, 0.8);
    }
}
```

## 换肤样式

```vue
// business 业务代码
<template>
    <div class="demo">...</div>
</template>

// 换肤设置
<style lang="less" scoped>
.theme(@color){
    // 当前组件里需要使用皮肤色的样式
    .demo{
        color: @color;
    }
}
// 通过less的loop循环，根据变量themeList的颜色列表生成
.loop(@i) when (@i < length(@themeList)+1){
.theme-@{i}{
    .theme(extract(@themeList, @i));
}
    .loop(@i+1);
}
.loop(1);
</style>
```
