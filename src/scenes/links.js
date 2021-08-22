const { Scenes: { BaseScene } } = require('telegraf');

const main_keyboard = require('../keyboards/main');
const links_keyboard = require('../keyboards/links');
const back_keyboard = require('../keyboards/back');

let replyMessage, keyboard;

const linksScene = new BaseScene('linksScene');

linksScene.enter(async ctx => {
	await ctx.deleteMessage();
	const LINKS = ctx.session.links;
	replyMessage = '◀️ <b>Возвращаемся...</b>';
	keyboard = main_keyboard(ctx);
	
	if (LINKS?.length) {
		let message = '🗒 <b>Список Ваших ссылок:</b>\n\n';
		LINKS.forEach(link => {
			message += `🔗 <b><a href="${link.link}">${link.link_name}</a></b>\n`;
		})
		
		await ctx.replyWithHTML(message, { 
			reply_markup: {
				keyboard: links_keyboard,
				resize_keyboard: true
			},
			disable_web_page_preview: true 
		});
	} else {
		await ctx.replyWithHTML('🔸 <b>У вас пока что не ссылок.</b>');
		return ctx.scene.leave();
	}
	
});

linksScene.on('message', ctx => {
	const message = ctx.message.text;
	
	if (message === '🗑 Удалить ссылку') {
		replyMessage = '⏩ <b>Идем дальше...</b>';
		keyboard = back_keyboard;

		ctx.scene.enter('removeScene');
	}
})

linksScene.leave(ctx => ctx.replyWithHTML(replyMessage, keyboard));

module.exports = linksScene;