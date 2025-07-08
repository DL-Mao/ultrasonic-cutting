# 产品GIF设置指南

## 📁 文件位置

为了让您的三个产品展示GIF动画，请将以下文件放入 `image/` 文件夹中：

```
image/
├── show.gif              # 现有的首页背景GIF
├── kitchen-knife.gif     # 超声波厨房刀GIF（待添加）
├── bread-knife.gif       # 超声波面包刀GIF（待添加）
└── plastic-knife.gif     # 超声波塑料切割刀GIF（待添加）
```

## 🔧 修改CSS文件

当您准备好GIF文件后，在 `styles.css` 文件中找到以下部分并修改：

### 1. 超声波厨房刀
```css
.kitchen-knife-media .product-placeholder {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    /* 修改为： */
    background-image: url('image/kitchen-knife.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

### 2. 超声波面包刀
```css
.bread-knife-media .product-placeholder {
    background: linear-gradient(135deg, #f39c12, #e67e22);
    /* 修改为： */
    background-image: url('image/bread-knife.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

### 3. 超声波塑料切割刀
```css
.plastic-knife-media .product-placeholder {
    background: linear-gradient(135deg, #3498db, #2980b9);
    /* 修改为： */
    background-image: url('image/plastic-knife.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

## 📐 GIF尺寸建议

- **最佳尺寸**：1920 x 1080 像素（16:9比例）
- **文件大小**：建议控制在5MB以内，确保加载速度
- **格式**：GIF格式，支持动画循环播放

## 🎨 样式调整选项

您还可以根据需要调整以下属性：

- `background-size: cover` - 覆盖整个区域
- `background-size: contain` - 完整显示GIF，可能有空白
- `background-position: center` - 居中显示
- `background-position: top` - 顶部对齐

## ✅ 测试建议

1. 添加GIF文件后刷新浏览器
2. 检查移动端显示效果
3. 确认动画播放流畅
4. 测试加载速度是否合理

## 🔄 回退方案

如果GIF文件有问题，网站会自动显示当前的渐变背景和图标，不会影响整体使用。 