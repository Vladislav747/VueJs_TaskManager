<template>
  <div class="task-container">
    <div v-if="isLoading" class="lds-dual-ring"></div>
    <div v-else class="task">
      <div class="header-task">
        <div class="header-title">
          <h3>
            Имя: {{ task.name }}
          </h3>
        </div>
        <div class="category">
          <span>{{ task.category }}</span>
        </div>
      </div>

      <div class="description">Описание: {{ task.description }}</div>

      <div class="datetimeDeadline">Дата Дедлайна: {{ formatData }}</div>

    </div>
  </div>
</template>

<script>
import Noty from "noty";

import { showNoty } from "../../utility";

export default {
  name: "TaskDetail",

  data() {
    return {
      task: {
        type: Object,
        default: () => {
        return {
          name: "Новое",
          category: "Тестовая",
          description: "Тестовое описание"
        };
        }
      },
      isLoading:{
        type: Boolean,
        default: true,
      },
    };
  },

  mounted() {
    this.getTask();
  },

  computed: {
    formatData: function(){
        return new Date(this.task.dateOfTask).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
      });
    },
  },

  methods: {
    /**
     * Получить задачу
     */
    async getTask() {
      try {
        const response = await this.$http.get("tasks/" + this.$route.params.id);

        if (response.data === null) {
          //Перенаправление на страницу
          this.$router.push({ name: "task-list" });
          showNoty("Requested task not found.");
          return;
        }

        this.task = response.data;
        this.isLoading = false;
      } catch (error) {
        showNoty("TaskDetail " + error);
      }
    },

    /**
     * Отредактировать задачу
     */
    editTask() {
      this.$router.push({ name: "task-edit", params: { id: this.task.id } });
    },

    /**
     * Отображение оповещение задачи
     */
    deleteTask() {
      this.check = new Noty({
        text: "Удаление задачи нельзя будет отменить.<br>Вы уверены?",
        type: "alert",
        layout: "topCenter",
        buttons: [
          Noty.button("Да", "danger", () => this.realDelete(), {
            id: "delete-yes"
          }),
          Noty.button("Нет", "", () => this.closeCheck(), { id: "delete-no" })
        ]
      });

      this.check.show();
    },

    /**
     * Закрыть всплывающее окно
     */
    closeCheck() {
      if (!this.check) {
        return;
      }
      //Если есть экземпляр то закрыть окно
      this.check.close();
    },

    /**
     * Удаление задачи
     */
    async realDelete() {
      try {
        await this.$http.delete("tasks/" + this.task.id);

        this.check.close();
        this.$router.push({ name: "task-list" });

        showNoty("Задача Удалена.", "error");
      } catch (error) {
        this.check.close();
        showNoty(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./TaskDetail.scss";

//preloader
@import "../../scss/preloader.scss";



</style>
