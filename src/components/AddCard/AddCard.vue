<template>
    <div class="add-form">
        <div class="add-form__input" v-if="showForm">
            <input
                type="text"
                v-model="taskName"
                placeholder="Введите название задачи"
            />
            <textarea
                v-model="taskDescription"
                placeholder="Введите описание задачи"
                rows="3"
            />
            Срок задачи
            <input type="date" v-model="taskDate" placeholder="Введите дату" />
            <div class="add-form__bottom">
                <Button
                    class="btn-task add-btn bg-green-element"
                    @click="addTask()"
                >
                    Добавить задачу
                </Button>
                <img
                    class="add-form__bottom-clear"
                    @click="toggleForm"
                    src="../../assets/clear.svg"
                    alt="Clear image"
                />
            </div>
        </div>
        <div v-else class="add-form__bottom">
            <div class="add-form__bottom-add-btn">
                <img
                    src="../../assets/add.svg"
                    class="add-form__bottom-add"
                    alt="Add svg icon"
                    @click="toggleForm"
                />
                <span>Добавить задачу</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddCard',
    props: {},
    data() {
        return {
            taskName: '',
            taskDescription: '',
            taskDate: '',
            showForm: false,
        };
    },
    computed: {},
    methods: {
        /**
         * Добавить задачу
         * @param {object} task - объект текущей задачи
         *
         */
        addTask() {
            if (this.taskName && this.taskDescription && this.taskDate) {
                let task = {
                    name: this.taskName,
                    category: 'Просрочено',
                    description: this.taskDescription,
                    dateOfTask: this.taskDate,
                };
                this.$emit('newCard', task);
                this.cleanForm();
                this.toggleForm();
            }
        },
        //закрыть форму
        toggleForm() {
            this.showForm = !this.showForm;
        },

        //Очистить форму
        cleanForm() {
            this.taskName = '';
            this.taskDescription = '';
            this.taskDate = '';
        },
    },
};
</script>

<style lang="scss" scoped>
@import './AddCard.scss';
</style>