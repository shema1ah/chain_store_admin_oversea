'use strict';

exports.__esModule = true;
exports.default = {
  lang: {
    tw: '繁體中文',
    zh: '簡體中文',
    en: '英文',
    ja: '日文'
  },
  nav: {
    mmp: '商戶管理後台',
    index: '首頁概覽',
    tradeMng: '交易管理',
    billMng: '清算管理',
    publicAuth: '公眾號授權',
    shopMng: '店舖管理',
    setup: '設置'
  },
  common: {
    ok: '確 定',
    cancel: '取 消',
    tip: '提示',
    all: '全部',
    netError: '網絡錯誤',
    loading: '拼命加載中',
    modSucc: '修改成功',
    modFailed: '修改失敗',
    logout: '退出',
    msg: {
      sel: '請選擇'
    }
  },
  shopmng: { // 门店管理模块
    crumbs: {
      L1: '店舖管理'
    },
    title: {
      baseInfo: '基本信息',
      subInfo: '分店信息'
    },
    panel: {
      shopName: '商戶名稱',
      loginAccount: '登錄賬號',
      btn: {
        editPwd: '修改密碼',
        editSub: '編輯分店',
        editSubTag: '編輯分店編號',
        down: '下載店鋪收款碼',
        downTip: '點擊下載店鋪收款二維碼'
      },
      table: {
        subName: '分店名稱',
        loginAccount: '登錄賬號',
        regTime: '註冊時間',
        subTag: '分店編號',
        op: '操作',
        detail: '查看詳情',
        more: '更多',
        editPwd: '修改密碼',
        delSub: '刪除分店'
      }
    },
    dialog: {
      editPwd: '修改密碼',
      loginAccount: '登錄賬號',
      inputNewPwd: '輸入新密碼',
      confirmNewPwd: '確認新密碼',
      msg: {
        m1: '請輸入新密碼',
        m2: '請輸入確認新密碼',
        m3: '新密碼與確認密碼不一致',
        m4: '請輸入6~20位數字或字母',
        m5: '請輸入總賬戶密碼',
        m6: '請輸入分店賬號',
        m7: '請輸入分店登錄密碼',
        m8: '請輸入分店收款人姓名!',
        m9: '請輸入分店收款銀行卡號!',
        m10: '請輸入二十以內的文字或字母',
        m11: '不能含有特殊字符',
        m12: '密碼不正確',
        m13: '删除分店成功!'
      },
      cancel: '取消',
      ok: '確定',
      confirm: '確認',
      shopDetail: '門店詳情',
      shopName: '店鋪名稱',
      address: '地址',
      mobile: '手機號碼',
      cardHolder: '持卡人',
      bankAccount: '銀行賬戶',
      bankName: '銀行名稱',
      editSubTag: '编辑分店编号',
      diaTip: '分店編號設置成功後將會顯示在下載的交易明細和交易匯總中',
      validateText: '請輸入二十以內的文字或字母',
      validateText2: '請輸入總賬戶登錄密碼',
      notice: '提示',
      noticeTip: '刪除分店前建議先終止該分店正在進行的會員營銷活動。'
    }
  },
  pubSignal: { // 公众号授权
    crumbs: {
      authorizedPS: '已授權公眾號',
      unauthorized: '您還沒有關聯您的微信賬號，請關聯您的微信賬號以便我們能為您提供更多服務。'
    },
    title: {
      psInfo: '公眾號基本信息',
      bind: '綁定微信公眾號'
    },
    panel: {
      avatar: '頭像',
      name: '名稱',
      id: 'ID (微信號)',
      psType: '公眾號類型',
      authType: '認證類型',
      wechatScan: '使用綁定的個人微信號掃描',
      adminAuthConfirm: '公眾號管理員授權確認',
      authSucc: '授權成功，運營公眾號！',
      btn: {
        subAuthMng: '分店授權管理',
        deAuth: '解除賬戶授權',
        dePrimeAuth: '解除總賬戶授權',
        freeAdd: '免費添加微信公眾號',
        releaseAuth: '解除授權'
      }
    },
    dialog: {
      m1: '請勾選需要授權的分店',
      all: '全選'
    },
    msg: {
      m1: '獲取公眾號信息失敗',
      m2: '獲取商戶ID失敗',
      m3: '獲取連鎖店鋪失敗',
      m4: '解除成功',
      m5: '解除失敗',
      m6: '請確認是否要解除賬戶授權?',
      m7: '請確認是否要解除總賬戶公眾號?'
    }
  },
  billMng: { // 账单管理
    crumbs: {
      L1: '清算管理'
    },
    panel: {
      payTime: '清算時間',
      shopName: '店鋪名稱',
      range: '選擇日期範圍'
    },
    msg: {
      m1: '請不要跨月查詢',
      m2: '請不要跨月選擇!',
      m3: '請選擇清算時間!'
    },
    btn: {
      downDetail: '下載清算詳情',
      downRecord: '下載清算記錄'
    }
  },
  tradeMng: { // 交易管理
    crumbs: {
      L1: '交易管理'
    },
    panel: {
      time: '時間',
      today: '今天 ',
      yestoday: '昨天',
      near7: '近7天',
      near30: '近30天',
      shopName: '店鋪名稱',
      operator: '收銀員',
      moreFilter: '更多篩選',
      noLimit: '不限',
      dd: '撤銷詳情', // 撤销明细
      sNum: '商戶單號', // 流水号
      tip: '請輸入序列號',
      btn: {
        query: '查詢',
        reset: '重置'
      }
    },
    table: {
      total: '交易總金額',
      realrec: '交易實收',
      succ: '成功交易次數',
      undoNum: '撤銷次數',
      bi: '次',
      undo: '撤銷詳情',
      shopName: '店鋪名稱/ID',
      operator: '收銀員',
      all: '全部',
      colWay: '收款方式',
      wechatCollect: '微信收款',
      tradeType: '交易類型',
      tradeTime: '交易時間',
      tradeAmount: '交易金額',
      tradeState: '交易狀態',
      redpacket: '紅包優惠',
      sNum: '序列號',
      op: '操作',
      cancel: '撤銷',
      ac: '實收', // 实收
      red: '商家紅包', // 商家红包
      plat: '平台補貼', // 平台补贴
      btn: {
        downDetail: '下載交易明細',
        downTrade: '下載交易匯總'
      }
    },
    dialog: {
      d1: '若要撤銷交易，請輸入賬戶登錄密碼以確認操作'
    },
    msg: {
      m1: '商戶單號必須為數字',
      m2: '商戶單號需要最少14位!！',
      m3: '首次獲取交易列表失敗',
      m4: '獲取交易數據失敗',
      m5: '獲取收銀員信息失敗',
      m6: '撤銷成功',
      m7: '撤銷失敗',
      m8: '請輸入序列號',
      m9: '請輸入賬戶密碼',
      m10: '密碼不正確'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: '首頁概覽'
    },
    title: {
      t1: '會員及交易數據統計',
      t2: '活動運營數據統計'
    },
    panel: {
      t1: '今日會員新增',
      t2: '今日交易金額',
      tc: '今日回頭客',
      cmnew: '本月會員新增',
      cumulativeMembership: '累計會員數',
      tta: '今日交易筆數',
      tincome: '今日實收',
      cmincome: '本月實收',
      noActivity: '暫無活動'
    }
  },
  login: { // 登录页
    head: '商戶管理後台',
    reg: '註冊賬號',
    ltsix: '6位以上',
    login: '登錄',
    forgetPwd: '忘記密碼?',
    msg: {
      m1: '請輸入賬號',
      m2: '請輸入密碼',
      m3: '登錄失敗'
    }
  },
  setting: { // 邮箱设置页
    crumbs: {
      L1: '設置'
    },
    panel: {
      mailSetup: '電子郵件設置',
      mail: '電子郵件',
      explain: '我們會在次日上午7點，把前一天的交易記錄發送給您。',
      dailySend: '每日發送交易報表',
      modi: '修改',
      confirm: '確認'
    },
    msg: {
      m1: '請輸入郵箱地址',
      m2: '請輸入正確的電郵地址',
      m3: '獲取電郵設置失敗!'
    }
  }
}
