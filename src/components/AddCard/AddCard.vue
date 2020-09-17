<template>
  <div className="add-form">
      <div className="add-form__input">
          <textarea
            @change="changedName()"
            v-model="taskName"
            placeholder="Введите название задачи"
            rows="3"
          />
        <div className="add-form__bottom">
          <Button @click="addTask()">
              Добавить задачу
          </Button>
          <img
            
            className="add-form__bottom-clear"
            src="../../assets/clear.svg"
            alt="Clear image"
          />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "AddCard",
  props: {
  
  },
  data() {
    return {
      taskName: "",
    };
  },
  computed: {
 
  
},
  methods: {
     /**
     * Добавить задачу
     * @param {object} task - объект текущей задачи
     *
     */
    addTask() {
     console.log("addTask");
    },
    changedName(){
      console.log("changedName");
    }
  },
  
};
</script>

<style lang="scss" scoped> 
@import "./AddCard.scss";
</style>