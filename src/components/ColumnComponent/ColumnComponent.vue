<template>
  <div 
    class="column"
    ref="columnRef"
    v-bind:data-column-order="order"
    >
      <div class="column__inner">
          <div class="column__title">
            <b>{{tasks.title}}</b>
            <div class="btn-remove">
              <svg @click="deleteColumn" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 6.71875L14.2188 0L15 0.78125L8.28125 7.5L15 14.2188L14.2188 15L7.5 8.28125L0.78125 15L0 14.2188L6.71875 7.5L0 0.78125L0.78125 0L7.5 6.71875Z" fill="#6B808C"/>
              </svg>
            </div>
          </div>
          <div class="column__items">
            <task-card v-for="task in tasks.cards" :key="task._id" :task="task" v-on:deleteTask="deleteCard"/>
            <add-card v-on:newCard="addNewCard"/>
          </div>
      </div>
   
  </div>
</template>

<script>
import { showNoty} from "../../utility";

import TaskCard  from "../TaskCard/TaskCard";
import AddCard  from "../AddCard/AddCard";


export default {
  name: "ColumnComponent",
  props: {
    tasks:{
      type:Object
    },
    order:{
      type: Number
    }
  },
  components: {
    TaskCard,
    AddCard,
  },

  methods: {
    addNewCard(data){
      this.tasks.cards.push(data);
      showNoty("Задача добавлена !", "success");
    },
    deleteCard(data){
      this.tasks.cards = this.tasks.cards.filter(task => task.id !== data.id);
      showNoty("Задача удалена !", "success");
    },

    deleteColumn(){
      let columnOrder = this.order;
      let currentColumn = document.querySelector(`.column[data-column-order="${columnOrder}"]`);
      currentColumn.remove();

    },

  },
};
</script>

<style lang="scss" scoped> 
  @import "./ColumnComponent.scss";
</style>