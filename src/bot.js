const { Telegraf, Scenes: { Stage }, session } = require('telegraf');
const { db } = require('./common/firebase');

const startScene = require('./scenes/start');
const addScene = require('./scenes/add');
const linksScene = require('./scenes/links');
const removeScene = require('./scenes/remove');
const runScene = require('./scenes/run');


const stage = new Stage([ addScene, startScene, linksScene, removeScene, runScene ]);
stage.hears('⏪ Назад', ctx => {
	ctx.deleteMessage();
	return ctx.scene.leave();
});
stage.hears('⏹ Остановить', ctx => {
	ctx.deleteMessage();
	return ctx.scene.leave();
});


const bot = new Telegraf(process.env.TG_TOKEN);
bot.use(session())
bot.use( stage.middleware() );


bot.command('/start', ctx => ctx.scene.enter('startScene'));

bot.on('message', ctx => {
	const message = ctx.message.text;

	switch (message) {
		case '➕ Добавить ссылку':
			ctx.scene.enter('addScene');
			break;
		case '📔 Мои ссылки':
			ctx.scene.enter('linksScene');
			break;
		case '🚀 Запустить':
			ctx.scene.enter('runScene');
			break;
		default:
			ctx.deleteMessage();
			break;
	}
})

// https://www.avito.ru/moskva_i_mo/muzykalnye_instrumenty/gitary_i_strunnye-ASgBAgICAUTEAsYK?cd=1&s=104

bot.launch();