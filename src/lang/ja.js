/**
 * Created by leon on 17/7/18.
 */

'use strict';

exports.__esModule = true;
exports.default = {
  common: {
    ok: '確定',
    cancel: 'キャンセル',
    tip: 'ヒント',
    all: '全部',
    netError: 'ネットワークエラー',
    loading: '',
    modSucc: '',
    modFailed: ''
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
      loginAccount: 'ログインアカウント',
      btn: {
        editPwd: 'パスワードを変更します',
        editSub: '支店を編集します',
        editSubTag: '支店番号を編集します',
        down: '店舗の集金コードをダウンロードします'
      },
      table: {
        subName: '支店名',
        loginAccount: 'ログインアカウント',
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
      loginAccount: 'ログインアカウント',
      inputNewPwd: '新しいパスワードを入力してください',
      confirmNewPwd: '新しいパスワードを確認してください',
      msg: {
        m1: '新しいパスワードを入力してください',
        m2: '新しいパスワードを確認してください',
        m3: '新しいパスワードはその確認入力と一致していません',
        m4: '6~20桁の数字かアルファベットを入力してください'
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
      diaTip: '支店番号が設定済みになったらダウンロードされた取引明細と取引纏めの中に表示されます',
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
        freeAdd: '無料でWechat公式アカウントを追加します'
      }
    },
    dialog: {
      m1: '',
      all: ''
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
      range: ''
    },
    msg: {
      m1: '勘定書の検索は当月限定にしてください',
      m2: '別の月で選択しないでください！',
      m3: '送金の時間を選択してください'
    },
    btn: {
      downDetail: '送金明細をダウンロードします',
      downRecord: '送金記録をダウンロードします'
    }
  },
  tradeMng: { // 交易管理

  },
  home: { // 首页概览
    crumbs: {
      L1: 'トップページ'
    },
    title: {
      t1: '会員及び取引のデータ統計',
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
    reg: '新規登録',
    ltsix: '6ケタ以上',
    login: 'ログイン',
    msg: {
      m1: 'アカウントを入力してください',
      m2: 'パスワードを入力してください',
      m3: 'ログイン失敗しました'
    }
  }
}
