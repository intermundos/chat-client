<style scoped lang="scss">

  .chat-list {
    min-height: 300px;
    width: 300px;
    @apply p-1 mr-5 shadow relative;
    @apply flex flex-col;
  }

  .chat-create {
    @apply w-full h-full top-0 bg-white;
    @apply flex flex-col items-center justify-center;
  }

  .create-chat-btn {
    @apply px-3 py-2 mt-1 bg-green-400 text-white uppercase text-sm;

    &:hover {

    }

    &:disabled {
      @apply bg-gray-200;
    }
  }

</style>

<template>

  <section class="chat-list">

    <h1 class="uppercase font-light text-blue-500 bg-gray-200 py-2 font-medium">Chat list</h1>

    <div class="bg-gray-50 flex-grow flex-1">

      <p v-if="Object.keys(chats).length < 1" class="h-full flex items-center justify-center">
        No chats :(
        <br>
      </p>

      <ul v-else>

        <li v-for="chat in chats"
            :key="chat.id"
            class="py-1 bg-blue-500 mb-1 text-white shadow hover:bg-blue-400 cursor-pointer"
            @click="joinChat(chat)"
        >
          {{ chat.name }}
        </li>

      </ul>

    </div>

    <div class="flex items-center justify-center h-14">
      <button @click="createActive = true"
              class="px-3 py-1 bg-green-400 text-white uppercase text-sm"
      >
        + Create chat
      </button>
    </div>

    <section class="chat-create absolute" v-if="createActive">

      <span @click="createActive = false"
            class="absolute top-0 right-0 mt-1 mr-1 text-pink-500 cursor-pointer">
        X
      </span>

      <div class="flex flex-col">

        <label for="chat.name" class="text-blue-500 uppercase text-lg mb-1">Enter chat name</label>
        <input v-model="chatNameCreate" id="chat.name"
               type="text"
               placeholder="Enter chat name"
               class="border border-blue-50 py-1 text-center" />

        <button @click="createChat"
                :disabled="!chatNameCreate"
                class="create-chat-btn"
        >
          Create
        </button>

      </div>

    </section>

  </section>

</template>

<script>

  export default {
    name:     'chat-list',
    data() {
      return {
        createActive: false,
        chatNameCreate: ''
      }
    },
    computed: {
      chats() {
        return this.$store.state.chats
      }
    },
    methods:  {
      createChat() {

        const chat = {
          name: this.chatNameCreate,
          id: new Date().getTime()
        }

        this.$store.dispatch('createChat', chat)

        this.createActive = false
        this.chatNameCreate = ''
      },
      joinChat(chat) {
        this.$store.dispatch('joinChat', chat)
      },
    },

  }

</script>
