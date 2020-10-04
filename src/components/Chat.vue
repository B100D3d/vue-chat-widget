<template>
    <ul class="chatList">
        <li
            v-for="(message, index) of reversedMessages"
            :key="message.text + index"
            :class="[
                message.type,
                { error: message.error, right: message.own }
            ]"
        >
            <span>{{ message.text }}</span>
            <span class="nickname">{{ message.nickname }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Chat",
    props: {
        messages: {
            type: Array,
            required: true
        }
    },
    computed: {
        reversedMessages: vm => vm.messages.slice().reverse()
    }
}
</script>

<style lang="sass" scoped>
.chatList
    flex: 1
    width: 100%
    display: flex
    flex-direction: column-reverse
    align-items: flex-start
    list-style: none
    padding: 0 10px 10px
    margin: 0
    overflow-y: auto
    color: white

    .message
        position: relative
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: flex-start
        padding: 10px 20px 10px 10px
        max-width: 70%
        border-radius: 5px 30px 30px 5px
        background-color: #242323
        margin-top: 10px

        span
            font-size: 16px
            word-break: break-word

        .nickname
            left: 0
            top: -5px
            color: aqua
            font-size: 12px
            word-break: break-word

        &.right
            align-self: flex-end
            border-radius: 30px 5px 5px 30px
            padding: 10px 10px 10px 20px

    .connection
        align-self: center
        border-radius: 30px
        display: flex
        justify-content: center
        align-items: center
        max-height: 80%
        font-size: 14px
        padding: 5px 10px
        margin-top: 10px
        background-color: rgba(61, 15, 226, 0.5)

        &.error
            background-color: rgba(167, 18, 18, 0.5)
</style>
