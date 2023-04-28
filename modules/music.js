const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

module.exports = class Music{
    constructor(dir, url, log){
        this.dir = dir;
        this.url = url;
        this.log = log;
    }
    nameProcessing(){

    }

    async request() {

    }

    async search(songName){
        const look = await axios({
            url: 'https://mc.yandex.ru/clmap/92982614?page-url=https%3A%2F%2Fru2.hitmo.top%2Fgenres%2F6988&pointer-click=rn%3A315742116%3Ax%3A28535%3Ay%3A23210%3At%3A43%3Ap%3APFA1A%7F%3AX%3A658%3AY%3A43&browser-info=u%3A1682589274853912465%3Av%3A1030%3Avf%3A10ym9geic8i73flogxj2lsv%3Arqnl%3A1%3Ast%3A1682653455&t=gdpr(14)ti(0)&force-urlencoded=1',
            headers: songName,
            data: 'GET'
        })

        // var downloadUrl = null;
        console.log(look.headers['content-type']) 
        const gethtml = async () => {
            const {data} = await axios.get(this.url);
            return cheerio.load(data);
        }    
        const $ = await gethtml(this.url);
        console.log($('.search-bar__input').text());

        // const songs = $('.item');

        // const genre = $('li.widget_itemLink');
        // downloadUrl = genre.text();
        // songs.each(async (idx, elem) =>{
        //     if($(elem).attr('data-title') === songName){

        //         const play = $(elem).find('.play');
        //         downloadUrl = $(play).attr('data-url');
                
        //     }
        // })
        // return downloadUrl
    }

    async download(songName){

        await this.search(songName)

        // const response = await axios({
        //     method: 'GET',
        //     url: await this.search(songName),
        //     responseType: 'stream'
        // })

        // response.data.pipe(fs.createWriteStream(this.dir + '/' + 'music.mp3'))

    }

    delete(songName){
        fs.unlink(songName);
    }
}
