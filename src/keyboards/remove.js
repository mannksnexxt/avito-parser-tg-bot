const { Markup } = require('telegraf');

const remove_keyboard = (links) => {
	let keyboard = [];
	links.forEach((link, key) => {
		keyboard.push([Markup.button.callback(`🔗 ${link.link_name}`, `remove_${key}`)]);
	})

	return Markup.inlineKeyboard(keyboard);
};


module.exports = remove_keyboard;