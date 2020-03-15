<template>
  <footer>
   Футер
  </footer>
</template>

<script>
export default {
  name: "Footer",

  data() {
    return {
      searchText: "",
      tasks: ["a"]
    };
  },

  props: ["tasks1"],

  computed: {
    isHome() {
      return this.$route.path === "/";
    }
  },

  mounted: function() {
    bus.$on("remove", function(tasks) {
     
      var vm = this;
      vm.tasks = tasks;
    });
  },

  watch: {

      /**
     * Поиск задач по имени (name)
     */
    searchText: function() {
      var tasks = this.tasks;
      var searchedTasks = [];
      var str = new RegExp(this.searchText);
      tasks.forEach(element => {
        var found = str.test(element.name);
        if (found) {
          searchedTasks.push(element);
        }
      });

      this.$parent.$children[1].filteredTasks = searchedTasks;
    }
  }
};
</script>

<style lang="scss" scoped>

nav {
  background-color: #2b87d8;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: 1em;
  padding: 1em;

  a {
    color: #fff;
    line-height: 28px;
    margin-right: 1em;
    text-decoration: none;
  }

  .router-link-exact-active {
    color: #86deb7;
  }

  .spacer {
    flex: 1 0;
  }

  input {
    border: 0;
    border-radius: 3px;
    font-size: 1rem;
    outline: 0;
    padding: 7px;
    width: 209px;
    transition: width 0.6s ease-in-out;
  }

  input[type="text"]:focus {
    width: 400px;
  }

  .top-icon {
    display: none;
  }
}
@media screen and (max-width: 550px) {
  nav {
    flex-wrap: wrap;

    input {
      margin: 1rem auto 0;
      width: 100%;
    }
    .top-desktop {
      display: none;
    }
    .top-icon {
      display: block;
    }
  }
}

</style>

