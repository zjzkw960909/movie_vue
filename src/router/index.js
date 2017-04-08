import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => require(['../pages/Index'], resolve)
const GraphDetail = resolve => require(['../pages/GraphDetail'], resolve)

const Admin = resolve => require(['../admin/Admin'], resolve)
const GraphList = resolve => require(['../admin/GraphList'], resolve)
const AdminGraphDetail = resolve => require(['../admin/GraphDetail'], resolve)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/graphDetail/:ID/',
            name: 'graphDetail',
            component: GraphDetail
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: [
                {
                    path: 'graph-list/:PAGE',
                    component: GraphList
                },
                {
                    path: 'graph-detail/:ID',
                    component: AdminGraphDetail
                }
            ]
        }
    ]
})
