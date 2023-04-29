const fs = require('fs');
const axios = require('axios');

const TextToSpeech = require('../modules/textToSpeech')
const textToSpeech = new TextToSpeech('./data','./logs/textToSpeech.log', '')

const startList = {
    parse_mode: 'markdown',
    disable_web_page_preview: false,
    reply_markup: {
        inline_keyboard: [ 
            [ {text: `Музыка`, callback_data:'music'}],
            [ {text: `Речь`, callback_data:'textToSpeech'}],
            [ {text: `Речевой фон`, callback_data:'speechFon'}],
            
        ]
    }
}

const musicList= {
    chat_id: 'chatId',
    parse_mode: 'markdown',
    disable_web_page_preview: false,
    reply_markup: {
        inline_keyboard: [ 
            [ {text: `Загрузить музыку`, callback_data:'uploadMusic'}],
            [ {text: `Сгенерировать музыку`, callback_data:'generateMusic'}],
        ]
    }
}

const speechList= {
    parse_mode: 'markdown',
    disable_web_page_preview: false,
    reply_markup: {
        inline_keyboard: [ 
            [ {text: `Ручной ввод Поздравления`, callback_data:'uploadSpeech'}],
            [ {text: `Сгенерировать поздравление`, callback_data:'generateSpeech'}],
        ]
    }
}

const speechFonList= {
    parse_mode: 'markdown',
    disable_web_page_preview: false,
    reply_markup: {
        inline_keyboard: [ 
            [ {text: `Загрузин фоновый трек`, callback_data:'uploadFon'}],
            [ {text: `Сгенерировать фоновый трек`, callback_data:'generateFon'}],
        ]
    }
}

module.exports = class Admin{
    constructor(bot, token){
        this.bot = bot;
        this.token = token;
    }
    start(){
        this.bot.onText(/\/start/, msg => {
            // console.log(this.bot)
            this.bot.sendMessage(msg.chat.id, 'Добро пожаловать в конструктор поздравлений');
            this.bot.sendMessage(msg.chat.id, 'Выберите необходимое поле',startList);
        })
        
    }

    move(bot){
        bot.on('callback_query', function (msg) {
            if (msg.data == 'music'){
                bot.sendMessage(startList.chat_id, 'Выберите необходимое поле', musicList)
            }
            if (msg.data == 'uploadMusic'){
                (async () =>{
                    await bot.sendMessage(musicList.chat_id, 'Загрузите музыку в формате .mp3')
                    bot.on('message',async msg => {
                        if(msg.audio){
                            let url = `https://api.telegram.org/bot${this.token}/getFile?file_id=${msg.audio.file_id}`;
                            const getUrlDownload = async () =>{
                                return await axios.get(url)
                            }

                            const geti = await getUrlDownload()
                            const urlDownloadAudio = `https://api.telegram.org/file/bot${this.token}/${geti.data.result.file_path}`

                            const getUrlDownloadAudio = await axios({
                                method: "GET", 
                                url: urlDownloadAudio, 
                                responseType: 'stream' 
                            })
                            getUrlDownloadAudio.data.pipe(fs.createWriteStream('./data/music.mp3'))
                        }
                    })
                })();
            }
            if (msg.data == 'generateMusic'){
                // Тут будет стоять парсер
            }

            if (msg.data == 'textToSpeech'){
                bot.sendMessage(startList.chat_id, 'Выберите необходимое поле', speechList) 
            }
            if (msg.data == 'uploadSpeech'){
                bot.sendMessage(speechList.chat_id, 'Напишите поздравление в чат') 
                bot.onText(/\p{L}/u, msg =>{
                    (async () => {
                        const sendmes = () => {
                            return new Promise(res => {
                                textToSpeech.speech('voice','', msg.text)
                                res();
                            })
                        }
                        await sendmes()
                        setTimeout(async () => {
                            await bot.sendDocument(msg.chat.id, './data/voice.mp3')
                            bot.sendMessage(msg.chat.id, 'Аудео фаел сохранён')
                        }, 2000);
                    })();
                })
            }
            if (msg.data == 'generateSpeech'){

            }

            if (msg.data == 'speechFon'){
                bot.sendMessage(startList.chat_id, 'Напишите поздравление в чат', speechFonList) 
            }
            if (msg.data == 'uploadFon'){
                (async () =>{
                    await bot.sendMessage(musicList.chat_id, 'Загрузите музыку в формате .mp3')
                    bot.on('message',async msg => {
                        if(msg.audio){
                            let url = `https://api.telegram.org/bot${this.token}/getFile?file_id=${msg.audio.file_id}`;
                            const getUrlDownload = async () =>{
                                return await axios.get(url)
                            }

                            const geti = await getUrlDownload()
                            const urlDownloadAudio = `https://api.telegram.org/file/bot${this.token}/${geti.data.result.file_path}`

                            const getUrlDownloadAudio = await axios({
                                method: "GET", 
                                url: urlDownloadAudio, 
                                responseType: 'stream' 
                            })
                            getUrlDownloadAudio.data.pipe(fs.createWriteStream('./data/fon.mp3'))
                        }
                    })
                })();
            }
            if (msg.data == 'generateFon'){
                // Тут будет стоять парсер
            }

        })
    }
    update(){
        this.start();
        this.move(this.bot)
    }
}