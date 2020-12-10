// eslint-disable-next-line
import { UserLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const defaultRouterMap = [
  {
    'title': 'menu.dashboard',
    'key': 'dashboard',
    'component': 'RouteView',
    'redirect': '/dashboard/weclome',
    'icon': bxAnaalyse,
    'hideChildrenInMenu': true,
    'children': [{
      'title': 'menu.dashboard.weclome',
      'key': 'weclome',
      'icon': ''
    }]
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }

]
