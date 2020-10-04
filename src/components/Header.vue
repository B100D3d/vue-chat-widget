<template>
    <div class="header">
        <span class="toggleShow" @click="toggleShow">&gt;</span>
        <span class="users">{{ usersCount }} online</span>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: {
        usersCount: {
            type: Number,
            required: true
        }
    },
    methods: {
        toggleShow() {
            this.$emit("toggleShow")
        }
    }
}
</script>

<style lang="sass" scoped>
.header
    width: 100%
    position: relative
    display: flex
    justify-content: center
    align-items: center
    padding: 10px
    background-color: #131111
    color: white

    .toggleShow
        position: absolute
        top: 50%
        left: 20px
        transform: translateY(-50%) rotate(-90deg)
        transition: transform 0.5s ease
        font-size: 26px
        cursor: pointer

    .users
        position: absolute
        top: 50%
        right: 20px
        transform: translateY(-50%)
        font-size: 16px

    &::after
        content: "Chat"
        font-size: 16px
        text-transform: uppercase
</style>
