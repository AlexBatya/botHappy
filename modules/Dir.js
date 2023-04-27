const fs = require('fs');
const path = require('path');

module.exports = class Dir{
    constructor(dir, now, log){
        this.dir = dir;
        this.now = now;
        this.log = log;
    }
    check(dirName){
        const filesOfDir = fs.readdirSync(this.dir);
        const ifes = (elem) => {
            
        }
        try{
            filesOfDir.filter(elem => {
                if(path.basename(elem) === dirName){
                    fs.appendFileSync(this.log, this.now + ' ' + 'Такая директория уже есть:' + ' ' + dirName)
                    fs.appendFileSync(this.log, '\n Такой фаел будет удалён \n')
                    this.delete(this.dir + '/' + elem) 
                }
            })
            console.log('Такого файла ещё нет');
            return true;
        }
        catch (err){
            fs.appendFileSync(this.log, this.now + ' ' + 'Ошибка связанна с проверкой НАЛИЧИЕМ директории в папке с поздравлениями' + '\n');
            fs.appendFileSync(this.log, err);
        }
    }
    creat(){
        var dirName = `newHappy${this.now.getHours()}_${this.now.getMinutes()}_${this.now.getSeconds()}`
        try{
            if(this.check(dirName)){
                fs.mkdirSync(this.dir + '/' + dirName); 
                setInterval(()=>{
                    this.delete(this.dir + '/' + dirName);
                },60*1000)
            }

            else{
                fs.appendFileSync(this.log, this.now +  ' ', 'Не возможно создать фаел')
            }
        }
        catch (err){
            fs.appendFileSync(this.log, this.now + ' ' + 'Ошибка связанна с СОЗДАНИЕМ директории' + '\n');
            fs.appendFileSync(this.log, err);
        }
        

    }
    delete(dirName){
        try{
            fs.rmdirSync(dirName);
        }
        catch (err){
            fs.appendFileSync(this.log, this.now + ' ' + 'Ошибка связанна с УДАЛЕНИЕМ директории' + '\n');
            fs.appendFileSync(this.log, err);
        }
    }
}

