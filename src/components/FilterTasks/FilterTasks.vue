<template>     
     <div class="filterWrapper">
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
              <button @click="clearResults()" class="btn-task clear-results__btn bg-red-element">Сбросить результаты</button>
          </div>
        </div>
    </div>

</template>

<script>
import { TASK_TYPES, DEADLINE_TYPES } from "../../utility";

export default {
  name: "FilterTasks",

  props:{
    tasks: {
      type: Array,
    },
  },
  
  data() {
    return {
      filteredTasks: tasks,
      filterCategory: {
        type: String,
      },
      filterDateDeadline: {
        type: String,
      },
      taskTypes: TASK_TYPES,
      deadlineTypes: DEADLINE_TYPES,
      filteredTasksTime: [],
      filteredTasksDeadline: [],
    
    };
  },

  watch: {
    filterCategory: function() {
        var filterData = [];
      if (this.filteredTasksDeadline.length === 0) {
        filterData = this.tasks.slice(0);
        filterData.forEach(element => {
          element.cards = element.cards.filter(this.filterTask)
        });
        this.filteredTasksTime = filterData;
      } else {
        filterData = this.filteredTasksDeadline;
        filterData.forEach(element => {
          element.cards = element.cards.filter(this.filterTask)
        });
        this.filteredTasksTime = filterData;

      }
      this.$emit('filter_tasks', this.filteredTasksTime);
    },

    filterDateDeadline: function() {
      var filterData = [];
      
      if (this.filteredTasksTime.length === 0) {
        filterData = this.tasks.slice(0);
        filterData.forEach(element => {
          element.cards = element.cards.filter(this.filterTaskDeadline)
        });
        this.filteredTasksDeadline = filterData;
      } else {
        filterData = this.filteredTasksTime;
        filterData.forEach(element => {
          element.cards = element.cards.filter(this.filterTask)
        });
        this.filteredTasksDeadline = filterData;
      }
      this.$emit('filter_tasks', this.filteredTasksDeadline);
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
      this.$emit('clear_results', this.filteredTasks);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./FilterTasks.scss";
</style>
