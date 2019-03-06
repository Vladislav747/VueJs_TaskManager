<template>
  <section class="card" @click="viewTask(task.id)">
    <header>
      Имя: {{ task.name }}
      <span>{{ task.category }}</span>
    </header>

    <div class="description"> Описание: {{ task.description }}</div>

   Тэги: <input-tag id="task-tag" v-model="task.tag" :read-only="true"></input-tag>

    <div class="datetimeDeadline">Дата Дедлайна: {{ task.dateOfTask }}</div>
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

  header,
  .description,
  .times {
    padding: 1rem;
    
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
  width: 200px;
  }

  .tag {
    border: #eee 2px;
    border-radius: 25px;
    background: #73ad21;
    padding: 20px;
    width: 200px;
    height: 70px;
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
    /* Три значения: flex-grow | flex-shrink | flex-basis */
    flex: 0 0 100%;
  }
}
</style>
