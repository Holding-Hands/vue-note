import CheckDialog from "./CheckDialog";

export default {
  install: function (Vue) {
    //1.创建组件构造器
    const toastConstructor = Vue.extend(CheckDialog)

    //2.new的方式，根据组件构造器可以创建出来一个组件对象
    const dialog = new toastConstructor()

    //3.将组件对象，手动挂载到某一个元素上
    dialog.$mount(document.createElement('div'))

    //4.toast.$el对应的就是上面创建的div
    document.body.appendChild(dialog.$el)

    //5.添加到原型上
    Vue.prototype.$CheckDialog = dialog;
    Vue.prototype.$dialog = dialog.onClickIsShowDialog
  }
}
