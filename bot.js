'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TelegramBaseInlineQueryController = Telegram.TelegramBaseInlineQueryController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('190882556:AAH8RFZhev-niUIhXS9H6J2Yk-A9rNUAZhk')

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('pong')
    }

    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}

class BurnController extends TelegramBaseController {

    BurnHandler($) {
        var inputFile = {path : "./audio/burn.opus"}
        $.sendVoice(inputFile)
    }

    get routes() {
        return {'burnCommand': 'BurnHandler'}
    }
}

class OwController extends TelegramBaseController {

    owHandler($){
        var args = $.message.text.split(" ")
        var reps = parseInt(args[1])
        console.log(args[1])
        if (reps > 5){
            reps = 5
        }
        for (var j=0; j<reps; j++){
            console.log('loop')
            $.sendMessage(args[2]+'唔買overwatch要'+args[3])
        }
    }

    get routes() {
        return {'owCommand': 'owHandler'}
    }
}

class StartController extends TelegramBaseController {

    startHandler($){
        $.sendMessage("This is NDT Bot 1.0")
    }

    get routes() {
        return {'startCommand': 'startHandler'}
    }
}

class trollController extends TelegramBaseController{
    trollHandler($){
        var inputFile = {path : "./pic/troll3.jpg"}

        var replyParam = {
            "reply_markup":JSON.stringify({
                "inline_keyboard":[
                    [{"text":"Let's TROLL","callback_data":"Troll"},{"text":"NO TROLL","callback_data":"NoTroll"}],
                    [{"text":"BUY OVERWATCH NOW","url":"https://playoverwatch.com/zh-tw/buy/"}]
                ]
            })
        }

        $.sendPhoto(inputFile)
        $.sendMessage("Let's TROLLOLOLOLOL !", replyParam)
    }

    get routes() {
        return {'trollCommand': 'trollHandler'}
    }
}


class riceController extends TelegramBaseController{
    riceHandler($){
        var inputFile = {path : "./pic/troll2.jpg"}
        $.sendPhoto(inputFile)
        $.sendMessage("Let's TROLLOLOLOLOL !")
    }

    get routes() {
        return {'riceCommand': 'riceHandler'}
    }
}

class yoController extends TelegramBaseController{
    yoHandler($){
        var inputFile = {path : "./audio/YO.opus"}
        $.sendVoice(inputFile)
    }

    get routes() {
        return {'yoCommand': 'yoHandler'}
    }
}



class InlineModeController extends TelegramBaseInlineQueryController {
    handle($){

        const fs = require('fs');
        const contentFolder = './ndtbothosting/';
        var contentArray = []


        fs.readdir(contentFolder, (err, files) => {
            files.forEach(file => {
                if (file.includes('.opus'))
                    contentArray.push({
                        type : 'voice',
                        id : file.substr(0, file.length - 5),
                        voice_url : 'http://ndtbothosting.000webhostapp.com/'+encodeURI(file),
                        title : file.substr(0, file.length - 5)
                    })
                //else if (file.includes('jpg'))
                //    contentArray.push({
                //        type : 'photo',
                //        id : file.substr(0, file.length - 5),
                //        photo_url : 'http://ndtbothosting.000webhostapp.com/'+encodeURI(file),
                //        thumb_url : 'http://ndtbothosting.000webhostapp.com/'+encodeURI(file),
                //        title : file.substr(0, file.length - 5)
                //    })
            })

            console.log("the contents are ...")
            console.log(contentArray)
            $.answer(contentArray)
        })

        //contentArray.push({
        //    type : 'photo',
        //    id : Date()+'photo',
        //    photo_url : 'http://ndtbothosting.000webhostapp.com/chin.jpg',
        //    thumb_url : 'http://ndtbothosting.000webhostapp.com/chin.jpg',
        //    title : 'troll2'
        //})
        //
        //contentArray.push({
        //    type : 'voice',
        //    id : Date(),
        //    voice_url : 'http://ndtbothosting.000webhostapp.com/'+encodeURI("WTF.opus"),
        //    title : 'troll'
        //})
        //console.log(contentArray)
        //$.answer(contentArray)
    }

    chosenResult(result){
        console.log(result.location)
    }

}

tg.router
    .when(
        new TextCommand('ping', 'pingCommand'),
        new PingController()
    )
    .when(
        new TextCommand('/burn', 'burnCommand'),
        new BurnController()
    )
    .when(
        new TextCommand ('/ow', 'owCommand'),
        new OwController()
    )
    .when(
        new TextCommand ('/start', 'startCommand'),
        new StartController()
    )
    .when(
        new TextCommand ('/troll', 'trollCommand'),
        new trollController()
    )
    .when(
        new TextCommand ('/rice', 'riceCommand'),
        new riceController()
    ).when(
        new TextCommand ('/yo', 'yoCommand'),
        new yoController()
)

tg.router
    .inlineQuery(new InlineModeController())