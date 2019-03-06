<template>
  <div>
    <div class="task">
      <h3>
        Имя: {{ task.name }}
        <span>{{ task.category }}</span>
      </h3>

      <div class="description">Описание: {{ task.description }}</div>

      <div class="tag">Тэги: <input-tag id="task-tag" v-model="task.tag" :read-only="true"></input-tag></div>

    <div class="datetimeDeadline">Дата Дедлайна: {{ task.dateOfTask }}</div>

     
    </div>

    <footer>
      <a
        id="edit"
        @click.prevent="editTask()">Редактировать</a>
      <a
        id="delete"
        @click.prevent="deleteTask()">Удалить</a>
    </footer>
  </div>
</template>

<script>
import Noty from 'noty'

import {showNoty} from '../utility'
import InputTag from 'vue-input-tag'; 

export default {
  name: 'TaskDetail',

  components: {
    InputTag
  },

  data () {
    return {
      task: {
        name: 'Ошибка',
        category: '',
        description: 'Неправильно задаете задание',
      },
      check: undefined
    }
  },

  computed: {
    
  },

//Вызвать получение задания при загрузке компонента
  mounted() {
    this.getTask()
  },

  methods: {
    async getTask () {
      try {
        const response = await this.$http.get('tasks/' + this.$route.params.id)

        if (response.data === null) {
          //Перенаправление на страницу
          this.$router.push({ name: 'task-list' })
          showNoty('Requested task not found.')
          return
        }

        this.task = response.data
      } catch (error) {
        showNoty('TaskDetail ' + error)
      }
    },

    editTask () {
      //Перенаправить на страницу
      this.$router.push({ name: 'task-edit', params: { id: this.task.id } })
    },

    deleteTask () {
      this.check = new Noty({
        text: 'Удаление задачи нельзя будет отменить.<br>Вы уверены?',
        type: 'alert',
        layout: 'topCenter',
        buttons: [
          Noty.button('Да',
                      'danger',
                      /* istanbul ignore next */ () => this.realDelete(),
                      { id: 'delete-yes' }),
          Noty.button('Нет',
                      '',
                      /* istanbul ignore next */ () => this.closeCheck(),
                      { id: 'delete-no' })
        ]
      })

      this.check.show()
    },

    closeCheck () {
      //Если нет экземпляра Noty то закрыть функцию !! не Окно
      if (!this.check) {
        return
      }
      //Если есть экзмепляр то закрыть окно
      this.check.close()
    },


    async realDelete () {
      try {
        //Вызов запрос типа http.
        await this.$http.delete('tasks/' + this.task.id)

        this.check.close()
        this.$router.push({ name: 'task-list' })

        showNoty('Задача Удалена.', 'success')
      } catch (error) {
        this.check.close()
        showNoty(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  padding: 1rem;

  h3,
  h4 {
    margin-bottom: 1rem;

    span {
      color: #737373;
      float: right;
      font-size: 1rem;
      font-weight: normal;
    }
  }

  .description {
    margin-bottom: 1rem;
  }

  .tags {
    display: flex;

    .times {
      font-size: .9rem;
      margin-bottom: 1rem;

      span {
        margin-left: 3rem;
      }
    }

    .ingredients,
    .image {
      flex: 0 0 50%;
    }

    .ingredients {
      padding-right: 1rem;
    }

    .ingredient {
      font-size: .9rem;

      div {
        float: right;
        font-weight: bold;
        text-align: right;
        width: 40%;

        span {
          float: right;
          padding-left: 5px;
          text-align: left;
          width: 60%;
        }
      }
    }

    .image {
      background-position: center;
      background-size: cover;
      min-height: 240px;
    }
  }
}

footer {
  background-color: #2b87d8;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: 1em;
  padding: 1em;

  a {
    color: #fff;
    cursor: pointer;
    line-height: 28px;
    margin-right: 1em;
    text-decoration: none;
  }
}
</style>
