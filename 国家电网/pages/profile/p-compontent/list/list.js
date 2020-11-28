// pages/profile/p-compontent/list/list.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mes: {
      type: Object,
      value: {}
    },    
    mes1: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    box1: {
      img: "../../../../assets/img/profile/profile-icon/wdcbxm.png",
      title: "我的储备项目",
      num: 0
    },
    box2: {
      img: "../../../../assets/img/profile/profile-icon/wcjdpxb.png",
      title: "我参加的培训班",
      num: 0
    },
/*     box3: {
      img: "../../../../assets/img/profile/profile-icon/wgldpxb.png",
      title: "我管理的培训班",
      num: 3
    }, */
    box4: {
      img: "../../../../assets/img/profile/profile-icon/wshdxm.png",
      title: "待审核项目",
      num: 0
    },
    box5: {
      img: "../../../../assets/img/profile/profile-icon/wnotice.png",
      title: "消息通知",
      isswitch: true,
      isOpenWxmsg: 'N'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    box1Click(){
      wx.switchTab({
        url: '../reserveitem/reserveitem?role=0',
      })
    },
    box2Click(){
      wx.switchTab({
        url: '../../../../trainingclass/trainingclass'
      })
    },
    box3Click(){

    },
    box4Click(){
      wx.navigateTo({
        url: '../../../../checkproject/checkproject',
      })
    }
  },

  // 监控数据变化
  observers: {
    'mes1': function(){
      //监听mes1中的数据变化
      let that = this.properties.mes1
      if(that.projectTotalCount >= 0 || that.classTotalCount >= 0 || that.mgrProjectCount >= 0){
        let box1 = this.data.box1;
        box1.num = that.projectTotalCount || 0;
        let box2 = this.data.box2;
        box2.num = that.classTotalCount || 0;
        let box4 = this.data.box4;
        box4.num = that.mgrProjectCount || 0;
        let box5 = this.data.box5;
        box5.isOpenWxmsg = that.isOpenWxmsg || 'N';
        this.setData({
          box1, box2, box4, box5
        })
      }else{
        return
      }
    }
  },

  /*组件生命周期*/ 
  // lifetimes: {
  //   ready: function(){
  //     let timer = setInterval(() => {
  //       let that = this.properties.mes1
  //       console.log('that',that)
  //       if(that.projectTotalCount >= 0 || that.classTotalCount >= 0 || that.mgrProjectCount >= 0){
  //         clearInterval(timer)
  //         let box1 = this.data.box1;
  //         box1.num = that.projectTotalCount || 0;
  //         let box2 = this.data.box2;
  //         box2.num = that.classTotalCount || 0;
  //         let box4 = this.data.box4;
  //         box4.num = that.mgrProjectCount || 0;
  //         let box5 = this.data.box5;
  //         console.log(that.isOpenWxmsg)
  //         box5.isOpenWxmsg = that.isOpenWxmsg || 'N';
  //         this.setData({
  //           box1, box2, box4, box5
  //         })
  //       }else{
  //         return
  //       }
  //     }, 120)
  //   }
  // }

})
