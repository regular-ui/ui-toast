创建全局消息提示，能够自动淡出。

## 示例
### 基本形式

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.show()}>Toast</button>
```

```javascript
let component = new RGUI.Component({
    template,
    show() {
        RGUI.Toast.show('a message');
    },
});
```

### 状态扩展

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-info" on-click={this.show('info')}>info</button>
<button class="u-btn u-btn-success" on-click={this.show('success')}>success</button>
<button class="u-btn u-btn-warning" on-click={this.show('warning')}>warning</button>
<button class="u-btn u-btn-error" on-click={this.show('error')}>error</button>
```

```javascript
let component = new RGUI.Component({
    template,
    show(state) {
        RGUI.Toast[state](state + ' message');
    },
});
```

### 位置扩展

<div class="m-example"></div>

```xml
<button class="u-btn" on-click={this.show(0)}>top-center</button>
<button class="u-btn" on-click={this.show(1)}>top-left</button>
<button class="u-btn" on-click={this.show(2)}>top-right</button>
<button class="u-btn" on-click={this.show(3)}>bottom-center</button>
<button class="u-btn" on-click={this.show(4)}>bottom-left</button>
<button class="u-btn" on-click={this.show(5)}>bottom-right</button>
```

```javascript
let component = new RGUI.Component({
    template,
    config() {
        this.toasts = [
            new RGUI.Toast({ data: { position: 'top-center' } }),
            new RGUI.Toast({ data: { position: 'top-left' } }),
            new RGUI.Toast({ data: { position: 'top-right' } }),
            new RGUI.Toast({ data: { position: 'bottom-center' } }),
            new RGUI.Toast({ data: { position: 'bottom-left' } }),
            new RGUI.Toast({ data: { position: 'bottom-right' } }),
        ];
    },
    show(index) {
        var toast = this.toasts[index];
        toast.show('position: ' + toast.data.position);
    },
});
```

### 嵌入文档流

上面的模式Toast都是以`fixed`的形式固定在浏览器中，也可以将Toast嵌入文档流。先将toast注入到需要的位置，然后设置toast的`position="static"`。

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.show()}>static</button>
<toast ref="toast" position="static" duration="0" />
```

```javascript
let component = new RGUI.Component({
    template,
    show() {
        this.$refs.toast.show('static toast');
    },
});
```

### 消息停留时间

可以通过设置toast的`duration`参数设置所有消息的停留时间，也可以在`show`的时候单独设置该条消息的停留时间，单位为毫秒。

<div class="m-example"></div>

```xml
<button class="u-btn" on-click={this.show(500)}>0.5s</button>
<button class="u-btn" on-click={this.show(1000)}>1s</button>
<button class="u-btn" on-click={this.show(2000)}>2s</button>
<button class="u-btn" on-click={this.show(0)}>常驻</button>
```

```javascript
let component = new RGUI.Component({
    template,
    show(duration) {
        RGUI.Toast.show('duration: ' + duration + ' ms', duration);
    },
});
```

### 始终显示一条

将`single`设置为`true`，可以让toast始终只显示一条消息。

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-info" on-click={this.show('info')}>Info</button>
<button class="u-btn u-btn-success" on-click={this.show('success')}>Success</button>
<button class="u-btn u-btn-warning" on-click={this.show('warning')}>Warning</button>
<button class="u-btn u-btn-error" on-click={this.show('error')}>Error</button>
```

```javascript
let component = new RGUI.Component({
    template,
    config() {
        this.toast = new RGUI.Toast({ data: {single: true} });
    },
    number: 1,
    show: function(state) {
        this.toast[state]('message ' + this.number);
        this.number++;
    }
});
```
