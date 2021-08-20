const axios = require('axios');
const cheerio = require('cheerio');


const getLastItemFromAvitoPage = async (url) => {
	const htmlPage = await axios.get(url);
	
	const $ = cheerio.load(htmlPage.data);
	const infoItem = $('.js-initial');
	
	const infoString = infoItem.attr('data-state');
	let parsedData = null;

	if (infoString) {
		parsedData = JSON.parse(infoString);
	}
	
	if (parsedData) {
		const desiredElement = parsedData.catalog.items[1];

		return {
			id: desiredElement.id,
			url: 'https://www.avito.ru' + desiredElement.urlPath,
			title: desiredElement.title,
			price: desiredElement.priceDetailed.fullString,
			imageUrl: desiredElement.images[0]['432x324']
		};
	}
	return false;
	
}


module.exports = getLastItemFromAvitoPage;