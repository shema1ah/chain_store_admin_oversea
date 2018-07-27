/**
 * Created by leon on 17/7/18.
 */

'use strict';

exports.__esModule = true;
exports.default = {
  nav: {
    mmp: '商店管理コンソール',
    index: 'トップ',
    settlement: '勘定書管理',
    tradeMng: '取引管理',
    tradeAssign: '取引流水',
    refundCheck: ' 返金審査',
    shopMng: 'アカウント',
    cashMng: 'キャッシャー管理',
    setup: '設定',
    passSet: 'パスワード管理設置',
    emailSet: 'メール設定',
    contact: 'お問い合わせ',
  },
  common: {
    ok: '確定',
    cancel: 'キャンセル',
    close: '閉める',
    confirm: '確 認',
    tip: 'ヒント',
    all: '全部',
    none: 'ない',
    netError: 'ネットワークエラー',
    loading: '一生懸命ローディング中です',
    modSucc: '変更しました!',
    modFailed: '訂正できませんでした',
    logout: 'ログアウト',
    del: '削除',
    msg: {
      sel: '選択してください'
    }
  },
  shopmng: { // 门店管理模块
    crumbs: {
      L1: 'アカウント'
    },
    title: {
      baseInfo: '基本情報',
      subInfo: '支店情報'
    },
    panel: {
      shopName: '商店名',
      loginAccount: 'アカウント',
      btn: {
        editPwd: 'パスワードを変更します',
        editSub: '支店を編集します',
        editSubTag: '支店番号を編集します',
        down: '店舗の集金コード'
      },
      table: {
        subName: '支店名',
        loginAccount: 'アカウント',
        regTime: '登録時間',
        subTag: '支店番号',
        op: '操作',
        detail: '詳細確認',
        more: 'もっと',
        editPwd: 'パスワードを変更します',
        delSub: '支店を削除します'
      }
    },
    dialog: {
      editPwd: 'パスワードを変更します',
      loginAccount: 'アカウント',
      inputNewPwd: 'パスワード',
      confirmNewPwd: '確認',
      msg: {
        m1: '新しいパスワードを入力してください',
        m2: '新しいパスワードを確認してください',
        m3: '新しいパスワードはその確認入力と一致していません',
        m4: '6~20桁の数字かアルファベットを入力してください',
        m5: 'アカウントを入力してください',
        m6: '支店のアカウントを入力してください',
        m7: '支店のアカウントパスワードを入力してください',
        m8: '支店の受取人の名前を入力してください',
        m9: '支店の受取人の口座番号を入力してください',
        m10: '20以内の文字を入力してください',
        m11: '特殊文字ができません',
        m12: 'パスワードが正しくありません',
        m13: '支店をキャンセルしました'
      },
      cancel: 'キャンセル',
      ok: '確定',
      confirm: '確認',
      shopDetail: '店舗の詳細情報',
      shopName: '店舗名',
      address: '住所',
      mobile: '携帯番号',
      cardHolder: 'カードオーナ―',
      bankAccount: '口座番号',
      bankName: '銀行名',
      editSubTag: '支店番号を編集します',
      diaTip: '支店番号が設定済みになったらダウンロードされた取引明細と取引要約の中に表示されます',
      validateText: '20桁以内の文字かアルファベットを入力してください',
      validateText2: 'マスターアカウントのログインパスワードを入力してください',
      notice: 'ヒント',
      noticeTip: '支店を削除する前に当該支店の進行中の会員マーケティングイベントを中止させるようお薦めします'
    }
  },
  tradeMng: {
    crumbs: {
      L1: '取引管理',
      L2: '取引明細',
      L3: '払い戻す',
      L4: '取引流水'
    },
    panel: {
      time: '日付',
      range: '日付の範囲を選択してください',
      today: '今日',
      yestoday: '昨日',
      near7: '最近の７日間',
      near30: '最近の３０日間',
      near365: '最近年に1年近く',
      shopName: '店舗名',
      operator: 'キャッシャー',
      moreFilter: '選択します',
      noLimit: '全部',
      dd: '取消済みを表示', // 撤销明细
      sNum: 'シリアル番号', // 流水号
      tip: 'シリアル番号を入力してください',
      btn: {
        query: '検索',
        reset: 'リセット'
      }
    },
    table: {
      totalAmount: '取引総金額',
      totalNum: '取引総筆数',
      succAmount: '成功取引金額',
      succ: '成功取引き数',
      refundMount: '返金金額',
      refundNum: '返金筆数',
      bi: '',
      undo: '取消',
      shopName: '店舗名',
      operator: 'キャッシャー',
      all: '全部',
      colWay: '集金方式',
      wechatCollect: 'Wechatで集金します',
      alipay: '宝を支払います',
      tradeType: '取引種類',
      tradeTime: '取引時間',
      tradeAmount: '取引金額',
      tradeState: '取引状態',
      redpacket: ' 紅包（ホンバオ）割引', // 红包优惠
      sNum: 'シリアル番号',
      remark: '備考',
      op: '操作',
      cancel: '返金',
      more: 'もっと',
      detail: '詳細確認',
      download: 'レシート',
      ac: '', // 实收
      red: '商店の 紅包', // 商家红包
      plat: 'をプラートフォームから支給', // 平台补贴
      btn: {
        downDetail: '取引明細をダウンロードします',
        downTrade: '取引要約をダウンロードします'
      }
    },
    detail: {
      ammount1: '取引金額',
      ammount2: '払い戻す金額',
      origin: 'ユーザーの地域',
      time: '払い戻す時間',
      syssn1: '取引番号',
      syssn2: '元取引番号',
      syssn3: '払い戻す取引番号',
      store: '店舗',
      account: 'オペレータアカウント',
      history: '払い戻し履歴'
    },
    dialog: {
      d1: 'この動作が取り返しのつかない、払い戻すことができたい？',
      d2: '確認',
      d3: '成功',
      d4: '失敗',
      d5: 'パスワード',
      d6: '返金'
    },
    msg: {
      m1: 'シリアル番号は必ず数字です！',
      m2: '取引シリアル番号はせめて１４桁があります！',
      m3: '初回取引一覧表を取得に失敗しました',
      m4: '取引データ取得に失敗しました',
      m5: 'キャッシャー情報取得に失敗しました',
      m6: '取消に成功しました',
      m7: '取消に失敗しました',
      m8: 'シリアル番号を入力してください',
      m9: 'アカウントを入力してください',
      m10: 'パスワードが正しくありません',
      m11: 'この操作を実行する権限がありません',
      m12: '間違い金額',
      m13: '払い戻すことができません。お問い合わせしでください。',
      m14: '最高な払い戻す金額',
      m15: '返金金額を入力してください',
      m16: '有効な返金金額を入力してください'
    }
  },
  refundCheck: { // 退款审核
    crumbs: {
      L1: '取引管理',
      L2: ' 返金審査'
    },
    panel: {
      time: ' 申請時間',
      shopName: '店舗',
      operator: 'キャッシャー',
      oNUm: '元取引番号',
      tip: '元のオーダー流水番号を入力してください',
      btn: {
        query: '検索',
        reset: 'リセット'
      }
    },
    table: {
      applyAmount: ' アカウント申請',
      tradeType: '取引種類',
      tradeTime: '取引時間',
      refundMount: ' 返金金額',
      tradeAmount: '取引金額',
      sNum: 'シリアル番号',
      checkState: '審査状態',
      waiting: '審査待ち',
      approved: '許可済み',
      rejected: '拒絶済み',
      op: '操作',
      approve: '許可',
      reject: '拒絶'
    },
    dialog: {
      d1: 'この動作が取り返しのつかない、払い戻すことができたい？',
      d2: '確認許可',
      d3: '確認拒絶'
    },
    msg: {
      m1: 'パスワード管理',
      m2: 'パスワードを入力してください',
      m3: '操作成功'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: 'トップページ'
    },
    title: {
      t1: '取引のデータ統計',
      t2: 'イベント運営データ統計'
    },
    panel: {
      t1: '本日会員新規増加',
      t2: '本日の取引金額',
      tc: '本日の常連客',
      cmnew: '今月会員新規増加',
      cumulativeMembership: '累計会員数',
      tta: '本日の取引回数',
      tincome: '本日の実収金額',
      cmincome: '今月の実収金額',
      noActivity: 'イベントなし'
    }
  },
  settlement: { // 清算管理
    crumbs: {
      L1: '勘定書管理'
    },
    panel: {
      time: '日付',
      today: '今日',
      yestoday: '昨日',
      near7: '最近の７日間',
      near30: '最近の３０日間',
      type: 'タイプ',
      btn: {
        query: '検索',
        reset: 'リセット'
      }
    },
    table: {
      settleTime: '清算時間',
      settleType: '清算タイプ',
      name: 'アカウント',
      amount: ' 開設した口座名称',
      currency: '通貨',
      total: '取引総額',
      charge: '手数料',
      settleAmount: '清算金額',
      op: '操作',
      download: 'ダウンロードする'
    },
    msg: {
      m1: '情報が読み取れません'
    }
  },
  login: {
    head: '商店管理コンソール',
    reg: 'ログインアカウント',
    user: 'マーチャントのアカウント',
    cash: 'キャッシャーの番号',
    ltsix: '6ケタ以上',
    login: 'ログイン',
    forgetPwd: 'パスワードを忘れて',
    tab1: 'マーチャント',
    tab2: 'キャッシャー',
    msg: {
      m1: 'ログインアカウントを入力してください',
      m2: 'パスワードを入力してください',
      m3: 'ログイン失敗しました',
      m4: 'マーチャントのアカウントを入力してください',
      m5: 'キャッシャーの番号を入力してください'
    }
  },
  setting: { // 邮箱设置页
    crumbs: {
      L1: '設定',
      L2: 'メール設定'
    },
    panel: {
      mailSetup: 'メール設定',
      mail: 'メールアドレス',
      explain: '翌日の朝7時に前日の取引記録をお送りします',
      dailySend: '毎日取引レポートを受け取る',
      modi: 'アドレスを変更', // 訂正
      confirm: '確認'
    },
    msg: {
      m1: 'メールアドレスを入力してください',
      m2: '正しいメールアドレスを入力してください',
      m3: 'メールの設定が取得できませんでした!',
      m4: 'アドレスを変更しました',
      m5: 'このメールがあるます',
      m6: '最大10個までのメールを追加できます'
    },
    tip: {
      m1: '最後のメールを削除すると、メールレポート機能がオフになります。削除を確認しますか？'
    }
  },
  passSet: { // 管理密码设置
    crumbs: {
      L1: '設置',
      L2: ' パスワード管理設置'
    },
    panel: {
      passMsg: ' パスワード管理：',
      explain: ' 用途：設置した後に、翌日に返金審査を許可して、パスワード入力を通じて、確認検証完成する。',
      states1: '未設置',
      states2: '設置済み',
      bt1: '設置',
      bt2: 'リセット',
      bt3: '保存',
      title1: '設置パスワード管理',
      title2: 'リセット管理パスワード',
      safe: '安全検証',
      pass: '暗証番号管理',
      reEnter: '再度入力',
      originPass: 'パスワードの管理',
      newPass: '新パスワードを管理'
    },
    msg: {
      m1: '登録パスワードを入力してください',
      m2: 'パスワードを入力してください',
      m3: '管理パスワードを再度入力してください',
      m4: 'を入力してください6～20位数字や文字',
      m6: '元々の管理パスワード管理を入力ください',
      m7: '新しい管理パスワードをご入力ください',
      m8: '新しい管理パスワードを入力してください',
      m9: 'パスワード確認パスワード管理と管理の不一緻',
      m10: '設置成功'
    },
    tip: {
      m1: '* 元々のパスワードを忘れるか？ 顧客サービスに連絡してご処理下さい'
    }
  },
  cashMng: { // 收银员管理
    crumbs: {
      L1: 'キャッシャー管理',
      L2: '詳細確認',
      L3: 'キャッシャーを追加する'
    },
    common: {
      status: '状態',
      number: 'キャッシャーの番号',
      name: '名前',
      mobile: '電話',
      shop: '店舗名称',
      user: 'マーチャントのアカウント',
      password: 'パスワードを入力してください！',
      m1: 'アカウントを無効にしました',
      m2: 'アカウントを有効にしました',
      m5: 'キャッシャーの名前を入力してください',
      m6: 'キャッシャーの電話番号を入力してください',
      m7: 'キャッシャーのパスワードを入力してください！',
      m8: '2~20桁の名前を入力してください！',
      m9: '有効な携帯番号を入力してください！',
      m10: '6~15桁のパスワードを入力してください！',
      tip1: '* キャッシャーのログインする方法は、マーチャントのアカウントとキャッシャーの番号とキャッシャーのパスワードです。'
    },
    mng: {
      status1: '有効な',
      status2: '無効な',
      status3: 'アカウントを有効にする',
      status4: 'アカウントを無効にする',
      name: 'キャッシャーの名前',
      mobile: 'キャッシャーの電話番号',
      op: '操作',
      detail: '詳細確認',
      m5: 'キャッシャーのデータ取得に失敗しました'
    },
    detail: {
      title: 'キャッシャーの資料',
      btn: '情報変更'
    },
    add: {
      title: 'キャッシャーの資料を追加する',
      tip1: 'キャッシャーの資料を追加しました',
      tip2: 'キャッシャーの番号の取得に失敗しました',
      btn1: 'キャンセル',
      btn2: '確定'
    }
  },
  contact: { // 客服
    phone: '電話',
    email: 'メール'
  },
  overseaForget: {
    enterEmail: 'メールアドレスを入力してください.',
    emailAddr: 'メールアドレス',
    tryAnother: '他の方法をしてみる',
    next: '次 へ',
    confirm: '確 認',
    notExist: 'このメールアドレスがありません',
    sendCode: '検証コードを送ります。そのコードを入力してください。',
    resend: '再送信する',
    code: 'コード',
    newPwd: '新しいパスワード',
    enterCode: 'そのコードを入力してください。',
    char: '6~20桁のパスワードを入力してください！',
    rePwd: 'パスワードをリーセトする',
    invalidEmail: '無効なメールアドレス',
    text1: '',
    text2: 'へ検証コードを送ります。そのコードを入力してください',
    secend1: "( ",
    secend2: '秒 )後再送',
    codeResent: '検証コードを送りました',
    wrongCode: '検証コードが正しくありません',
    filledCode: '検証コードは必ず入力してください',
    frequently: '検証コードが頻繁になりますので、もうちょっと待ってください。'
  },
  firstlogin: {
    congratulation: 'おめでとうございます！ハオジンレジに初めて登録しました。',
    changePwd: 'パスワードを変更してください',
    newPwd: '新しいパスワード',
    rePwd: 'パスワードを確認する',
    confirm: '確  定'
  }
}
