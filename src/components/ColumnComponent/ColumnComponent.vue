<template>
  <div 
    class="column"
    ref=columnRef
    @click="getTasks"
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
            <add-card />
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
  methods: {
     getTasks() {
      // try {
      //   const response = await this.$http.get("tasks");
      //   this.tasks = response.data;
      //   this.$emit("remove", this.tasks);
      //   this.$emit("get-tasks", this.tasks);
      //   //Создается копия массива
      //   this.filteredTasks = this.tasks.slice();
      // } catch (error) {
      //   showNoty("Ошибка вывода списка задач  " + error);
      // }
      

      var columns = document.querySelectorAll('.column');
      var card = document.querySelector('.card');

      card.addEventListener('dragstart', dragStart);
      card.addEventListener('dragend', dragEnd);

      for(const column of columns){
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', dragDrop);
      }

      function dragStart(){
        console.log("dragStart");
        card.className += ' hold';
        setTimeout(() => {
          card.className = 'invisible';
        }, 0);
      }
      function dragEnd(){
        card.className = 'card';
        console.log("dragEnd");
      }

      function dragOver(e) {
        e.preventDefault();
        console.log(e,"dragOver");
      }
      function dragEnter(e) {
        e.preventDefault();
        card.className += ' hovered';
        console.log("dragEnter");
      }
      function dragLeave() {
        console.log("dragLeave");
      }
      function dragDrop() {
        console.log("dragDrop");
      }
      console.log(columns, "columns");
      console.log(card, "card");
    },
  },
  
};
</script>

<style lang="scss" scoped> 
  @import "./ColumnComponent.scss";
</style>