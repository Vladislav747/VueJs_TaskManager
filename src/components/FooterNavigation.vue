<template>
  <footer>
   <a>Футер</a>
  </footer>
</template>

<script>
export default {
  name: "FooterNavigation",

  data() {
    return {
      searchText: "",
      tasks: ["a"]
    };
  },

  props: ["tasks1"],

  mounted: function() {
   
  },

  watch: {

  }
};
</script>

<style lang="scss" scoped>


@media screen and (max-width: 768px){

}

@media screen and (max-width: 425px) {
  
}

</style>

