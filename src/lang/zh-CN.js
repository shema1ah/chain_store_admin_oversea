'use strict';

exports.__esModule = true;
exports.default = {
  common: {
    ok: '确 定',
    cancel: '取 消',
    tip: '提示',
    all: '全部',
    netError: '网络错误',
    loading: '拼命加载中'
  },
  shopmng: { // 门店管理模块
    crumbs: {
      L1: '门店管理'
    },
    title: {
      baseInfo: '基本信息',
      subInfo: '分店信息'
    },
    panel: {
      shopName: '商户名称',
      loginAccount: '登录账号',
      btn: {
        editPwd: '修改密码',
        editSub: '编辑分店',
        editSubTag: '编辑分店编号',
        down: '下载店铺收款码'
      },
      table: {
        subName: '分店名称',
        loginAccount: '登录账号',
        regTime: '注册时间',
        subTag: '分店编号',
        op: '操作',
        detail: '查看详情',
        more: '更多',
        editPwd: '修改密码',
        delSub: '删除分店'
      }
    },
    dialog: {
      editPwd: '修改密码',
      loginAccount: '登录账号',
      inputNewPwd: '输入新密码',
      confirmNewPwd: '确认新密码',
      msg: {
        m1: '请输入新密码',
        m2: '请输入确认新密码',
        m3: '新密码与确认密码不一致',
        m4: '请输入6~20位数字或字母'
      },
      cancel: '取消',
      ok: '确定',
      confirm: '确认',
      shopDetail: '门店详情',
      shopName: '店铺名称',
      address: '地址',
      mobile: '手机号',
      cardHolder: '持卡人',
      bankAccount: '银行账户',
      bankName: '银行名称',
      editSubTag: '编辑分店编号',
      diaTip: '分店编号设置成功后将会显示在下载的交易明细和交易汇总中',
      validateText: '请输入二十位以内的文字或字母',
      validateText2: '请输入总账户登录密码',
      notice: '提示',
      noticeTip: '删除分店前建议先终止该分店正在进行的会员营销活动。'
    }
  },
  pubSignal: { // 公众号授权
    crumbs: {
      authorizedPS: '已授权公众号',
      unauthorized: '您还没有关联您的微信账号，请关联您的微信账号以便我们能为您提供更多服务。'
    },
    title: {
      psInfo: '公众号基本信息',
      bind: '绑定微信公众号'
    },
    panel: {
      avatar: '头像',
      name: '名称',
      id: 'ID (微信号)',
      psType: '公众号类型',
      authType: '认证类型',
      wechatScan: '使用绑定的个人微信号扫描',
      adminAuthConfirm: '公众号管理员授权确认',
      authSucc: '授权成功，运营公众号！',
      btn: {
        subAuthMng: '分店授权管理',
        deAuth: '解除账户授权',
        dePrimeAuth: '解除总账户授权',
        freeAdd: '免费添加微信公众号'
      }
    },
    dialog: {
      m1: '请勾选需要授权的分店',
      all: '全选'
    },
    msg: {
      m1: '获取公众号信息失败',
      m2: '获取商户id失败',
      m3: '获取连锁店铺失败',
      m4: '解除成功',
      m5: '解除失败',
      m6: '请确认是否要解除账户授权?',
      m7: '请确认是否要解除总账户公众号?'
    }
  },
  billMng: { // 账单管理
    crumbs: {
      L1: '账单管理'
    },
    panel: {
      payTime: '打款时间',
      shopName: '店铺名称',
      range: '选择日期范围'
    },
    msg: {
      m1: '请不要跨月查询',
      m2: '请不要跨月选择!',
      m3: '请选择打款时间!'
    },
    btn: {
      downDetail: '下载打款明细',
      downRecord: '下载打款记录'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: '首页'
    },
    title: {
      t1: '会员及交易数据统计',
      t2: '活动运营数据统计'
    },
    panel: {
      t1: '今日会员新增',
      t2: '今日交易金额',
      tc: '今日回头客',
      cmnew: '本月会员新增',
      cumulativeMembership: '累计会员数',
      tta: '今日交易笔数',
      tincome: '今日实收',
      cmincome: '本月实收',
      noActivity: '暂无活动'
    }
  },
  login: {
    head: '商户管理后台',
    reg: '注册账号',
    ltsix: '6位以上',
    forgetPwd: '忘记密码?',
    msg: {
      m1: '请输入账号',
      m2: '请输入密码',
      m3: '登录失败'
    }
  }
}
