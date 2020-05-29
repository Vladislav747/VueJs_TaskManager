<template>
  <footer class="bg-blue">
    <div class="max-width-block footer-inner">
      <font-awesome-icon icon="palette" class="footer-icon icon-size-xl" alt="Удалить задачу"/>
      <input type="checkbox" class="theme-switch" id="change_theme" v-model="isBlackTheme" @click="changeTheme()">
      <label for="change_theme"></label>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterNavigation",

  data() {
    return {
      isBlackTheme: false,
    };
  },

  methods:{
    changeTheme() {
     this.isBlackTheme = !this.isBlackTheme;
     var iconTheme = document.getElementsByClassName("footer-icon")[0];
     var bodyElement = document.body;
     console.log(bodyElement, "bodyElement");

      if(this.isBlackTheme){
        bodyElement.classList.toggle("bg-dark");
      } else {
        bodyElement.classList.toggle("bg-dark");
      }
     this.$root.$emit('changeTheme', this.isBlackTheme);
    },
  }
};
</script>

<style lang="scss" scoped>

@import "../scss/components/FooterNavigation.scss";

</style>

