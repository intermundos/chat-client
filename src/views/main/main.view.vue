<style scoped lang="scss">

</style>

<template>

  <main class="p-5">
    <user-component v-if="!$store.state.user"/>
    <div v-else class="text-center">
      <chats-hall-main />
    </div>
  </main>

</template>

<script>

  import UserComponent from '@/components/user.component.vue'
  import ChatsHallMain from '@/views/main/components/chats-hall/chats-hall.main.vue'

  export default {
    name: 'main-view',
    components: { ChatsHallMain, UserComponent }
  }

</script>