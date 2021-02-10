<style scoped lang="scss">

</style>

<template>

  <section>

    <header class="text-left text-2xl pl-24">Howdy, <span class="text-blue-500 font-medium text-3xl">{{ $store.state.user }}</span></header>

    <div class="flex mt-10">
      <chat-list />
      <chat v-if="$store.state.activeChat.id"/>
    </div>

  </section>

</template>

<script>

  import ChatList from '@/views/main/components/chats-hall/chat-list.vue'
  import Chat from '@/views/main/components/chats-hall/chat.vue'
  export default {
    name: 'chats-hall-main',
    components: { ChatList, Chat },
    created() {
      this.$store.dispatch('userLogin')
    }
  }

</script>
