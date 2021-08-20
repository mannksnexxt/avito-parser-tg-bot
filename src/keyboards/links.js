const { Markup } = require('telegraf');

const links_keyboard = Markup.keyboard([
	['⏪ Назад', '🗑 Удалить ссылку']
]).resize();

module.exports = links_keyboard;