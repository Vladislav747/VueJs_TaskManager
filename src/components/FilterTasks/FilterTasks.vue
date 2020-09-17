<template>     
     <div v-if="!isLoading && !noTasks" class="filterWrapper">
        <div class="filterIcon bg-blue-element" v-on:click="showFilter()">
          <font-awesome-icon icon="filter" class="top-icon icon-size-m"/>
        </div>
        <p class="filterWrapper-text">Фильтр</p>

        <div class="filter-inner">

          <!-- Фильтр по категориям  -->
          <div class="filter-property">
              <span class="filter-property--title">Категория:</span>
              <select class="filter-property--body" v-model="filterCategory">
                  <option></option>
                  <option v-for="type in taskTypes" :key="type">{{ type }}</option>
              </select>
          </div>

          <!-- Фильтр по Дедлайну  -->
          <div class="filter-property">
              <span class="filter-property--title">Срочность:</span>
              <select class="filter-property--body" v-model="filterDateDeadline">
                  <option></option>
                  <option v-for="type in deadlineTypes" :key="type">{{ type }}</option>
              </select>
          </div>

          <div class="clear-result__wrapper">
              <button @click="clearResults()" class="clear-results__btn">Сбросить результаты</button>
          </div>
        </div>
    </div>

</template>

<script>
import { TASK_TYPES, DEADLINE_TYPES } from "../../utility";

export default {
  name: "FilterTasks",

  props:{
    isLoading: {
      type: Boolean,
      default: true,
    },
    noTasks: {
      type: Boolean,
      default: true,
    },
    tasks: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  
  data() {
    return {
      filteredTasks: {
        type: Array,
      },
      filterCategory: {
        type: String,
      },
      filterDateDeadline: {
        type: String,
      },
      taskTypes: TASK_TYPES,
      deadlineTypes: DEADLINE_TYPES,
      filteredTasksTime: [],
      filteredTasksDeadline: []
    };
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
      this.$emit('filter_tasks', this.filteredTasks);
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
      this.$emit('filter_tasks', this.filteredTasks);
    }
  },

  methods: {

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

    /**
     * Фильтровать задачу по деадлайну
     * @param {object} task - объект текущей задачи
     *
     */
    filterTaskDeadline(task) {
      var dateDeadline = new Date(task.dateOfTask).getTime();
      var nowDate = new Date().getTime();

      switch (this.filterDateDeadline) {
        case "Непросроченные Задачи":
          return dateDeadline >= nowDate;

        case "Просроченные Задачи":
          return dateDeadline < nowDate;

        default:
          return true;
      }
    },

    /**
     * Показывать/Скрывать блок фильтра
     */
    showFilter() {
      var divFilter = document.getElementsByClassName("filterWrapper")[0];
      var overlay = this.$root.$data.showOverlay();
      divFilter.style['z-index'] = overlay.index;
      overlay.div.onclick = function(e){
        if(typeof(e.target.remove) == 'function') {
          e.target.remove();
          divFilter.classList.toggle("show");
        }
      }
      divFilter.classList.toggle("show");
    },

    /* Очистить результаты фильтрации */
    clearResults() {
      this.$emit('clear_results', this.tasks);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./FilterTasks.scss";
</style>
