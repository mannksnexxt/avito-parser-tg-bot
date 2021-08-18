const { Scenes: { BaseScene } } = require('telegraf');
const { db } = require('../common/firebase');

const main_keyboard = require('../keyboards/main');
const links_keyboard = require('../keyboards/links');


const linksScene = new BaseScene('linksScene');

linksScene.enter(async ctx => {
	const LINKS = ctx.session.links;
	
	if (LINKS?.length) {
		let message = '🗒 <b>Список Ваших ссылок:</b>\n\n';
		LINKS.forEach(link => {
			message += `🔗 <b><a href="${link.link}">${link.link_name}</a></b>\n`;
		})
		
		ctx.replyWithHTML(message, links_keyboard, { 
			disable_web_page_preview: true 
		});
	} else {
		ctx.replyWithHTML('🔸 <b>У вас пока что не ссылок.</b>');
		return ctx.scene.leave();
	}
	
});

const message = '◀️ <b>Возвращаемся...</b>'

linksScene.leave(ctx => ctx.replyWithHTML(message, main_keyboard));

module.exports = linksScene;