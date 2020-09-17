import Vue from "vue";
import Router from "vue-router";

import TaskList from "../components/TaskList/TaskList.vue";
import TaskAddEdit from "../components/TaskAddEdit/TaskAddEdit.vue";
import TaskDetail from "../components/TaskDetail/TaskDetail.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "task-list",
            component: TaskList,
        },
        {
            path: "/task/:id",
            name: "view-task",
            component: TaskDetail,
        },
        {
            path: "/task-edit/:id",
            name: "task-edit",
            component: TaskAddEdit,
        },
    ],
});
