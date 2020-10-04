import Vue from "vue"
import App from "./App.vue"

Vue.config.productionTip = false

const chat = document.createElement("div")
chat.id = "chat"
document.body.appendChild(chat)

new Vue({
    render: h => h(App)
}).$mount("#chat")
