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
    device: '設備を連動する',
    surcharge: '追加料金設定',
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
    next: '次のステップ',
    previous: '前のステップ',
    edit: '編集',
    submit: '確定',
    msg: {
      sel: '選択してください'
    }
  },
  main: {
    bigMerchant: 'ビジネス',
    merchant: 'シングルストア',
    subMerchant: 'ブランチ',
    cashier: 'キャッシャー'
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
        down: '店舗の集金コード',
        listDown: '下載支店入金コード'
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
      noticeTip: '支店を削除する前に当該支店の進行中の会員マーケティングイベントを中止させるようお薦めします',
      downTip: '領収書コードをダウンロードする店舗名を選択します：',
      nullTip: '少なくとも1つのブランチを選択してください',
      all: 'すべて選択'
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
      main: '店舗アカウント',
      colWay: '集金方式',
      wechatCollect: 'Wechatで集金します',
      alipay: '宝を支払います',
      tradeType: '取引種類',
      tradeTime: '取引時間',
      tradeAmount: '取引金額',
      originAmount: '売掛金',
      tradeState: '取引状態',
      redpacket: ' 紅包（ホンバオ）割引', // 红包优惠
      sNum: 'シリアル番号',
      chnlsn: '外部注文番号',
      src: 'ユーザーソース',
      cardCd: '銀行カード番号',
      remark: '備考',
      op: '操作',
      cancel: '返金',
      more: 'もっと',
      detail: '詳細確認',
      download: 'レシート',
      ac: '', // 实收
      red: '商店の 紅包', // 商家红包
      plat: 'をプラートフォームから支給', // 平台补贴
      surAmount: '追加料金',
      surRate: '追加料金',
      btn: {
        downDetail: '取引明細をダウンロードします',
        downTrade: '取引要約をダウンロードします'
      }
    },
    detail: {
      amount1: '取引金額',
      amount2: '払い戻す金額',
      origin: 'ユーザーの地域',
      time: '払い戻す時間',
      syssn1: '取引番号',
      syssn2: '元取引番号',
      syssn3: '払い戻す取引番号',
      store: '店舗',
      account: '営業アカウント',
      history: '払い戻し履歴',
      amount3: '支払金額',
      count1: '支払通貨',
      count2: '注文通貨',
      syssn4: 'ブロックチェーン注文番号'
    },
    dialog: {
      d1: 'この動作が取り返しのつかない、払い戻すことができたい？',
      d2: '確認',
      d3: '成功',
      d4: '失敗',
      d5: 'パスワード',
      d6: '返金',
      d7: '払い戻し'
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
      d1: '操作を撤回できないと確認されれば、確認承認？',
      d2: '操作を撤回できないと確認されれば、確認拒絶？',
      d3: '確認批准',
      d4: '確認拒絕'
    },
    msg: {
      m1: 'パスワード管理',
      m2: 'パスワードを入力してください',
      m3: '操作成功',
      m4: '払い戻し操作は成功し、支払いチャネルが処理されるのを待っていました。'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: 'トップページ'
    },
    title: {
      t1: '取引のデータ統計',
      t2: 'トレーディングチャート'
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
    },
    chart: {
      bill: '件数',
      noTrans: '取引はありません',
      account: '実収',
      time: '日付',
      sum: '金額',
      tp1: '30日間のクエリのみサポート'
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
        reset: 'リセット',
        downAll: 'すべてをダウンロードする'
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
      m1: '情報が読み取れません',
      m2: '現在は30日間のデータのみをサポートしています。',
      m3: 'データをダウンロードすることができます'
    },
    tip: {
      m1: '合計料金は、各注文に料金を掛けてから切り上げて計算されます。'
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
      m5: 'キャッシャーの番号を入力してください',
      m6: 'このアカウントは見つかりませんでした'
    }
  },
  setting: { // 邮箱设置页
    crumbs: {
      L1: '設定',
      L2: 'メール設定',
      L3: '設備を連動する',
      L4: 'プレミアムレートを追加',
      L5: 'プレミアムレートを編集',
    },
    panel: {
      mailSetup: 'メール設定',
      mail: 'メールアドレス',
      explain: '翌日の朝7時に前日の取引記録をお送りします',
      dailySend: '毎日取引レポートを受け取る',
      modi: 'アドレスを変更', // 訂正
      confirm: '確認',
      amount: '店のアカウント',
      device: '設備番号',
      merchant: '支店アカウント',
    },
    btn: {
      query: '検索',
      reset: 'リセット'
    },
    table: {
      merchant: '会社名',
      shopName: '店舗名',
      time: 'バインディング時間',
      close: 'アンバインド',
      createTime: '作成時間',
      subName: '支店名',
      rate: '追加料金',
    },
    dialog: {
      d1: 'デバイスを追加',
      d2: '解縛り設備',
      d3: '操作の確認',
    },
    msg: {
      m1: 'メールアドレスを入力してください',
      m2: '正しいメールアドレスを入力してください',
      m3: 'メールの設定が取得できませんでした!',
      m4: 'アドレスを変更しました',
      m5: 'このメールがあるます',
      m6: '最大10個までのメールを追加できます',
      m7: 'アンバインドを確認しますか？',
      m8: 'アンバインドが正常に完了しました',
      m9: '店舗のアカウントを入力して',
      m10: 'ご入力装置番号',
      m11: '成功を加える',
      m12: '支店番号を入力してください',
      m13: '削除に成功しました',
      m14: '0から100までの整数を入力してください',
    },
    tip: {
      m1: '最後のメールを削除すると、メールレポート機能がオフになります。削除を確認しますか？',
      m2: '支払方法追加料金を設定する',
      m3: '店舗追加料金が設定され、リストページで変更できます',
      m4: 'プレミアムレートを設定する店舗を選択してください',
      nullTip: '少なくとも一つの店を選んでください',
      all: 'すべて選択'
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
      m9: '管理パスワードとの入力が一致しない',
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
      L3: 'キャッシャーを追加する',
      L4: 'バッチで追加'
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
    dialog: {
      title: 'キャッシャーをまとめて追加する',
      d1: 'キャッシャーのフォームファイルを選択してください',
      d2: '選択',
      d3: 'アップ',
      d4: '下載型枠',
      d5: 'アップロードの成功'
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
  },
  preAuth: {// 预授权管理
    message: {
      m1: 'order no.',
      m2: 'Please enter your order no.',
      m3: 'Capture amount',
      m4: 'No. of Captures',
      m5: 'Pre-authorization management',
      m6: 'order details',
      m7: 'capture',
      m8: 'Release',
      m9: 'capture details',
      m10: 'Confirm to capture?',
      m11: 'Hold amount',
      m12: 'Hold items',
      m13: 'Creation Time',
      m14: 'Order Type',
      m15: 'Service order number',
      m16: 'Order Amount',
      m17: 'Order Status',
      m18: 'Transaction ID',
      m19: 'capture amount',
      m20: 'Maximum capture amount',
      m21: 'Please enter the capture amount',
      m22: 'Exceeded the capture limit',
      m23: 'Capture successfully',
      m24: 'completed',
      m25: 'Released',
      m26: 'completed',
      m27: 'Failed to capture',
      m28: 'Confirm to release',
      m29: 'Successfully released',
      m30: 'Release failed',
      m31: 'Download The Order Details',
      m32: 'Alipay pre-auth'
    }
  }
}
