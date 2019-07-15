# component design

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
**checkbox多选框**
> checkboxgroup
- inline：是否开启内行模式，默认false
> checkbox
- disabled：禁用，默认false
- on-change事件，改变状态时触发
***
**Input输入框**
- type
    - text：默认，普通输入框
    - password：密码输入框
- placeholder：普通placeholder
- disabled：禁用属性，默认false
- width：自定义宽度，默认220（不需要加px）
- height：自定义高度，默认36（不需要加px）
- fontSize：自定义字体大小，默认14（不需要加px）
> 事件
- on-change：输入改变事件，返回输入值
- on-blur：失去焦点事件，返回输入值
***
**Table列表**
> 目前只设计样式类，添加到class
- table-primary，默认样式
- table-border，有边框
- table-handle，用于有操作的按钮
***
**Button按钮**
- type
    - primary：确认按钮
    - cancel：取消按钮
- disabled：禁用按钮
- width：自定义宽度，默认120（不需要加px）
- height：自定义高度，默认40（不需要加px）
- fontSize：自定义字体大小，默认13（不需要加px）
***
**color颜色**
- primary（主色）： #2e68ea
- light primary（主色高亮）：rgba(46, 104, 234, 0.8);
- 默认色：
    - success： #4bd863
    - error： #ff3b30
    - warning： #fe9400
- 取消控件：#cccccc
- 禁用控件：#e5e5e5