<template>     
     <div v-if="!isLoading && !noTasks" class="filterWrapper">
        <div class="filterIcon" v-on:click="showFilter()">
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
import { showNoty, TASK_TYPES, DEADLINE_TYPES } from "../utility";

export default {
  name: "FilterTasks",

  props:{
    isLoading: "",
    noTasks:"",
    tasks: {
      type: Array,
      default: [],
    },
  },
  
  data() {
    return {
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
      console.log(this.filteredTasks, "Отфильтрованные задачи по Категориям");
      console.log(this.tasks);
      console.log(this.filterCategory);
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

      console.log(this.filteredTasks);
      console.log("check filterDateDeadline");
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
     
      console.log(this.tasks, "clear Results");
      this.$emit('clear_results', this.tasks);

    },
  }
};
</script>

<style lang="scss" scoped>

#filter {
  margin-bottom: 1em;
  text-align: center;
}



.filterWrapper-text {
  font-size: 20px;
  margin-bottom: 20px;
}

.filterWrapper {
  right: -100%;
  top: 0;
  height: 100%;
  position: fixed;
  width: 300px;
  background-color: #f9f9f9;
  box-shadow: none;
  z-index: 2;
  transition: right 0.2s linear;
  padding: 20px;
  &.show {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.19);
    visibility: visible;
    transition-delay: 0s;
    right: 0px;
  }
  &.show .filterIcon {
    display: none;
  }

    .filter-inner {
      .filter-property {
        margin: 10px 0;
        text-align: left;

        .filter-property--title {
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
          display: block;
        }

        select {
          &.filter-property--body {
            border-radius: 3px;
            outline: 0;
            padding: 5px;
            width: 100%;
          }
        }
      }
    }
}

.clear-result__wrapper{

  text-align: center;
  margin: 20px 0;

  .clear-results__btn{
  outline: none;
  padding: 10px;
  border: 1px solid black;
  
  }
} 

.filterIcon {
  transition: 0.5s linear;
  right: 2px;
  position: fixed;
  top: 15%;
  background-color: #2b87d8;
  padding: 10px 14px;
  border-radius: 25%;
  cursor: pointer;
  box-shadow: 0px 0px 5px 1px #c5c5c5;
  svg {
    color: white;
  }
}

@media screen and (max-width: 800px) {
  #filter {
    select {
      width: 40%;
    }
  }

  .card:nth-child(3n) {
    margin-right: 1em;
  }

  .card:nth-child(2n) {
    margin-right: 0;
  }
}

@media screen and (max-width: 550px) {
  #filter {
    select {
      width: 60%;
    }
  }
}


@media screen and (max-width: 800px){
   #tasks{
        justify-content: center;

  }
}

.no-tasks {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: center;
}

.loading {
  text-align: center;
}


</style>
