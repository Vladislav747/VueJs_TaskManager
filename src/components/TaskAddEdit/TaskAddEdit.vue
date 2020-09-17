<template>
  <form v-if="task">
    <h2 v-if="!isEdit">
      Создать задачу
    </h2>
    <h2 v-else>
      Редактировать задачу
    </h2>

    <span class="required">- обязательное поле</span>

    <div class="row">
      <label class="short-label">
        Имя:
        <input id="task-name" v-model="task.name" class="formEdit-input" type="text" placeholder="Заполните поле"/>
      </label>
    </div>

    <div class="row">
      <label class="short-label">
        Категория:
        <select id="task-category" v-model="task.category" class="formEdit-input">
          <option v-for="type in taskTypes" :key="type">{{ type }}</option>
        </select>
      </label>
    </div>

    <div class="row">
      <label>
        Описание:
        <textarea id="task-description" v-model="task.description" placeholder="Заполните поле"/>
      </label>
    </div>

    <!-- <div class="row">
      <label>Тэги:
        <input-tag id="task-tag" v-model="task.tag"></input-tag>
      </label>
    </div>-->

    <div class="row">
      <label>
        Дата Дедлайна:
        <date-picker
          v-model="task.dateOfTask"
          type="datetime"
          lang="en"
          format="YYYY-MM-DD hh:mm:ss"
        ></date-picker>
      </label>
    </div>

    <div class=formEdit-wrapper>
      <button id="save" class="formEdit-button" type="submit" @click.prevent="validateForm(true)">Сохранить Задачу</button>
      <button id="save-new" class="formEdit-button" @click.prevent="validateForm(false)">Сохранить и Начать Новую Задачу</button>
      <button id="cancel" class="formEdit-button" @click.prevent="cancel()">Отмена</button>
    </div>
  </form>
</template>

<script>
import { showNoty, TASK_TYPES } from "../../utility";

import DatePicker from "vue2-datepicker";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "TaskAddEdit",

  components: {
    DatePicker
  },

  data() {
    return {
      task: {
        name: "",
        category: "В работе",
        description: ""
      },
      isLoading:{
        type: Boolean,
        default: false,
      },
      taskTypes: TASK_TYPES
    };
  },

  validations: {
    task: {
      name: { required },
      description: { required, max: maxLength(2048) }
    }
  },

  computed: {
    isEdit() {
      return this.$route.params && this.$route.params.id;
    }
  },

  async mounted() {
    if (this.isEdit) {
      await this.getTask();
    }
  },

  methods: {
    /**
     * Получить все задачи с сервера
     *
     */
    async getTask() {
      try {
        const response = await this.$http.get("tasks/" + this.$route.params.id);

        if (response.data === null) {
          this.$router.push({ name: "task-list" });
          showNoty("Задача не Найдена.");
          return;
        }

        this.task = response.data;
      } catch (error) {
        showNoty(error);
      }
    },

    /**
     * Сохранить задачу
     *
     *@param {string} response - ответ сервера
     *
     */
    async saveTask(isComplete) {
      try {
        const response = this.isEdit
          ? await this.$http.put("tasks", this.task)
          : await this.$http.post("tasks", this.task);

        if (this.checkErrors(response) && isComplete) {
          this.$router.push({
            path: this.isEdit ? "/task/" + this.task.id : "/"
          });
          showNoty(
            `Task ${response.data.name} ` +
              (this.isEdit ? "Отредактировано" : "Добавлено"),
            "success"
          );
          return;
        }
      } catch (e) {
        showNoty("Ошибка с добавлением задачи. Попробуйте еще раз!");
        return;
      }

      this.resetForm();
    },

    /**
     * Очистить форму
     *
     */
    resetForm() {
      this.task = {
        name: "",
        category: "В работе",
        description: "",
        tag: "",
        dateOfTask: ""
      };
    },

    /**
     * Отмена выполнения
     *
     */
    cancel() {
      //Вернуться назад
      this.$router.go(-1);
    },

    /**
     * Проверка ошибок возврата с сервера
     * @param {object} response - ответ сервера
     *
     */
    checkErrors(response) {
      if (response.data.message === "success") {
        return true;
      }

      response.data.errors.forEach(error =>
        showNoty(this.transformErrorMessage(error.message))
      );

      return false;
    },

    /**
     * Форматирование ответа сервера
     * @param {string} response - ответ сервера
     *
     */
    transformErrorMessage(message) {
      message = message.replace(".", " ");
      message = message.replace(
        /([A-Z])/,
        (match, p1) => " " + p1.toLowerCase()
      );
      message = message.charAt(0).toUpperCase() + message.slice(1) + ".";

      return message;
    },

    /**
     * Проверяем форму на валидность
     * @param {boolean} isComplete - параметр создания еще одной задачи после создания текущей.
     *
     */
    validateForm(isComplete) {
      this.$v.task.$touch();
      if (this.$v.task.$error) {
        if (this.$v.task.name.$error) {
          showNoty("Имя должно быть заполнено");
        }

        if (this.$v.task.description.$error) {
          showNoty(
            "Описание должно быть заполнено и не может быть более 2048 символов"
          );
        }
        showNoty("Форма не может быть отправлена - ошибки в форме");
      } else {
        this.saveTask(isComplete);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./TaskAddEdit.scss";

</style>
