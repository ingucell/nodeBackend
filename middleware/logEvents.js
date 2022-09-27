const {format} = require('date-fns');
const { v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const express = require('express')
const app = express()


const logEvents = async(mssg, logname)=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${mssg}\n`;
    console.log(logItem);

     
    try{
            if(!fs.existsSync(path.join(__dirname,'..' ,'logs'))){
                await fsPromises.mkdir(path.join(__dirname, '..' ,'logs'))
            }
            await fsPromises.appendFile(path.join(__dirname,'..', 'logs', logname), logItem)
    }catch(err){
       console.log(err);
    }
}


const logger = app.use((req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next(); 
})

module.exports = {logger, logEvents};