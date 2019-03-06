<template>
  <div>
    <!-- Фильтр по категориям  -->
    <div v-if="!isLoading && !noTasks" id="filter">
      Фильтр по категориям:
      <select v-model="filterCategory">
        <option></option>
        <option v-for="type in taskTypes" :key="type">{{ type }}</option>
      </select>
    </div>

    <!-- Фильтр по Дедлайну  -->
    <div v-if="!isLoading && !noTasks" id="filter">
      Фильтр по срочности:
      <select v-model="filterDateDeadline">
        <option></option>
        <option v-for="type in deadlineTypes" :key="type">{{ type }}</option>
      </select>
    </div>

    <!-- Если есть isLoading то ставим Loader -->
    <div v-if="isLoading" class="loading">Загружаю задачи</div>
    <!-- Если есть noTasks то задач нет -->
    <div v-if="noTasks" class="no-tasks" @click="addTask()">
      <h3>Задачи не найдены</h3>Нажмите сюда чтобы добавить новую задачу
    </div>

    <div id="tasks">
      <!-- Тут выводим компонент TaskCard -->
      <!-- Тут выводятся только данные из отфильтрованных по умолчанию 
      в filteredTasks пусто поэтому-->
      <task-card v-for="task in filteredTasks" :key="task.id" :task="task"/>
    </div>
  </div>
</template>

<script>
import { showNoty, TASK_TYPES, DEADLINE_TYPES } from "../utility";
import TaskCard from "./TaskCard.vue";

export default {
  name: "TaskList",

  components: {
    TaskCard
  },

  props: {
    search: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isLoading: true,
      tasks: [],
      filteredTasks: [],
      //Значение по умолчанию в фильтре
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
        this.filteredTasksTime = this.filteredTasksDeadline.filter(this.filterTask);
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
    },

    search: function() {
      this.filteredTasks = this.tasks.filter(this.filterSearch);
    }
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    async getTasks() {
      try {
        const response = await this.$http.get("tasks");
        this.tasks = response.data;
        //Создается копия массива
        this.filteredTasks = this.tasks.slice();
      } catch (error) {
        showNoty("Ошибка вывода списка задач  " + error);
      }

      this.isLoading = false;
    },

    filterTask(task) {

      if(this.filterCategory !== ''){
      return task.category.toString() === this.filterCategory.toString();
      }
      else{
      return true;
      }

    },

    filterTaskDeadline(task) {

      var dateDeadline = new Date(task.dateOfTask).getTime();
      var nowDate = new Date().getTime();

      switch (this.filterDateDeadline) {

        case "Непросроченные Задачи":
          return task.dateOfTask <= nowDate;

        case "Просроченные Задачи":
          return dateDeadline > nowDate;

        default:
          return true;
      }
     
    }
  },

  filterSearch(task) {
    return task.name.toLowerCase().includes(this.search);
  },

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
    width: 25%;
  }
}

@media screen and (max-width: 800px) {
  #filter {
    select {
      width: 40%;
    }
  }
}

@media screen and (max-width: 550px) {
  #filter {
    select {
      width: 60%;
    }
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
  display: flex;
  flex-wrap: wrap;

  .card:nth-child(3n) {
    margin-right: 0;
  }

  @media screen and (max-width: 800px) {
    .card:nth-child(3n) {
      margin-right: 1em;
    }

    .card:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
