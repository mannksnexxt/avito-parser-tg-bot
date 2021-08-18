const { Markup } = require('telegraf');

const main_keyboard = Markup.keyboard([
	['Запустить', 'Добавить ссылку', 'Мои ссылки']
]).resize();

module.exports = main_keyboard;