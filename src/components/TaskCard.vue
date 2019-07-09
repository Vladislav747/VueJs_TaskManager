<template>
  <section class="card" @click="viewTask(task.id)">
    <header>
      {{ task.name }}
      <span>{{ task.category }}</span>
    </header>

    <div class="description"> {{ task.description }}</div>

<div class="datetimeDeadline">{{ task.dateOfTask }}</div>

   <!-- <input-tag id="task-tag" v-model="task.tag" :read-only="true"></input-tag> -->

    
  </section>
</template>

<script>
import InputTag from 'vue-input-tag'; 

export default {
  name: "TaskCard",

  components: {
    InputTag
  },

  props: {
    task: {
      type: Object,
      default: () => {
        return {
          name: "",
          category: "",
          description: ""
        };
      },
    }
  },

  methods: {

    /**
     * Переход на детальное отображение задачи
     * @param {number} id - id задачи
     *
     */
    viewTask(id) {
      this.$router.push({ name: "view-task", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  flex: 0 0 calc(33.3333% - calc(1rem * 0.6666));
  flex-direction: column;
  margin-bottom: 1rem;
  margin-right: 1rem;
  flex-wrap: wrap;
  padding: 20px;
  
  border-radius:10px;
  header,
  .description,
  .times {
    padding: 1rem;
    
  }

&:hover {
 box-shadow: 0 0 15px rgba(0,0,0,0.5);
  }


  header {
    font-weight: bold;

    span {
      color: lighten(#333, 25%);
      float: right;
      font-size: 0.9rem;
      font-weight: normal;
    }
  }

  .image,
  .spacer {
    background-position: center;
    background-size: cover;
    height: 240px;
    max-width: 100%;
  }

  .spacer {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding-top: 32%;
    text-align: center;
  }

  .description {
  word-wrap: break-word;
  width: 400px;
  flex: 300px;
  }

  .tag {
    border: #eee 2px;
    border-radius: 25px;
    background: #73ad21;
    padding: 20px;
    width: 200px;
    height: 70px;
  }

.vue-input-tag-wrapper {
  border: 0px;
}
  .datetimeDeadline {
    font-size: 1rem;
    font-weight: bold;
    flex-grow: 1;
    text-align: center;

    .center {
      text-align: center;
    }

    span {
      float: right;
    }
  }
}

@media screen and (max-width: 800px) {
  .card {
    flex: 0 0 calc(50% - calc(1rem * 0.55));
  }
}

@media screen and (max-width: 550px) {
  .card {
    flex: 0 0 100%;
    padding: 5%;

.description {
  word-wrap: break-word;
  width: 250px;
  }
  }
  
}
</style>
