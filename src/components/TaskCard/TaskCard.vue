<template>
  <div class="card" draggable="true" @mousedown="dragCard($event.target)">
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
  </div>
</template>

<script>
import Noty from "noty";

import { showNoty } from "../../utility";

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

        showNoty("Задача Удалена.", "error");
      } catch (error) {
          this.check.close();
          showNoty(error);
      }
    },
    /*
      Перетаскивание элемента
    
    */
    dragCard(element){
      var card = '';
      if(element.className !== 'card-inner'){
        return
      }
        card = element.parentElement
        var columns = document.querySelectorAll('.column');
        var columnItems = document.querySelectorAll('.column__items');

        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);

        for(const column of columns){
          column.addEventListener('dragover', dragOver);
          column.addEventListener('dragenter', dragEnter);
          column.addEventListener('dragleave', dragLeave);
          column.addEventListener('drop', dragDrop);
        }

        function dragStart(){
          card.className += ' hold';
          
          setTimeout(() => {
            card.className += ' invisible';
          }, 0);
        }
        function dragEnd(){
          card.className = 'card';
        }

        function dragOver(e) {
          e.preventDefault();
          if(e.toElement !== undefined && e.toElement.className == 'column__items'){
            e.toElement.className += ' hovered';
          }
          
        }
        function dragEnter(e) {
          e.preventDefault();
        }
        function dragLeave(e) {
          if(e.toElement !== undefined && e.toElement.className == 'column__items hovered'){
              e.toElement.className = 'column__items';
            }
        }
        function dragDrop(e) {
          var divColumnItems = this.querySelector('.column__items');
          if(divColumnItems){
            divColumnItems.prepend(card);
            columnItems.forEach((item) => item.className="column__items")
          }
        }
      
      
        
    },
    
  },

  mounted: function() {
      this.$root.$on('changeTheme', this.changeTheme);
  },
};
</script>

<style lang="scss" scoped> 
@import "./TaskCard.scss";

</style>
