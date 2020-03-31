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
  </div>  
</template>

<script>
import { showNoty, TASK_TYPES, DEADLINE_TYPES } from "../utility";
import TaskCard from "./TaskCard.vue";
import FilterTasks from "./FilterTasks.vue";

export default {
  name: "TaskList",

  components: {
    TaskCard,
    FilterTasks,
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

    checkTasks(){
      this.$on('filter_tasks', function(data){
        console.log(data, "Event filter_tasks");
      });
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

.taskList {
  z-index: 1;
}

#tasks {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
  padding: 16px 0;
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
