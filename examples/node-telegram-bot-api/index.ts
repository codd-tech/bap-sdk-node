import * as TelegramBot from 'node-telegram-bot-api'
import { BAP } from '@codd-tech/bap-sdk-node'

// replace the value below with the BAP token you receive from https://publisher.socialjet.pro
const bap = new BAP('<bap_token>')

// We need to get access to update object, so we rewrite processUpdate method
const processUpdate = TelegramBot.prototype.processUpdate

TelegramBot.prototype.processUpdate = function (update: TelegramBot.Update) {
  if (bap.handleTelegramUpdates(update)) {
    processUpdate.apply(this, arguments)
  }
}

// replace the value below with the Telegram token you receive from @BotFather
const token = '<telegram_token>';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
