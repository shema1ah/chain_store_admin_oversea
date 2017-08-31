<template>
  <div class="sidebar">
    <div class="sidebar-logo__wrapper">
      <img src="./img/logo.png" alt="logo" class="sidebar-img"/>
      <h1 class="sidebar-logo__title">{{$t('nav.mmp')}}</h1>
    </div>
    <ul class="left-nav">
      <li v-for="nav in navs" :class="{'dark': $route.fullPath.indexOf('member') != -1 && nav.sub}">
        <router-link class="sidebar-nav__item" v-if="nav.pathname" :to="router('main/' + nav.pathname)">{{ nav.val }}</router-link>
        <a v-else class="sidebar-nav__item" @click="toggle">
          {{ nav.val }}
          <i v-if="nav.sub" class="icon-down_arrow" :class="{'icon-down_arrow__rotate': isRotate}"></i>
        </a>
        <transition name="collpase">
          <ul v-if="nav.sub" v-show="isShow" class="collpase">
            <li v-for="subnav in nav.sub">
              <router-link class="sidebar-nav__item sidebar-nav__subitem" :to="router('main/' + subnav.pathname)">
                {{ subnav.val }}
              </router-link>
            </li>
          </ul>
        </transition>
      </li>
      <li v-if="this.role.diancan"><a href="/wxofficial/setting" class="sidebar-nav__item">智慧餐厅</a></li>
    </ul>
    <div class="copyright_wrapper" v-if="role.haiwai">
      <el-select v-model="lang"  icon="caret-bottom" @change="switchLanguage" size="small" popperClass="popperBg">
        <el-option v-for="item in [{label: $t('lang.ja'), value:'ja'}, {label: $t('lang.en'), value:'en'}, {label: $t('lang.zh'), value:'zh-CN'}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
  import Store from '../../common/js/store';
  import config from 'src/config';
  export default {
    data() {
      return {
        lang: config.lang,
        role: Store.get('role') || {},
        navs: [],
        isShow: true,
        isRotate: false
      };
    },

    created() {
      this.getPath();
    },

    methods: {
      switchLanguage(value, label) {
        localStorage.setItem("lang", JSON.stringify({label: label, value: value}));
        this.role[value] = true;
        window.location.reload()
      },
      router(router) {
        return `/${router}`;
      },

      // 根据角色左侧菜单初始化
      getPath() {
        switch (this.role.type) {
          case 'chain':
            this.navs = [
              {
                val: this.$t('nav.index'),
                pathname: 'index'
              }, {
                val: '会员功能',
                sub: [{
                  val: '会员管理',
                  pathname: 'memberctl'
                }, {
                  val: '会员集点',
                  pathname: 'memberredpoint'
                }, {
                  val: '会员红包',
                  pathname: 'memberredpacket'
                }, {
                  val: '会员储值',
                  pathname: 'memberstorage'
                }]
              }, {
                val: this.$t('nav.tradeMng'),
                pathname: 'transctl'
              }, {
                val: this.$t('nav.billMng'),
                pathname: 'billctl'
              }, {
                val: this.$t('nav.publicAuth'),
                pathname: 'publicauth'
              }, {
                val: this.$t('nav.shopMng'),
                pathname: 'chainmanage'
              }, {
                val: '二维码',
                pathname: 'dcqrcode'
              }
            ];
            break;
          case 'single':
            this.navs = [
              {
                val: '首页概览',
                pathname: 'index'
              }, {
                val: '实时收款',
                pathname: 'todaytrade'
              }, {
                val: '会员功能',
                sub: [{
                  val: '会员管理',
                  pathname: 'memberctl'
                }, {
                  val: '会员集点',
                  pathname: 'memberredpoint'
                }, {
                  val: '会员红包',
                  pathname: 'memberredpacket'
                }, {
                  val: '会员储值',
                  pathname: 'memberstorage'
                }]
              }, {
                val: '交易管理',
                pathname: 'transctl'
              }, {
                val: '账单管理',
                pathname: 'billctl'
              }, {
                val: '公众号授权',
                pathname: 'publicauth'
              }, {
                val: '门店管理',
                pathname: 'singlemanage'
              }
            ];
            break;
          case 'baoshang':
            this.navs = [
              {
                val: '首页概览',
                pathname: 'index'
              }, {
                val: '会员功能',
                sub: [{
                  val: '会员管理',
                  pathname: 'memberctl'
                }, {
                  val: '会员集点',
                  pathname: 'memberredpoint'
                }, {
                  val: '会员红包',
                  pathname: 'memberredpacket'
                }, {
                  val: '会员储值',
                  pathname: 'memberstorage'
                }]
              }, {
                val: '交易管理',
                pathname: 'transctl'
              }, {
                val: '门店管理',
                pathname: 'chainmanage'
              }, {
                val: '二维码',
                pathname: 'dcqrcode'
              }
            ];
            break;
          case 'baoshang_single':
            this.navs = [
              {
                val: '首页概览',
                pathname: 'index'
              }, {
                val: '实时收款',
                pathname: 'todaytrade'
              }, {
                val: '会员功能',
                sub: [{
                  val: '会员管理',
                  pathname: 'memberctl'
                }, {
                  val: '会员集点',
                  pathname: 'memberredpoint'
                }, {
                  val: '会员红包',
                  pathname: 'memberredpacket'
                }, {
                  val: '会员储值',
                  pathname: 'memberstorage'
                }]
              }, {
                val: '交易管理',
                pathname: 'transctl'
              }, {
                val: '门店管理',
                pathname: 'singlemanage'
              }, {
                val: '二维码',
                pathname: 'dcqrcode'
              }
            ];
            break;
          case 'hongkong':
            this.navs = [
              {
                val: this.$t('nav.index'),
                pathname: 'index'
              }, {
                val: this.$t('nav.tradeMng'),
                pathname: 'transctl'
              }, {
                val: this.$t('nav.billMng'),
                pathname: 'billctl'
              }, {
                val: this.$t('nav.publicAuth'),
                pathname: 'publicauth'
              }, {
                val: this.$t('nav.shopMng'),
                pathname: 'chainmanage'
              }, {
                val: this.$t('nav.setup'),
                pathname: 'settings'
              }
            ];
            break;
          case 'hongkong_single':
            this.navs = [
              {
                val: this.$t('nav.index'),
                pathname: 'index'
              }, {
                val: this.$t('nav.tradeMng'),
                pathname: 'transctl'
              }, {
                val: this.$t('nav.billMng'),
                pathname: 'billctl'
              }, {
                val: this.$t('nav.publicAuth'),
                pathname: 'publicauth'
              }, {
                val: this.$t('nav.shopMng'),
                pathname: 'singlemanage'
              }
            ];
            break;
          case 'japan':
            this.navs = [
              {
                val: this.$t('nav.index'),
                pathname: 'index'
              }, {
                val: this.$t('nav.tradeMng'),
                pathname: 'transctl'
              }, {
                val: this.$t('nav.shopMng'),
                pathname: 'chainmanage'
              }, {
                val: this.$t('nav.setup'),
                pathname: 'settings'
              }
            ];
            break;
          default:
            this.navs = [
              {
                val: this.$t('nav.index'),
                pathname: 'index'
              }, {
                val: this.$t('nav.tradeMng'),
                pathname: 'transctl'
              }, {
                val: this.$t('nav.shopMng'),
                pathname: 'singlemanage'
              }
            ];
            break;
        }
      },

      toggle() {
        this.isRotate = !this.isRotate;
        this.isShow = !this.isShow;
      }
    }
  };
</script>
<style lang="scss">

  .sidebar {
    overflow-y: scroll;
    position: fixed;
    width: 220px;
    height: 100%;
    background-color: #2A2A2A;
    @at-root .sidebar-logo__wrapper {
      margin: 20px auto 28px;
      text-align: center;
    }
    @at-root .sidebar-img {
      margin-bottom: 13px;
    }
    @at-root .sidebar-logo__title {
      font-size: 20px;
      color: #fff;
    }
    .sidebar-nav__item {
      position: relative;
      display: block;
      line-height: 48px;
      padding-left: 27px;
      cursor: pointer;
      &.sidebar-nav__subitem {
        position: relative;
        padding-left: 45px;
        overflow: hidden;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          top: 0px;
          left: 27px;
          background-color: #373737;
        }
      }
      &.active {
        background-color: #000;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 7px;
          height: 100%;
          background-color: #FE9B20;
        }
      }
      .icon-down_arrow {
        position: absolute;
        font-size: 14px;
        right: 16px;
        top: 17px;
        transform-origin: center center;
        transition: .3s cubic-bezier(.33,.48,.74,.86);
      }
    }
    .left-nav {
      padding-bottom: 50px;
    }
  }
  .icon-down_arrow__rotate {
    transform: rotateZ(-90deg);
  }
  .dark {
    background-color: #000;
  }



  .copyright_wrapper {
    position: fixed;
    left: 6px;
    bottom: 10px;
    text-align: center;
    font-size: 14px;
    background-color: #585a60;
    @at-root .copyright-text {
      color: #fff;
    }
    @at-root .copyright-desc {
      text-align: center;
      color: #FE9B20;
    }
    .custom-stylee {
      background-color: #2a2a2a;
      color: #8a8c92;
    }
  }
  .collpase {
    overflow: hidden;
  }
  .collpase-enter-active {
    animation: expand-enter .3s cubic-bezier(.33,.48,.74,.86);
  }
  .collpase-leave-active {
    animation: expand-leave .3s cubic-bezier(.33,.48,.74,.86);
  }

  @keyframes expand-enter {
    0% {
      height: 0px;
    }

    100% {
      height: 144px;
    }
  }
  @keyframes expand-leave {
    0% {
      height: 144px;
    }

    100% {
      height: 0px;
    }
  }
  .popperBg {
    background-color: white;
  }
</style>
