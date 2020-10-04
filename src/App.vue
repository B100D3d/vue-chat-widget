<template>
    <div id="chat" class="show">
        <Header :users-count="usersCount" @toggleShow="toggleShow" />
        <Chat :messages="messages" />
        <Inputs @send="sendMessage" />
    </div>
</template>

<script>
import Header from "@/components/Header"
import Chat from "@/components/Chat"
import Inputs from "@/components/Inputs"
import ChatService from "@/services/ChatService"
import { getRandomNickname } from "@/utils/nicknames"

export default {
    name: "App",
    components: {
        Header,
        Chat,
        Inputs
    },
    mounted() {
        const chatService = new ChatService()

        chatService.onOpen = () => {
            this.messages.push({
                type: "connection",
                text: "You successfully connected to the chat."
            })
        }

        chatService.onClose = () => {
            this.messages.push({
                type: "connection",
                text: "Connection error.",
                error: true
            })
        }

        chatService.onUserConnected = usersCount => {
            this.usersCount = usersCount
        }

        chatService.onMessage = (message, nickname) => {
            this.messages.push({
                type: "message",
                text: message,
                nickname
            })
        }
        this.chatService = chatService
    },
    beforeDestroy() {
        this.chatService.close()
    },
    data: () => ({
        nickname: getRandomNickname(),
        messages: [],
        usersCount: 0,
        chatService: null
    }),
    methods: {
        sendMessage(message) {
            this.messages.push({
                type: "message",
                text: message,
                nickname: this.nickname,
                own: true
            })
            this.chatService.send({
                message,
                nickname: this.nickname
            })
        },
        toggleShow() {
            this.$el.classList.toggle("show")
        }
    }
}
</script>

<style lang="sass">
#chat
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    position: fixed
    bottom: 0
    right: 0
    width: 100%
    height: 60vh
    background-color: #151414
    border-radius: 5px 5px 0 0
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    box-sizing: border-box
    transform: translateY(90%)
    transition: transform 1s ease
    overflow: hidden

    *
        box-sizing: border-box

    &.show
        transform: translateY(0)

        .header .toggleShow
            transform: translateY(-50%) rotate(90deg)

    @media all and (min-width: 768px)
        width: 40vw
        border-radius: 5px 0 0 0

    *, *::before, *::after
        scrollbar-width: thin
        scrollbar-color: #29B6F630 transparent

    *
        &::-webkit-scrollbar
            height: 5px
            width: 5px
            background-color: transparent

        &::-webkit-scrollbar-corner
            background-color: transparent

        &::-webkit-scrollbar-thumb
            background-color: #29B6F630
            border-radius: 20px
</style>
