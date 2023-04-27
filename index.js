const telegram_bot = require('node-telegram-bot-api');
const color = require('colors');
const fs = require('fs');
const path = require('path');

// const Dir = require('./modules/Dir')

const Music = require('./modules/music')
const music = new Music('./congratulations', 'https://ru2.hitmo.top/genres/6988','./logs/music.log')
music.download('Музыка нас связала (Dj Miv Remix)')

// var now = new Date();
// const dir =  './congratulations' 
// const logs = './logs'

// const token = '6136624084:AAHIPfxnxhyVab0pMcnUSQtUqeBmBUeSQVg';

// const bot = new telegram_bot(token, {polling: true });


// const dirHappy = new Dir(dir,now,'./logs/createDir.log')
// dirHappy.creat();


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