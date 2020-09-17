<template>
  <div 
    class="column"
    ref=columnRef
    >
      <div class="column__inner">
          <div class="column__title">
            <b>{{tasks.title}}</b>
            <div class="remove-btn">
              <img src="../../assets/clear.svg" alt="Clear svg icon" />
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
    }
  },
};
</script>

<style lang="scss" scoped> 
  @import "./ColumnComponent.scss";
</style>