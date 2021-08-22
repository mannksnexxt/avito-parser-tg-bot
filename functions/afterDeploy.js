const bot = require('../src/bot');

exports.handler = async (event, context) => {
	bot.launch();
}