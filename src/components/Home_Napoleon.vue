<template lang="pug">
    .home
        img(alt="Vue logo", @click="deleteMessage()" src="../assets/logo.png")
        br
        input(v-model="message")
        div {{myVariable}}
        label Red
            input(type="checkbox" v-model="isRed")
        hello-world(:msg="message" v-bind:class="{red: isRed}")
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  methods: {
      deleteMessage() {
          this.message = ''
      }
  },
  data(){
    return{
        isRed: false,
        message: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    HelloWorld
  },
  watch: {

  },
  computed: {
      myVariable(){
          return 1
      }
  }
}
</script>

<style lang="stylus" scoped>
.red
    color: red
</style>