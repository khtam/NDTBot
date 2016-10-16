'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
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



    get routes() {
        return {'burnCommand': 'BurnHandler'}
    }
}

tg.router
    .when(
        new TextCommand('ping', 'pingCommand'),
        new PingController()
    )
    .when(new TextCommand('/burn', 'burnCommand'),
        new BurnController()
    )