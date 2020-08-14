<template>
  <div class="taskList max-width-block">
    <filter-tasks
        v-bind:tasks="tasks"
        v-bind:isLoading="isLoading"
        v-bind:noTasks="noTasks"
        v-on:filter_tasks="filterResults"
        v-on:clear_results="filterResults"
      ></filter-tasks>

    <!-- Если есть isLoading то ставим Loader -->
    <div v-if="isLoading" class="loading">Загружаю задачи</div>
    <div v-if="noTasks" class="no-tasks">
      <h3>Задачи не найдены</h3>Нажмите вверху на панели Добавить Новую задачу
    </div>

    <div id="tasks">
      <task-card v-for="task in filteredTasks" :key="task._id" :task="task"/>
    </div>
    <scroll-up/>
  </div>  
</template>

<script>
import { showNoty, TASK_TYPES, DEADLINE_TYPES } from "../utility";

import TaskCard from "./TaskCard.vue";
import FilterTasks from "./FilterTasks.vue";
import ScrollUp from "./ScrollUp.vue";

export default {
  name: "TaskList",

  components: {
    TaskCard,
    FilterTasks,
    ScrollUp,
  },

  data() {
    return {
      isLoading: true,
      tasks: [],
      filteredTasks: [],
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
        this.isLoading === false && (this.tasks && this.tasks.length === 0)
      );
    },
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
      try {
        const response = await this.$http.get("tasks");
        this.tasks = response.data;
        this.$emit("remove", this.tasks);
        this.$emit("get-tasks", this.tasks);
        //Создается копия массива
        this.filteredTasks = this.tasks.slice();
      } catch (error) {
        showNoty("Ошибка вывода списка задач  " + error);
      }

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
@import "../scss/components/TaskList.scss";
</style>
