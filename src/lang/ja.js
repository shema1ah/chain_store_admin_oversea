/**
 * Created by leon on 17/7/18.
 */

'use strict';

exports.__esModule = true;
exports.default = {
  nav: {
    mmp: '商店管理コンソール',
    index: 'トップ',
    tradeMng: '取引管理',
    billMng: '勘定書管理',
    publicAuth: '公式アカウント',
    shopMng: '店舗管理',
    setup: '設定'
  },
  common: {
    ok: '確定',
    cancel: 'キャンセル',
    tip: 'ヒント',
    all: '全部',
    netError: 'ネットワークエラー',
    loading: '一生懸命ローディング中です',
    modSucc: '変更しました!',
    modFailed: '訂正できませんでした',
    logout: 'ログアウト',
    msg: {
      sel: '選択してください'
    }
  },
  shopmng: { // 门店管理模块
    crumbs: {
      L1: '店舗管理'
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
        downTip: 'ボタンを押してダウンロードします'
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
  pubSignal: { // 公众号授权
    crumbs: {
      authorizedPS: '授権済みの公式アカウント',
      unauthorized: '未だWechatアカウントに関連していません。こちらより更によいサービスを提供させていただくため、先にWechatアカウントを関連してください。'
    },
    title: {
      psInfo: '公式アカウントの基本情報',
      bind: 'Wechat公式アカウントにバンディングします'
    },
    panel: {
      avatar: '顔写真',
      name: '名前',
      id: 'ID(Wechatアカウント)',
      psType: '公式アカウントの種類',
      authType: '認証種類',
      wechatScan: 'バンディングされた個人のWechatアカウントでスキャンします',
      adminAuthConfirm: '公式アカウント管理者から授権して確認します',
      authSucc: '授権に成功しました、公式アカウントを運営しましょう！',
      btn: {
        subAuthMng: '支店への授権管理',
        deAuth: 'アカウントの授権を解除します',
        dePrimeAuth: 'マスターアカウントの授権を解除します',
        freeAdd: '無料でWechat公式アカウントを追加します',
        releaseAuth: '授権を解除します'
      }
    },
    dialog: {
      m1: '授権する支店の前にチェックを入れてください。',
      all: '全て選択'
    },
    msg: {
      m1: '公式アカウント情報を取得に失敗しました',
      m2: '商店IDを取得に失敗しました',
      m3: 'チェーン店を取得に失敗しました',
      m4: '解除に成功しました',
      m5: '解除に失敗しました',
      m6: '本当にアカウントへの授権を解除しますか？',
      m7: '本当にマスター公式アカウントへの授権を解除しますか？'
    }
  },
  billMng: { // 账单管理
    crumbs: {
      L1: '勘定書管理'
    },
    panel: {
      payTime: '送金時間',
      shopName: '店舗名',
      range: '日付の範囲を選択してください'
    },
    msg: {
      m1: '勘定書の検索は当月限定にしてください',
      m2: '別の月で選択しないでください！',
      m3: '送金の時間を選択してください'
    },
    btn: {
      downDetail: '送金明細',
      downRecord: '送金記録'
    }
  },
  tradeMng: {
    crumbs: {
      L1: '取引管理'
    },
    panel: {
      time: '日付',
      today: '今日',
      yestoday: '昨日',
      near7: '最近の７日間',
      near30: '最近の３０日間',
      shopName: '店舗名',
      operator: 'キャッシャー',
      moreFilter: '選択します',
      noLimit: '全部',
      dd: '取り消し可能な取引だけを表示する', // 撤销明细
      sNum: 'シリアル番号', // 流水号
      tip: 'シリアル番号を入力してください',
      btn: {
        query: '検索',
        reset: 'リセット'
      }
    },
    table: {
      total: '取引総額',
      realrec: '実際の集金額',
      succ: '取引き数',
      undoNum: '取消し数',
      bi: '',
      undo: '取消',
      shopName: '店舗名',
      operator: 'キャッシャー',
      all: '全部',
      colWay: '集金方式',
      wechatCollect: 'Wechatで集金します',
      tradeType: '取引種類',
      tradeTime: '取引時間',
      tradeAmount: '取引金額',
      tradeState: '取引状態',
      redpacket: ' 紅包（ホンバオ）割引', // 红包优惠
      sNum: 'シリアル番号',
      op: '操作',
      cancel: '取消',
      ac: '', // 实收
      red: '商店の 紅包', // 商家红包
      plat: 'をプラートフォームから支給', // 平台补贴
      btn: {
        downDetail: '取引明細をダウンロードします',
        downTrade: '取引要約をダウンロードします'
      }
    },
    dialog: {
      d1: '取引を取消したい場合、アカウントのログインパスワードを入力し、確認してから操作してください'
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
      m10: 'パスワードが正しくありません'
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
  login: {
    head: '商店管理コンソール',
    reg: 'ログインアカウント',
    ltsix: '6ケタ以上',
    login: 'ログイン',
    forgetPwd: 'パスワードを忘れて',
    msg: {
      m1: 'ログインアカウントを入力してください',
      m2: 'パスワードを入力してください',
      m3: 'ログイン失敗しました'
    }
  },
  setting: { // 邮箱设置页
    crumbs: {
      L1: '設定'
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
      m4: 'アドレスを変更しました'
    }
  }
}
