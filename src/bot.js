const { Telegraf, Scenes: { Stage }, session } = require('telegraf');
const { db } = require('./common/firebase');

const startScene = require('./scenes/start');
const addScene = require('./scenes/add');
const linksScene = require('./scenes/links');




const stage = new Stage([ addScene, startScene, linksScene ]);
stage.hears('Назад', ctx => ctx.scene.leave());


const bot = new Telegraf(process.env.TG_TOKEN);
bot.use(session())
bot.use( stage.middleware() );


bot.command('/start', ctx => ctx.scene.enter('startScene'));

bot.on('message', ctx => {
	const message = ctx.message.text;

	switch (message) {
		case 'Добавить ссылку':
			ctx.scene.enter('addScene');
			break;
		case 'Мои ссылки':
			ctx.scene.enter('linksScene');
			break;
		default:
			console.log(ctx.scene);
			break;
	}
})


// bot.command('/add', ctx => ctx.scene.enter('addScene'));


bot.launch();