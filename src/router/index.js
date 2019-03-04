import Vue from 'vue'
import Router from 'vue-router'

import TaskList from '../components/TaskList.vue'
import TaskAddEdit from '../components/TaskAddEdit.vue'
import TaskDetail from '../components/TaskDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'task-list',
      component: TaskList
    },
    {
      path: '/task/:id',
      name: 'view-task',
      component: TaskDetail
    },
    {
      //вызывается с помощью компонента TaskList this.$router.push('task-add')
      path: '/task-add',
      name: 'task-add',
      component: TaskAddEdit
    },
    {
      path: '/task-edit/:id',
      name: 'task-edit',
      component: TaskAddEdit
    }
  ]
})
