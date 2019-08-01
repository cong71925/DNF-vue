import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Account from '@/components/Account/Account.vue'
import Character from '@/components/Character/Character.vue'
import Group from '@/components/Group/Group.vue'
import GroupView from '@/components/Group/GroupView/GroupView.vue'
import GroupSetting from '@/components/Group/GroupView/GroupSetting.vue'
import GroupInfo from '@/components/Group/GroupView/GroupInfo.vue'
import GroupMember from '@/components/Group/GroupView/GroupMember.vue'
import GroupCharacter from '@/components/Group/GroupView/GroupCharacter.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
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
      path: '/account',
      name: 'Account',
      component: Account
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
      path: '/groupview',
      name: 'GroupView',
      component: GroupView,
      children: [{
        path: 'setting',
        name: 'GroupSetting',
        component: GroupSetting
      },
      {
        path: 'info',
        name: 'GroupInfo',
        component: GroupInfo
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
