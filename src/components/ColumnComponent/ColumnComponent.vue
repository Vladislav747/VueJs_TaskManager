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
             <task-card v-for="task in tasks.cards" :key="task._id" :task="task" />
            </div>
      </div>
   
  </div>
</template>

<script>
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
  data() {
    return {
    };
  },
  };
</script>

<style lang="scss" scoped> 
  @import "./ColumnComponent.scss";
</style>