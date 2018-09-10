//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: "", //用户输入内容
    list: [
      { name: 'Airbnb', completed: false },
      { name: 'Booking', completed: true },
      { name: 'Agoda', completed: true },
      { name: 'Expedia', completed: false },
    ],
    leftCount: 0, //未完成任务数量
  },
  //生命周期
  onLoad() {
    this.setData({
      leftCount: this.data.list.filter(item => !item.completed).length
    })
  },
  //获取用户输入的数据(bindinput事件,输入框每输入一次数据触发一次,返回输入框中的字符串)
  getTodoHandler(e) {
    // console.log(e.detail.value);
    this.setData({ name: e.detail.value });
  },
  //当用户弹出的输入框点击完成时触发
  addTodoHandler() {
    // console.log('用户输入的数据:',this.data.name);
    //功能实现
    // if ( this.data.name === "") return
    // this.data.list.unshift({
    //   name: this.data.name,
    //   completed: false
    // })
    // this.setData({
    //   list: this.data.list,
    //   name: ""
    // })
    //解构赋值优化
    const { list, name, leftCount } = this.data;
    
    if (name === "") return
    list.unshift({
      name,
      completed: false
    })
    this.setData({
      list,
      name: "",
      leftCount: leftCount + 1
    })
  },
  //切换每一条任务的选中状态
  changeCheckedHandler(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    let { list, leftCount } = this.data;
    let item = list[index];
    item.completed = !item.completed;
    this.setData({ 
      list,
      leftCount: item.completed ? leftCount - 1 : leftCount + 1
    })
  },
  //删除任务(绑定事件使用catchtap阻止冒泡,获取当前点击的序号不可通过父元素的index来绑定)
  delTodoHandler(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    let { list, leftCount } = this.data;
    let item = list[index];
    if (!item.completed) leftCount--;//删除项为未完成,leftCount减1,已完成则不操作
    list.splice(index,1);
    this.setData({
      list,
      leftCount
    })
  },
  //切换全选状态
  toggleAll() {
    const { list, leftCount } = this.data;
    //数组中的所有completed状态都为true,即全选中
    // 优化后的代码
    const flag = list.every(el => el.completed);
    list.map(el => el.completed = !flag);
    /*
    if (list.every(el => el.completed)) {
      //让其变成全不选状态
      list.map(el => el.completed = false);
    } else {
      list.map(el => el.completed = true);
    }
    */
    this.setData({ 
      list,
      leftCount: flag ? this.data.list.length : 0
     })
  },
  //清除已完成任务
  clearCompletedHandler() {
    //相当于保未完成任务
    const { list } = this.data;
    this.setData({
      list: list.filter(item => !item.completed)
    })
  }
})
