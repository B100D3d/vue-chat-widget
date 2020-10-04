import { random, randomFromArray } from "@/utils/index"

const nicknames = [
    "Неизвестный Енот",
    "Неизвестный Мангуст",
    "Неизвестный Ёж",
    "Неизвестный Лис",
    "Неизвестный Крот",
    "Неизвестный Бурундук"
]

export const getRandomNickname = () =>
    randomFromArray(nicknames) + ` #${random(200)}`
