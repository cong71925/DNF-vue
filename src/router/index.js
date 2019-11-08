import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Account from '@/components/Account/Account.vue'
import InfoView from '@/components/Account/InfoView.vue'
import InfoModify from '@/components/Account/InfoModify.vue'
import PasswordModify from '@/components/Account/PasswordModify.vue'
import Character from '@/components/Character/Character.vue'
import Group from '@/components/Group/Group.vue'
import GroupView from '@/components/Group/GroupView/GroupView.vue'
import GroupSetting from '@/components/Group/GroupView/GroupSetting.vue'
import GroupInfo from '@/components/Group/GroupView/GroupInfo.vue'
import GroupMember from '@/components/Group/GroupView/GroupMember.vue'
import GroupCharacter from '@/components/Group/GroupView/GroupCharacter.vue'
import Log from '@/components/Log.vue'

Vue.use(Router)
const router = new Router({
  base: '/dnf/',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      children: [{
        path: 'info',
        name: 'InfoView',
        component: InfoView
      },
      {
        path: 'infomodify',
        name: 'InfoModify',
        component: InfoModify
      },
      {
        path: 'passwordmodify',
        name: 'PasswordModify',
        component: PasswordModify
      }
      ]
    },
    {
      path: '/character',
      name: 'Character',
      component: Character
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/groupview/:id',
      component: GroupView,
      children: [{
        path: '/',
        name: 'GroupInfo',
        component: GroupInfo
      },
      {
        path: 'setting',
        name: 'GroupSetting',
        component: GroupSetting
      },
      {
        path: 'member',
        name: 'GroupMember',
        component: GroupMember
      },
      {
        path: 'character',
        name: 'GroupCharacter',
        component: GroupCharacter
      }
      ]
    }
  ]
})

export default router
