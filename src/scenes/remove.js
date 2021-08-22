const { Scenes: { BaseScene } } = require('telegraf');
const { db } = require('../common/firebase');

const main_keyboard = require('../keyboards/main');
const remove_keyboard = require('../keyboards/remove');


const removeScene = new BaseScene('removeScene');

removeScene.enter(async ctx => {
	await ctx.deleteMessage();
	ctx.reply('📲 Нажмите на категорию, которую хотите удалить 📲', remove_keyboard(ctx.session.links));
});

removeScene.on('callback_query', async ctx => {
	const link = ctx.callbackQuery.data;
	const linkIndex = Number( link.split('_')[1] );
	const userId = String(ctx.from.id);

	ctx.session.links.splice( linkIndex, 1);
	await db.ref(`users/${userId}/links`).set(ctx.session.links);
	
	await ctx.answerCbQuery('✅ Ссылка успешно удалена!');
	if (!ctx.session.links.length) {
		await ctx.editMessageText('🔗 Ссылок больше не осталось 🔗');
		return ctx.scene.leave();
	}
	return ctx.editMessageText('📲 Нажмите на категорию, которую хотите удалить 📲', remove_keyboard(ctx.session.links));
	
})





const message = '◀️ <b>Возвращаемся...</b>'

removeScene.leave(ctx => ctx.replyWithHTML(message, main_keyboard(ctx)));

module.exports = removeScene;