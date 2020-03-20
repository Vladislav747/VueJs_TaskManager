<template lang="pug">
  .about
    h1 This is an about page
    input(v-model="inputFilter")
    .todos
      ul
        li(v-for="todo in filteredJson" :key="todo.id") {{todo.title}}

</template>
<script>
export default {
  name: "About_Napoleon",
  data(){
    return{
      myJson:[],
      inputFilter:''
    }
  },
  computed:{
    filteredJson() {
      return this.myJson.filter(element => element.title.includes(this.inputFilter))
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => this.myJson=json)
  }
}
</script>