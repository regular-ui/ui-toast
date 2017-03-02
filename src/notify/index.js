import Toast from '../toast';
import template from './index.rgl';

/**
 * @class Notify
 * @extends Toast
 * @param {Object}                  options.data                     =  绑定属性
 * @param {string='top-right'}      options.data.position            => 通知的位置，可选参数：`top-center`、`top-left`、`top-right`、`bottom-center`、`bottom-left`、`bottom-right`、`static`
 * @param {number=3000}             options.data.duration            => 每条通知默认的停留毫秒数，如果为0，则表示通知常驻不消失。
 * @param {boolean=false}           options.data.single              => 是否始终显示一条
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
const Notify = Toast.extend({
    name: 'notify',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.defaults({
            // @inherited list: [],
            position: 'top-right',
            duration: 3000,
            // @inherited single: false,
            // @inherited animation: 'on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;',
        });
        this.supr();
    },
    /**
     * @method show(content[,title][,duration][,state]) 弹出一个通知
     * @public
     * @param  {string=''} content 通知内容
     * @param  {string=''} title 通知标题
     * @param  {number=notify.duration} duration 该条通知的停留毫秒数。如果为0，则表示通知常驻不消失。如果不填，则使用notify默认的duration。
     * @param  {string=''} state 通知状态，可选参数：`info`、`success`、`warning`、`error`
     * @return {object} item 返回弹出的通知项
     */
    show(content, title, duration, state) {
        return this._show({
            content,
            title,
            state,
            duration: +(duration >= 0 ? duration : this.data.duration),
        });
    },
    /**
     * @method close(item) 关闭某条通知
     * @public
     * @param  {object} item 需要关闭的通知项
     * @return {void}
     */
    /**
     * @method closeAll() 关闭所有通知
     * @public
     * @return {void}
     */
});

/**
 * @method [info|success|warning|error](content[,title][,duration]) 弹出特殊类型的通知。为show方法的简写方式。
 * @public
 * @param  {string=''} content 通知内容
 * @param  {string=''} title 通知标题
 * @param  {number=toast.duration} duration 该条通知的停留毫秒数。如果为0，则表示通知常驻不消失。如果不填，则使用toast默认的duration。
 * @return {void}
 */
Toast.STATES.forEach((state) => {
    Notify.prototype[state] = function (content, title, duration) {
        this.show(content, title, duration, state);
    };
});

/**
 * @static
 * @private {Notify}
 * @description 直接初始化一个实例
 */
const notify = Notify.notify = new Notify();
Toast.METHODS.forEach((method) => Notify[method] = notify[method].bind(notify));

export default Notify;
