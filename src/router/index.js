import Vue from 'vue'
import Router from 'vue-router'

import login from 'components/login/login'
import register from 'components/register/register'
import main from 'components/main/main'
import billctl from 'components/billctl/billctl'
import index from 'components/index/index'
import todaytrade from 'components/todaytrade/todaytrade'
import chainmanage from 'components/chainmanage/chainmanage'
import singlemanage from 'components/singlemanage/singlemanage'
import transctl from 'components/transctl/transctl'
import member from 'components/member/member'
import publicauth from 'components/publicauth/publicauth'
import failed from 'components/publicauth/failed'
import settings from 'components/settings/settings'
import cashiermanage from 'components/cashiermanage/cashiermanage'
import addcashier from 'components/addcashier/addcashier'
import cashierdetail from 'components/cashierdetail/cashierdetail'
import merchandise from 'components/merchandise/merchandise'
import overseaForget from 'components/overseaforget/overseaforget'
import firstLogin from 'components/firstlogin/firstlogin'
import contact from 'components/contact/contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/firstLogin',
      component: firstLogin
    },
    {
      path: '/register',
      component: register,
      name: 'register'
    },
    {
      path: '/forget',
      component: register,
      name: 'forget'
    },
    {
      path: '/overseaForget',
      component: overseaForget,
      name: 'overseaForget'
    },
    {
      path: '/main',
      component: main,
      redirect: '/main/index',
      children: [
        {
          path: 'index',
          component: index
        },
        {
          path: 'todaytrade',
          component: todaytrade
        },
        {
          path: 'transctl',
          component: transctl
        },
        {
          path: 'billctl',
          component: billctl
        },
        {
          path: 'chainmanage',
          component: chainmanage,
        },
        {
          path: 'singlemanage',
          component: singlemanage
        },
        {
          path: 'publicauth',
          component: publicauth
        },
        {
          path: 'authfailed',
          component: failed
        },
        {
          path: 'settings',
          component: settings
        },
        {
          path: 'cashiermanage',
          component: member,
          children: [
            {
              path: '',
              component: cashiermanage
            },
            {
              path: 'addcashier',
              name: 'addcashier',
              component: addcashier
            },
            {
              path: 'cashierdetail',
              name: 'cashierdetail',
              component: cashierdetail
            }
          ]
        },
        {
          path: 'merchandise',
          name: 'merchandise',
          component: merchandise
        },
        {
          path: 'contact',
          name: 'contact',
          component: contact
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
