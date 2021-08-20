const { Scenes: { BaseScene } } = require('telegraf');
const { db } = require('../common/firebase');

const main_keyboard = require('../keyboards/main');
const links_keyboard = require('../keyboards/links');
const back_keyboard = require('../keyboards/back');

let replyMessage, keyboard;

const linksScene = new BaseScene('linksScene');

linksScene.enter(async ctx => {
	const LINKS = ctx.session.links;
	replyMessage = '◀️ <b>Возвращаемся...</b>';
	keyboard = main_keyboard(ctx);
	
	if (LINKS?.length) {
		let message = '🗒 <b>Список Ваших ссылок:</b>\n\n';
		LINKS.forEach(link => {
			message += `🔗 <b><a href="${link.link}">${link.link_name}</a></b>\n`;
		})
		
		ctx.replyWithHTML(message, { 
			reply_markup: {
				keyboard: [
					['Назад', 'Удалить ссылку']
				],
				resize_keyboard: true
			},
			disable_web_page_preview: true 
		});
	} else {
		ctx.replyWithHTML('🔸 <b>У вас пока что не ссылок.</b>');
		return ctx.scene.leave();
	}
	
});

linksScene.on('message', ctx => {
	const message = ctx.message.text;
	
	if (message === 'Удалить ссылку') {
		replyMessage = '⏩ <b>Идем дальше...</b>';
		keyboard = back_keyboard;

		ctx.scene.enter('removeScene');
	}
})

linksScene.leave(ctx => ctx.replyWithHTML(replyMessage, keyboard));

module.exports = linksScene;