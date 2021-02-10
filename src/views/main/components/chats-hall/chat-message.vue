<style scoped lang="scss">

  .message {
    @apply p-1 pl-3 bg-gray-100 w-1/2 m-1 mb-3;
    @apply text-left;
    @apply shadow;
    border-radius: 4px;
    transition: all .4s linear;
  }

  .is-mine {
    @apply bg-blue-100;
    @apply ml-auto mr-5;
  }

</style>

<template>

  <article class="message" :class="messageClasses">
    <p class="font- text-lg" v-html="message.message"></p>
    <p class="text-gray-600 text-right mr-5">{{ participant }}</p>
  </article>

</template>

<script>

  export default {
    name: 'chat-message',
    props: ['message'],
    computed: {
      messageClasses() {
        return {
          'is-mine': this.$store.state.user === this.message.participant
        }
      },
      participant() {
        return this.$store.state.user === this.message.participant ? 'me' : this.message.participant
      }
    }
  }

</script>
