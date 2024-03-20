const TelegramBot = require("node-telegram-bot-api")

const token = "7053374771:AAFcuMeYkyPf6FzUiocVzfvkso-OHvq9T70"
const options = {
    polling: true
}

const khanbot = new TelegramBot(token, options)

const prefix = "."
const sayHi = new RegExp(`^${prefix}halo$`)
const eathquake = new RegExp(`^${prefix}gempa$`)

khanbot.onText(sayHi, (callback) => {
    khanbot.sendMessage(callback.from.id, "Halo juga!")
})

khanbot.onText(eathquake, async (callback) => {
    const EARTHQUAKE_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(EARTHQUAKE_ENDPOINT + "autogempa.json")
    const {
        Infogempa: {
            gempa: {
                Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
            }
        } 
    } = await apiCall.json()

    const earthQuakeImage = EARTHQUAKE_ENDPOINT + Shakemap

    const result = `
Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude} SR
Wilayah: ${Wilayah}
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}
`

    khanbot.sendPhoto(callback.from.id, earthQuakeImage, {
        caption: result
    })

})