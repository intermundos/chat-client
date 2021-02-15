<style scoped lang="scss">

  .chat {
    min-height: 500px;
    min-width: 500px;
    max-width: 700px;
    @apply w-1/2 p-1 pb-1 mr-5 shadow relative;
    @apply flex flex-col;
  }

  .char-area {
    max-height: 400px;
  }

  .emoji-select {
    @apply absolute;
    @apply bg-white;
    @apply p-2;
    @apply shadow;
    width: 200px;
    height: 35px;
    top: -35px;
    left: 0;
  }

</style>

<template>

  <section class="chat">

    <header class="uppercase font-light text-blue-500 bg-gray-200 py-2 font-medium">Chat {{ chat.name }}</header>

    <div class="flex flex-grow">

      <div class="char-area w-full overflow-y-scroll bg-gray-50" ref="chatArea">

        <template v-for="message in messages" :key="message.ts">

          <chat-message :message="message" />

        </template>

      </div>

    </div>

    <div class="h-14 flex relative border-t-2 border-blue-300">

      <div class="w-16 flex flex-col items-center justify-center">

        <p class="text-2xl hover:text-pink-500 cursor-pointer" :class="[ emojiSelect && 'text-pink-500' ]"
           @click="emojiSelect = !emojiSelect"
        >
          😀
        </p>

        <div v-show="emojiSelect" class="emoji-select">
            <span v-for="emo in emoji"
                  v-html="emo"
                  class="cursor-pointer m-1"
                  @click="insertEmoji(emo)"
            ></span>
        </div>


      </div>

      <textarea v-model="chatMessage"
                ref="textArea"
                name="chat"
                class="w-full h-full pl-1 pt-1 border-gray-200 border"
                @keypress.enter="sendMessage"
      />

      <button @click="sendMessage"
              :disabled="!chatMessage"
              class="w-24 bg-green-400 text-white uppercase text-sm"
      >
        Send
      </button>

    </div>

  </section>

</template>

<script>

  import ChatMessage from '@/views/main/components/chats-hall/chat-message.vue'

  export default {
    name:       'chat',
    components: { ChatMessage },
    data() {
      return {
        chatMessage: '',
        emoji: [ '🤩', '😄', '😱', '👻', '👍', '🙏'],
        emojiSelect: false
      }
    },
    computed:   {
      chat() {
        return this.$store.state.activeChat
      },
      messages() {
        return this.$store.state.activeChat.messages
      }
    },
    methods:    {
      async sendMessage() {
        if (this.chatMessage) {
          await this.$store.dispatch('sendMessage', this.chatMessage)
          this.chatMessage = ''
          this.scrollBottom()
        }
      },
      scrollBottom() {
        if (this.$refs && this.$refs.chatArea) {
          this.$refs.chatArea.scrollTo({ left: 0, top: this.$refs.chatArea.scrollHeight + 500, behavior: 'smooth' })
        }
      },
      handleScroll({ data }) {
        let { event } = JSON.parse(data)
        if (event === 'chat.message') {
          this.scrollBottom()
        }
      },
      insertEmoji(emoji) {
        console.log('emoji', emoji)
        this.chatMessage = `${this.chatMessage} ${emoji} `
        this.$refs.textArea.focus()
        this.emojiSelect = false
      }
    },
    created() {
      this.$socket.addEventListener('message', this.handleScroll)
    },

  }

</script>
