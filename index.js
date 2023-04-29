const gtts = require('node-gtts')('ru');
const color = require('colors');
const fs = require('fs');
const path = require('path');
const telegram_bot = require('node-telegram-bot-api');

var Admin = require('./bot/index')

var Music = require('./modules/music')
var Dir = require('./modules/Dir')
var TextToSpeech = require('./modules/textToSpeech')

const setting = JSON.parse(fs.readFileSync('./settings.json'));

const {congratulations, logs, data} = setting.direction;
const {link} = setting.site;

var now = new Date();
const dirHappy = new Dir(congratulations, now, `${logs}/createDir.log`)
const music = new Music(congratulations, link[0],`${logs}/music.log`)
const textToSpeech = new TextToSpeech(congratulations,`./${logs}/textToSpeech.log`, now) 

// textToSpeech.speech('bro','', 'Выеби себя в жопу')


// sendmes().then(()=>{
//     return console.log('Привет')
// })


const bot = new telegram_bot(setting.telegram.token, {polling: true });

const admin = new Admin(bot, setting.telegram.token)

admin.update(bot);

console.log(color.green('Бот, запущен'));

// music.download('Музыка нас связала (Dj Miv Remix)')

