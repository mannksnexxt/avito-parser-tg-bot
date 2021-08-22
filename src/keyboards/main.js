const { Markup } = require('telegraf');

const main_keyboard = (ctx) => {
	let keyboard = ['➕ Добавить ссылку'];

	if (ctx.session.links.length) {
		keyboard = ['🚀 Запустить', '➕ Добавить ссылку', '📔 Мои ссылки'];
	}

	return Markup.keyboard([keyboard]).resize();
}

module.exports = main_keyboard;