const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance,page,search,store,cat){
	let browser;
	try{
		browser = await browserInstance;
		return await pageScraper.scraper(browser,page,search,store,cat);	
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance,page,search,store,cat) => scrapeAll(browserInstance,page,search,store,cat)