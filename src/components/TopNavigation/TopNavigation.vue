<template>
    <div class="header bg-blue">
        <div class="max-width-block header-inner">
            <router-link
                id="task-list"
                class="header__link active"
                :to="{ name: 'task-list' }"
            >
                <span class="top-desktop">Задачи</span>
                <font-awesome-icon icon="list-ul" size="2x" class="top-icon" />
            </router-link>

            <div class="spacer" />
            <!-- TODO: Не работает поиск - лучше всего ввести  -->
            <!-- <input v-if="isHome" v-model="searchText" type="search" placeholder="Искать Задачи..."> -->
        </div>
    </div>
</template>

<script>
import { bus } from '../../utility/bus.js';

export default {
    name: 'TopNavigation',

    data() {
        return {
            searchText: '',
            tasks: [],
            blackTheme: false,
        };
    },

    props: ['tasks1'],

    computed: {
        isHome() {
            return this.$route.path === '/';
        },
    },

    methods: {},

    mounted: function () {
        bus.$on('remove', function (tasks) {
            let vm = this;
            vm.tasks = tasks;
        });

        this.$root.$on('changeTheme', this.changeTheme);
    },

    watch: {
        /**
         * Поиск задач по имени (name)
         */
        searchText: function () {
            let tasks = this.tasks;
            let searchedTasks = [];
            let str = new RegExp(this.searchText);
            tasks.forEach((element) => {
                const found = str.test(element.name);
                if (found) {
                    searchedTasks.push(element);
                }
            });

            this.$parent.$children[1].filteredTasks = searchedTasks;
        },
    },
};
</script>

<style lang="scss" scoped>
@import './TopNavigation.scss';
</style>

