const NOTIFICATION_SOUND_URL = "https://chat.devourer.ru/juntos.mp3"

const wsUrl =
    process.env.PRODUCTION === "true"
        ? "wss://chat.devourer.ru/ws"
        : "ws://localhost:3000"

export default class ChatService {
    ws = null
    notification = null
    onOpen = () => {}
    onClose = () => {}
    onUserConnected = () => {}
    onMessage = () => {}

    constructor() {
        this.notification = new Audio(NOTIFICATION_SOUND_URL)
        this.notification.muted = true
        this.wsConnect()
    }

    wsConnect() {
        this.ws = new WebSocket(wsUrl)

        this.ws.onopen = e => {
            console.log(e)
            this.onOpen()
        }

        this.ws.onclose = e => {
            if (!e.wasClean) {
                setTimeout(this.wsConnect, 2000)
            }
            this.onClose()
            console.log(e)
        }

        this.ws.onmessage = e => {
            try {
                const data = JSON.parse(e.data)
                if (data.type === "cu" && data.connectedUsers) {
                    this.onUserConnected(data.connectedUsers)
                } else if (
                    (data.type = "message" && data.message && data.nickname)
                ) {
                    this.onMessage(data.message, data.nickname)
                    this.notification?.play()
                }
            } catch (e) {
                console.log(e)
            }
        }

        this.ws.onerror = e => {
            console.log(e)
        }
    }

    send(data) {
        this.ws.send(JSON.stringify(data))
    }

    close() {
        this.ws.close()
    }
}
