import Vue from 'vue';
import Router from 'vue-router';

import billctl from 'components/billctl/billctl';
import index from 'components/index/index';
// import member from 'components/member/member';
import retailctl from 'components/retailctl/retailctl';
import transctl from 'components/transctl/transctl';
import memberctl from 'components/memberctl/memberctl';
import membercollpoint from 'components/membercollpoint/membercollpoint';
import memberredpacket from 'components/memberredpacket/memberredpacket';
import memberstorage from 'components/memberstorage/memberstorage';
import createpacket from 'components/createpacket/createpacket';
import reviewpacket from 'components/reviewpacket/reviewpacket';
import member from 'components/member/member';
import packetnotify from 'components/packetnotify/packetnotify';
import packetshare from 'components/packetshare/packetshare';
import packetspend from 'components/packetspend/packetspend';
import createstorage from 'components/createstorage/createstorage';
import reviewstorage from 'components/reviewstorage/reviewstorage';
import alterstorage from 'components/alterstorage/alterstorage';
import membersto from 'components/membersto/membersto';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/memberctl',
      component: memberctl
    },
    {
      path: '/membercollpoint',
      component: membercollpoint
    },
    {
      path: '/memberstorage',
      component: membersto,
      children: [
        {
          path: '',
          component: memberstorage
        },
        {
          path: 'createstorage',
          name: 'createstorage',
          component: createstorage,
          meta: { keepAlive: true }
        },
        {
          path: 'reviewstorage',
          name: 'reviewstorage',
          component: reviewstorage,
          meta: { keepAlive: true }
        },
        {
          path: 'alterstorage',
          name: 'alterstorage',
          component: alterstorage,
          meta: { keepAlive: false }
        }
      ]
    },
    {
      path: '/memberredpacket',
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
      path: '/transctl',
      component: transctl
    },
    {
      path: '/retailctl',
      component: retailctl
    },
    {
      path: '/billctl',
      component: billctl
    },
    {
      path: '/createpacket',
      component: createpacket
    },
    {
      path: '/retailctl',
      component: retailctl
    }
  ],
  linkActiveClass: 'active'
});
