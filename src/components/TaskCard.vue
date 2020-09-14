<template>
  <section class="card">
    <div class="card-inner">
      <div class="card-header">
        <div class="card-header--top">
          <div class="card-title" @click="viewTask(task.id)">{{ task.name }}</div>
          <span class="card-sticker top-right" v-bind:class="classObject">{{ task.category }}</span>
        </div>
        <div class="description">{{ task.description }}</div>
      </div>

      <div class="card-footer">
        <div class="datetimeDeadline">{{ formatData }}</div>

        <div class="card-icons"> 
          <a id="edit" @click.prevent="editTask()" class="card-icons--link">
            <font-awesome-icon icon="edit" class="top-icon icon-size-xl" alt="Редактировать задачу"/>
          </a>
          <a id="delete" @click.prevent="deleteTask()" class="card-icons--link">
            <font-awesome-icon icon="trash" class="top-icon icon-size-xl" alt="Удалить задачу"/>
          </a>
        </div>
      </div>
        
    </div>
  </section>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";

export default {
  name: "TaskCard",
  props: {
    task: {
      type: Object,
      default: () => {
        return {
          name: "Новое",
          category: "Тестовая",
          description: "Тестовое описание"
        };
      }
    }
  },

  data() {
    return {
      blackTheme: {
        type: Boolean,
        deafult: false,
      },
    };
  },

  computed: {

  classObject: function () {
    var className;

    switch(this.task.category){

      case 'Просрочено':
        className = 'category_sticker expired_sticker';
        break;
      case 'В работе':
        className = 'category_sticker inwork_sticker';
        break;
      case 'Сделано':
        className = 'category_sticker ready_sticker';
        break;
      default:
        className = 'category_sticker';
        break;
    }
      return className
    },

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
     * Переход на детальное отображение задачи
     * @param {number} id - id задачи
     *
     */
    viewTask(id) {
      this.$router.push({ name: "view-task", params: { id } });
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

        showNoty("Задача Удалена.", "success");
      } catch (error) {
          this.check.close();
          showNoty(error);
      }
    }
  },

  mounted: function() {
      this.$root.$on('changeTheme', this.changeTheme);
  },
};
</script>

<style lang="scss" scoped> 
@import "../scss/components/TaskCard.scss";

</style>
