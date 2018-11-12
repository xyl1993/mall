export const shareData = 
  {
    width: 375,
    height: 555,
    views: [
      {
        type: 'image',
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',   //图片背景图  
        top: 0,
        left: 0,
        width: 375,
        height: 555
      },
      {
        // 用户头像  如果没有取默认头像
        type: 'image',
        url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJEPdPqQVgv6D8bojGT4DrGXuEC4Oe0GXs5sMsN4GGpCegTUsBgL9SPJkN9UqC1s0iakjQpwd4h4A/132',
        top: 27.5,
        left: 29,
        width: 55,
        height: 55
      },
      {   //不用替换
        type: 'image',
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
        top: 27.5,
        left: 29,
        width: 55,
        height: 55
      },
      {   //分享人昵称  没有取默认
        type: 'text',
        content: '您的好友【kuckboy】',
        fontSize: 16,
        color: '#402D16',
        textAlign: 'left',
        top: 33,
        left: 96,
        bolder: true
      },
      {   //商品标题
        type: 'text',
        content: '发现一件好货！',
        fontSize: 15,
        color: '#563D20',
        textAlign: 'left',
        top: 59.5,
        left: 96
      },
      {   //商品缩略图
        type: 'image',
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',
        top: 136,
        left: 42.5,
        width: 290,
        height: 186
      },
      {
           //小程序二维码
        type: 'image',
        url: 'https://www.billionsen.cn/mall/upload/93831541999309540.jpg',
        top: 443,
        left: 85,
        width: 68,
        height: 68
      },
      {
        //商品标题
        type: 'text',
        content: '',
        fontSize: 16,
        lineHeight: 21,
        color: '#383549',
        textAlign: 'left',
        top: 336,
        left: 44,
        width: 287,
        MaxLineNumber: 2,
        breakWord: true,
        bolder: true
      },
      {
        type: 'text',
        content: '￥0.00',
        fontSize: 19,
        color: '#E62004',
        textAlign: 'left',
        top: 387,
        left: 44.5,
        bolder: true
      },
      {  
        //价格
        type: 'text',
        content: '原价:￥138.00',
        fontSize: 13,
        color: '#7E7E8B',
        textAlign: 'left',
        top: 391,
        left: 110,
        textDecoration: 'line-through'
      },
      {
        type: 'text',
        content: '长按识别图中二维码保存分享到朋友圈吧',
        fontSize: 14,
        color: '#383549',
        textAlign: 'left',
        top: 460,
        left: 165.5,
        lineHeight: 20,
        MaxLineNumber: 2,
        breakWord: true,
        width: 125
      }
    ]
  }
