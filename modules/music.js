const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

module.exports = async (url) => {

    const gethtml = async (url) => {
        const {data} = await axios.get(url);
        return cheerio.load(data);
    }

    const songName = 'Музыка нас связала (Dj Miv Remix)'

    const $ = await gethtml(url);

    const songs = $('.item');
    songs.each((idx, elem) =>{
        if($(elem).attr('data-title') === songName){

            const play = $(elem).find('.play');
            const downloadUrl = $(play).attr('data-url')
            console.log(downloadUrl)

            const response = axios({
                method: 'GET',
                url: downloadUrl,
                responseType: 'stream'
            })

            // response.data.pipe(fs.createWriteStream('./congratulations/newHappy15_4_8/music.mp3'))
            console.log(response.data)
        }
    })

}