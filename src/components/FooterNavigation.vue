<template>
  <footer>
   <font-awesome-icon icon="trash" size="2x" class="footer-icon" alt="Удалить задачу"/>
   <input type="checkbox" id="change_theme" class="custom-switch" name="change_theme" v-model="checked">
   <label for="change_theme">{{ checked }}</label>
  </footer>
</template>

<script>
export default {
  name: "FooterNavigation",

  data() {
    return {
    
    };
  },

  mounted: function() {
   
  },

  watch: {

  },

  methods:{

  }
};
</script>

<style lang="scss" scoped>


@media screen and (max-width: 768px){

}

@media screen and (max-width: 425px) {
  
}

</style>

