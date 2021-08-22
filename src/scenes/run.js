const { Scenes: { BaseScene } } = require('telegraf');
const getLastItemFromAvitoPage = require('../common/api')

const main_keyboard = require('../keyboards/main');
const run_keyboard = require('../keyboards/run');


const runScene = new BaseScene('runScene');

runScene.enter(async ctx => {
	const LINKS = ctx.session.links;
	let dataFromPrevRequests = [];

	if (LINKS.length) {
		ctx.deleteMessage();
		ctx.session.TIMER = setInterval(async () => {
			LINKS.forEach( async link => {
				const lastItemData = await getLastItemFromAvitoPage(link.link)
				if (lastItemData) {
					const prevItemData = dataFromPrevRequests.find(prevData => {
						return prevData.key === link.link_name;
					})
					
					if (!prevItemData) {
						dataFromPrevRequests.push({
							key: link.link_name,
							currentId: lastItemData.id
						})
					} else {
						if (prevItemData.currentId !== lastItemData.id) {
							const message = `
							🔎 <b>${link.link_name}</b>\n<a href="${lastItemData.url}">${lastItemData.title}</a> : <b>${lastItemData.price}</b>`

							await ctx.replyWithPhoto({ url: lastItemData.imageUrl }, { caption: message, parse_mode: 'HTML' });

							prevItemData.currentId = lastItemData.id;
						}
					}
				}
			})
			
			const stamp = new Date();
			console.log(`- Request from ${ctx.chat.first_name} | ${stamp.getHours()} : ${stamp.getMinutes()}`);
			
		}, 15000)


		ctx.replyWithHTML('🚀 <b>Детектор запущен!</b> 🚀', run_keyboard);
	}
	
});


runScene.leave(ctx => {
	clearInterval(ctx.session.TIMER);
	ctx.session.TIMER = null;
	return ctx.replyWithHTML('⏹ <b>Детектор остановлен!</b>', main_keyboard(ctx));
});

module.exports = runScene;