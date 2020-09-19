<template>
  <div class="taskList max-width-block">
    
    <enter-banner v-if="!showEnterBanner" />
    <!-- Если есть isLoading то ставим Loader -->
    <div v-if="isLoading" class="lds-dual-ring"></div>

    <div v-else id="tasks">
      <filter-tasks
        v-bind:tasks="filteredTasks"
        v-on:filter_tasks="filterResults"
        v-on:clear_results="filterResults"
      ></filter-tasks>
      <!-- <task-card v-for="task in filteredTasks" :key="task._id" :task="task"/> -->
      <column-component v-for="column in filteredTasks" :key="column.title" :tasks="column"  />
    </div>
    <scroll-up/>
  </div>  
</template>

<script>
import { showNoty, TASK_TYPES, DEADLINE_TYPES } from "../../utility";
import {tasks} from "../../api/index.js";

import FilterTasks from "../FilterTasks/FilterTasks.vue";
import ScrollUp from "../ScrollUp/ScrollUp.vue";
import ColumnComponent from "../ColumnComponent/ColumnComponent.vue";
import EnterBanner from "../EnterBanner/EnterBanner.vue";

export default {
  name: "TaskList",

  components: {
    FilterTasks,
    ScrollUp,
    ColumnComponent,
    EnterBanner,
  },

  data() {
    return {
      isLoading: true,
      filteredTasks: tasks,
      filterCategory: "",
      filterDateDeadline: "",
      taskTypes: TASK_TYPES,
      deadlineTypes: DEADLINE_TYPES,
      filteredTasksTime: [],
      filteredTasksDeadline: []
    };
  },

  computed: {
    noTasks() {
      return (
        this.tasks.length == 0
      );
    },

    showEnterBanner(){
      var localStorageBanner = localStorage.getItem("enterBanner");
      console.log(localStorageBanner, "localStorageBanner");
      return localStorageBanner;
    }
  },

  watch: {
    filterCategory: function() {
      if (this.filteredTasksDeadline.length === 0) {
        this.filteredTasksTime = this.tasks.filter(this.filterTask);
      } else {
        this.filteredTasksTime = this.filteredTasksDeadline.filter(
          this.filterTask
        );
      }
      this.filteredTasks = this.filteredTasksTime;
    },

    filterDateDeadline: function() {
      
      if (this.filteredTasksTime.length === 0) {
        this.filteredTasksDeadline = this.tasks.filter(this.filterTaskDeadline);
      } else {
        this.filteredTasksDeadline = this.filteredTasksTime.filter(
          this.filterTaskDeadline
        );
      }
      this.filteredTasks = this.filteredTasksDeadline;
    }
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    /**
     * Получить задачи
     */
    async getTasks() {
      // try {
      //   const response = await this.$http.get("tasks");
      //   this.tasks = response.data;
      //   this.$emit("remove", this.tasks);
      //   this.$emit("get-tasks", this.tasks);
      //   //Создается копия массива
      //   this.filteredTasks = this.tasks.slice();
      // } catch (error) {
      //   showNoty("Ошибка вывода списка задач  " + error);
      // }
      this.filteredTasks = tasks;
      this.isLoading = false;
    },

    /* Фильтровать результаты */

    async filterResults(data){
      this.filteredTasks = data;
    },

    /**
     * Фильтровать задачу по категории
     * @param {object} task - объект текущей задачи
     *
     */
    filterTask(task) {
      if (this.filterCategory !== "") {
        return task.category.toString() === this.filterCategory.toString();
      } else {
        return true;
      }
    },

  },
};
</script>

<style lang="scss" scoped>
@import "./TaskList.scss";
@import "../../scss/preloader.scss";
</style>
