let puppeteer;
let chrome={}
async function startBrowser(){
	let browser;
	try {
		var options={}
		if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
			chrome=require("chrome-aws-lambda");
			puppeteer= require("puppeteer-core")
		}else{
			let puppeteer = require('puppeteer');
		}
		if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
			options={
				args:[...chrome.args,"hide-scrollbars","--disable-web-security"],
				defaultViewport: chrome.defaultViewport,
				executablePath: await chrome.executablePath,
				headless:true,
				ignoreHTTPSErrors:true,
			}
		}else{
			options = {
				headless: true,
				args: ["--disable-setuid-sandbox"],
				'ignoreHTTPSErrors': true
			}
		}
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch(options);
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};