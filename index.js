const telegram_bot = require('node-telegram-bot-api');
const color = require('colors');
const fs = require('fs');
const path = require('path');

var Music = require('./modules/music')
const Dir = require('./modules/Dir')

const setting = JSON.parse(fs.readFileSync('./settings.json'));

const {congratulations, logs, data} = setting.direction;
const {link} = setting.site;

const dirHappy = new Dir(congratulations, now, `${logs}/createDir.log`)
var now = new Date();
const music = new Music(congratulations, link[0],`${logs}/music.log`)

music.download('Музыка нас связала (Dj Miv Remix)')


const bot = new telegram_bot(setting.telegram.token, {polling: true });


// bot.onText(/\/start/, msg =>{
//     const {id: id, first_name: userName} = msg.chat;
//     const newDir = dir + '/' + 'newSpeech' + `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
//     fs.mkdirSync(newDir);
//     const readDir = fs.readdirSync(dir)
//     for(let i = 0; i > readDir.length; i++){
//         if(readDir[i] === path.basename(newDir)){
//             bot.sendMessage(id, `Папка успешно создана в ${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`)
//         }
//         else{
//             bot.sendMessage(id, `Папка не создана`);
//         }
//     }
// })


console.log(color.green('бот запущен'));