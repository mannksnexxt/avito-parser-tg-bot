const { Markup } = require('telegraf');

const run_keyboard = Markup.keyboard([
	['⏹ Остановить']
]).resize();

module.exports = run_keyboard;