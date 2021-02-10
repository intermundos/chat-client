<style scoped lang="scss">

</style>

<template>

  <section>

    <h1 class="text-lg uppercase font-medium">Welcome</h1>

    <p class="mb-3">Please enter your name to continue</p>

    <input v-model="userName"
           type="text"
           placeholder="Type here..."
           class="border p-1"
    />

    <div class="mt-3">
      <button @click="setUser" class="px-3 py-1 bg-green-300">Continue</button>
    </div>

  </section>

</template>

<script>
  import { ref }      from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'user-component',
    setup() {

      const store = useStore()
      const userName = ref('')

      return {
        userName,
        setUser: () => {
          store.commit('setUser', userName.value)
        }

      }
    }
  }

</script>
