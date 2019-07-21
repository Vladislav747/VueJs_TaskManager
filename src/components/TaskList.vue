<template>
  <div class="taskList">
    <div v-if="!isLoading && !noTasks" class="filterIcon">
      <font-awesome-icon icon="filter" size="1.5x" class="top-icon" v-on:click="showFilter()"/>
    </div>

    <div v-if="!isLoading && !noTasks" class="filterWrapper">
      <!-- Фильтр по категориям  -->
      <div v-if="!isLoading && !noTasks" id="filter">
        <p class="filterWrapper-text">Фильтр задач</p>Категория:
        <select v-model="filterCategory">
          <option></option>
          <option v-for="type in taskTypes" :key="type">{{ type }}</option>
        </select>
      </div>

      <!-- Фильтр по Дедлайну  -->
      <div v-if="!isLoading && !noTasks" id="filter">
        Срочность:
        <select v-model="filterDateDeadline">
          <option></option>
          <option v-for="type in deadlineTypes" :key="type">{{ type }}</option>
        </select>
      </div>
    </div>

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
import { bus } from "../utility/bus.js";

export default {
  name: "TaskList",

  components: {
    TaskCard
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

      this.$parent.$children[0].tasks = this.filteredTasks;
      this.isLoading = false;
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
      var iconFilter = document.getElementsByClassName("filterIcon")[0];
      divFilter.classList.toggle("show");
      iconFilter.classList.toggle("show");
    }
  },

  /**
   * Переход на добавление задачи
   * @param {object} task - объект текущей задачи
   *
   */
  addTask() {
    this.$router.push("task-add");
  }
};
</script>

<style lang="scss" scoped>
#filter {
  margin-bottom: 1em;
  text-align: center;

  select {
    border-radius: 3px;
    outline: 0;
    padding: 5px;
    width: 60%;
  }
}

.filterWrapper-text {
  margin-right: 150px;
  margin-bottom: 20px;
}

.filterWrapper {
  transition: 0.5s linear;
  opacity: 0;
  visibility: hidden;
  right: -100px;
  position: fixed;
  width: 300px;
  background-color: #f2f2f2;
  margin-left: 1140px;
  z-index: 2;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: 0.5s linear;
  padding: 10px 14px;
  &.show {
    right: 0px;
    opacity: 0.8;
    visibility: visible;
    transition-delay: 0s;
  }
}

.taskList {
  z-index: 1;
  overflow: hidden;
}

.filterIcon {
  transition: 0.5s linear;
  right: 0px;
  position: fixed;
  top: 140px;
  background-color: #2b87d8;
  padding: 10px 14px;

  border-radius: 25%;
  &.show {
    right: 19%;
  }
  svg{
    color:white;
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

  #tasks {
    padding: 5%;
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

#tasks {
  padding:10px;
  display: flex;
  flex-wrap: wrap;

  .card:nth-child(3n) {
    margin-right: 0;
  }
}
</style>
