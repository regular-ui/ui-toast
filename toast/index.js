import { Component } from 'rgui-ui-base';
import template from './index.rgl';

/**
 * @class Toast
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='top-center'}     options.data.position            => 消息提示的位置，可选参数：`top-center`、`top-left`、`top-right`、`bottom-center`、`bottom-left`、`bottom-right`、`static`
 * @param {number=2000}             options.data.duration            => 每条消息默认的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @param {boolean=false}           options.data.single              => 是否始终显示一条
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
const Toast = Component.extend({
    name: 'toast',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.defaults({
            list: [],
            position: 'top-center',
            duration: 2000,
            single: false,
            animation: 'on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;',
        });
        this.supr();
    },
    /**
     * @protected
     * @override
     */
    init() {
        this.supr();

        // 如果不是内嵌组件，则嵌入到document.body中
        if (this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method show(text[,duration][,state]) 弹出一个消息
     * @public
     * @param  {string=''} text 消息内容
     * @param  {number=toast.duration} duration 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用toast默认的duration。
     * @param  {string=''} state 消息状态，可选参数：`info`、`success`、`warning`、`error`
     * @return {object} item 返回弹出的消息项
     */
    show(text, duration, state) {
        return this._show({
            text,
            state,
            duration: +(duration >= 0 ? duration : this.data.duration),
        });
    },
    /**
     * @method show(item) 弹出一个消息
     * @protected
     * @param  {Item} item 消息项
     * @return {object} item 返回弹出的消息项
     * @comment 暂不考虑直接传对象的方法
     */
    _show(item) {
        const list = this.data.list;

        if (this.data.single && list[0]) {
            item = Object.assign(list[0], item);
            item.counter++;
        } else {
            list.unshift(item);
            item.counter = 0;
        }

        this.$update();

        if (item.duration) {
            setTimeout(() => {
                if (!item.counter)
                    this.close(item);
                else
                    item.counter--;
            }, item.duration);
        }

        /**
         * @event show 弹出一个消息时触发
         * @property {object} sender 事件发送对象
         * @property {object} item 弹出的消息项
         */
        this.$emit('show', {
            sender: this,
            item,
        });

        return item;
    },
    /**
     * @method close(item) 关闭某条消息
     * @public
     * @param  {object} item 需要关闭的消息项
     * @return {void}
     */
    close(item) {
        const index = this.data.list.indexOf(item);
        if (index < 0)
            return;
        this.data.list.splice(index, 1);
        this.$update();

        /**
         * @event close 关闭某条消息时触发
         * @property {object} sender 事件发送对象
         * @property {object} item 关闭了的消息对象
         */
        this.$emit('close', {
            sender: this,
            item,
        });
    },
    /**
     * @method closeAll() 关闭所有消息
     * @public
     * @return {void}
     */
    closeAll() {
        this.data.list = [];
        this.$update();
    },
});

const STATES = Toast.STATES = ['success', 'warning', 'info', 'error'];
/**
 * @method [info|success|warning|error](text[,duration]) 弹出特殊类型的消息。为show方法的简写方式。
 * @public
 * @param  {string=''} text 消息内容
 * @param  {number=toast.duration} duration 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用toast默认的duration。
 * @return {void}
 */
STATES.forEach((state) => {
    Toast.prototype[state] = function (text, duration) {
        this.show(text, duration, state);
    };
});

/**
 * @static
 * @private {Toast}
 * @description 直接初始化一个实例
 */
const toast = Toast.toast = new Toast();
const METHODS = Toast.METHODS = ['show', 'close', 'closeAll', 'success', 'warning', 'info', 'error'];
/**
 * @method show(text[,duration][,state]) 弹出一个消息
 * @static
 * @public
 * @param  {string=''} text 消息内容
 * @param  {number=toast.duration} duration 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用toast默认的duration。
 * @param  {string=''} state 消息状态，可选参数：`info`、`success`、`warning`、`error`
 * @return {object} item 返回弹出的消息项
 */
/**
 * @method [info|success|warning|error](text[,duration]) 弹出特殊类型的消息。为show方法的简写方式。
 * @static
 * @public
 * @param  {string=''} text 消息内容
 * @param  {number=toast.duration} duration 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用toast默认的duration。
 * @return {void}
 */
/**
 * @method close(item) 关闭某条消息
 * @static
 * @public
 * @param  {object} item 需要关闭的消息对象
 * @return {void}
 */
/**
 * @method closeAll() 关闭所有消息
 * @static
 * @public
 * @return {void}
 */
METHODS.forEach((method) => Toast[method] = toast[method].bind(toast));

export default Toast;
