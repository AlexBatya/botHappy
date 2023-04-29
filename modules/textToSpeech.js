const fs = require('fs');
const path = require('path');
const gtts = require('node-gtts')('ru');
const color = require('colors');

module.exports = class TextToSpeech{
    constructor(dir,log, now){
        this.dir = dir;
        this.log = log;
        this.now = now;
    }
    search(){

    }
    speech(name, link, congratulations){
        try{
            
            var filepath = path.join(__dirname, `../${this.dir}/${name}.mp3`);
            
            gtts.save(filepath, congratulations, () => {
                console.log('Создание трека поздравления выполнено ' + color.green('УСПЕШНО'));
                fs.appendFileSync(this.log, '\n Создание трека поздравления выполнено ' + color.green('УСПЕШНО'));
                // res(`./${this.dir}/${name}.mp3`)
            })
            

        }
        catch(err){
            fs.appendFileSync(this.log, `\n ${this.now} Создание трека поздравления выполнено ` + color.red('БЕЗУСПЕШНО') + '\n');
            fs.appendFileSync(this.log, `\n ${err} `)
        }
    }
}
