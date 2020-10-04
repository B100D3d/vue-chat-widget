<template>
    <div class="inputContainer">
        <input ref="input" type="text" placeholder="Сообщение" v-model="text" />
        <button @click="onClick" />
    </div>
</template>

<script>
export default {
    name: "Inputs",
    data: () => ({
        text: ""
    }),
    mounted() {
        this.$refs.input.addEventListener("keypress", this.handleEnter)
    },
    beforeDestroy() {
        this.$refs.input.removeEventListener("keypress", this.handleEnter)
    },
    methods: {
        onClick() {
            const message = this.text.trim()
            if (message) {
                this.$emit("send", message)
                this.text = ""
                this.$refs.input.focus()
            }
        },
        handleEnter(e) {
            if (e.key === "Enter") this.onClick()
        }
    }
}
</script>

<style lang="sass" scoped>
.inputContainer
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    background-color: #131111

    input
        padding: 10px 10px
        font-size: 20px
        flex: 1
        border: none
        background-color: transparent
        color: white

        &:focus
            outline: none

    button
        background-color: transparent
        display: flex
        justify-content: center
        align-items: center
        border: none
        padding: 0 20px
        height: 100%
        cursor: pointer

        &:focus
            outline: none

        &::after
            content: ">"
            color: blueviolet
            font-size: 26px
            font-weight: bold
</style>
