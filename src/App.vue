<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 3px rgba(106, 18, 18, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #607dd6;
    outline: 1px solid slategrey;
  }

</style>

<template>
  <main-view />
</template>

<script>
  import MainView from '@/views/main/main.view.vue'

  export default {
    components: { MainView },
    beforeCreate() {

    },
    created() {
      this.$socket.addEventListener('open', () => {
        console.log('connected to WS')
        this.$store.dispatch('init', this.$socket)
      })

    }
  }

</script>