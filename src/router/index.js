import Vue from 'vue'
import Router from 'vue-router'

import login from 'components/login/login'
import register from 'components/register/register'
import main from 'components/main/main'
import billctl from 'components/billctl/billctl'
import index from 'components/index/index'
import todaytrade from 'components/todaytrade/todaytrade'
import chainmanage from 'components/chainmanage/chainmanage'
import createsubshop from 'components/chainmanage/createSubShop'
import routerhub from 'components/chainmanage/routerHub'
import singlemanage from 'components/singlemanage/singlemanage'
import transctl from 'components/transctl/transctl'
import memberctl from 'components/memberctl/memberctl'
import memberredpoint from 'components/memberredpoint/memberredpoint'
import memberpoint from 'components/memberpoint/memberpoint'
import createpoint from 'components/createpoint/createpoint'
import editpoint from 'components/editpoint/editpoint'
import reviewpoint from 'components/reviewpoint/reviewpoint'
import memberredpacket from 'components/memberredpacket/memberredpacket'
import memberstorage from 'components/memberstorage/memberstorage'
import createpacket from 'components/createpacket/createpacket'
import reviewpacket from 'components/reviewpacket/reviewpacket'
import member from 'components/member/member'
import packetnotify from 'components/packetnotify/packetnotify'
import packetshare from 'components/packetshare/packetshare'
import packetspend from 'components/packetspend/packetspend'
import createstorage from 'components/createstorage/createstorage'
import reviewstorage from 'components/reviewstorage/reviewstorage'
import alterstorage from 'components/alterstorage/alterstorage'
import membersto from 'components/membersto/membersto'

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
      path: '/main',
      component: main,
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
          path: 'memberctl',
          component: memberctl
        },
        {
          path: 'memberredpoint',
          component: memberpoint,
          children: [
            {
              path: '',
              component: memberredpoint
            },
            {
              path: 'createpoint',
              name: 'createpoint',
              component: createpoint
            },
            {
              path: 'editpoint',
              name: 'editpoint',
              component: editpoint
            },
            {
              path: 'reviewpoint',
              name: 'reviewpoint',
              component: reviewpoint
            }
          ]
        },
        {
          path: 'memberstorage',
          component: membersto,
          children: [
            {
              path: '',
              component: memberstorage
            },
            {
              path: 'createstorage',
              name: 'createstorage',
              component: createstorage
            },
            {
              path: 'reviewstorage',
              name: 'reviewstorage',
              component: reviewstorage
            },
            {
              path: 'alterstorage',
              name: 'alterstorage',
              component: alterstorage
            }
          ]
        },
        {
          path: 'memberredpacket',
          component: member,
          children: [
            {
              path: '',
              component: memberredpacket
            },
            {
              path: 'createpacket',
              component: createpacket,
              children: [
                {
                  path: '/',
                  redirect: 'type_common'
                },
                {
                  path: 'type_common',
                  name: 'type_common',
                  component: packetnotify
                },
                {
                  path: 'type_share',
                  name: 'type_share',
                  component: packetshare
                },
                {
                  path: 'type_payment',
                  name: 'type_payment',
                  component: packetspend
                }
              ]
            },
            {
              path: 'reviewpacket',
              name: 'reviewpacket',
              component: reviewpacket
            }
          ]
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
          path: 'createpacket',
          component: createpacket
        },
        {
          path: 'chainmanage',
          component: routerhub,
          children: [
            {
              path: '',
              component: chainmanage
            },
            {
              path: 'createsubshop',
              component: createsubshop
            }
          ]
        },
        {
          path: 'singlemanage',
          component: singlemanage
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
