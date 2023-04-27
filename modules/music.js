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
    async search(songName){
        var downloadUrl = null;
        const gethtml = async () => {
            const {data} = await axios.get(this.url);
            return cheerio.load(data);
        }    
        const $ = await gethtml(this.url);
        const songs = $('.item');

        songs.each(async (idx, elem) =>{
            if($(elem).attr('data-title') === songName){

                const play = $(elem).find('.play');
                downloadUrl = $(play).attr('data-url');
                
            }
        })
        return downloadUrl
    }
    async download(songName){

        const response = await axios({
            method: 'GET',
            url: await this.search(songName),
            responseType: 'stream'
        })

        response.data.pipe(fs.createWriteStream(this.dir + '/' + 'music.mp3'))

    }
    delete(songName){
        fs.unlink(songName);
    }
}

// module.exports = async (url) => {

//     const gethtml = async (url) => {
//         const {data} = await axios.get(url);
//         return cheerio.load(data);
//     }

//     const songName = 'Музыка нас связала (Dj Miv Remix)'

//     const $ = await gethtml(url);

//     const songs = $('.item');
//     songs.each(async (idx, elem) =>{
//         if($(elem).attr('data-title') === songName){

//             const play = $(elem).find('.play');
//             const downloadUrl = $(play).attr('data-url')
//             console.log(downloadUrl)

//             const response = await axios({
//                 method: 'GET',
//                 url: downloadUrl,
//                 responseType: 'stream'
//             })

//             response.data.pipe(fs.createWriteStream('./congratulations/music.mp3'))
//         }
//     })

// }