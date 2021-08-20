const { Markup } = require('telegraf');

const back_keyboard = Markup.keyboard([
	['⏪ Назад']
]).resize();

module.exports = back_keyboard;