const scrollToBottom = require("scroll-to-bottomjs");
const wait = async (page) => {
	await page.waitForTimeout(5000)
	await page.evaluate(scrollToBottom);
	await page.waitForTimeout(5000)
}
const scraperBuscape= async(page)=>{
	await page.waitForSelector('#__next > div.Content_Container__heIrp.container-lg > div > div.col-lg-9 > div.Hits_Wrapper__3q_7P');
	await wait(page)
	let data = await page.$$eval('.Paper_Paper__HIHv0.Paper_Paper__bordered__iuU_5.Card_Card__LsorJ.Card_Card__clicable__5y__P.SearchCard_ProductCard__1D3ve',(elements)=>elements.map((e)=>{
		const url="https://www.buscape.com.br/"
		return {
		nombre:e.querySelector('div.SearchCard_ProductCard_Body__2wM_H  div div div h2').innerText,
		link:e.querySelector('a').href,
		img: e.querySelector('div div span img').src,
		precio:e.querySelector('div.SearchCard_ProductCard_Body__2wM_H > div.Space_Space__43IaB.Space_Space__small__w35wB.Space_Space__vertical__4PBHk.SearchCard_ProductCard_Description__fGXI3 > div:nth-child(2) p').innerText
	}}))
	return data;
		
	
}

const scraperLivre= async(page,cat)=>{
	
	// Wait for the required DOM to be rendered
	
	if(cat==3){
		await page.waitForSelector('#root-app > section > div > section > section.ui-search-layout--grid__container > div');
		await wait(page)
		// Get the link to all the required books
		let tv = await page.$$eval('.ui-recommendations-card--vertical',(elements)=>elements.map((e)=>{
			const url="https://www.mercadolivre.com.br/"
			return {
			nombre:e.querySelector('.ui-recommendations-card__content-and-hidden .ui-recommendations-card__content .ui-recommendations-card__title a').innerText,
			link:e.querySelector('.ui-recommendations-card__content-and-hidden .ui-recommendations-card__content .ui-recommendations-card__title a').href,
			img: e.querySelector('.ui-recommendations-card__image-container img').src,
			precio:e.querySelector('.ui-recommendations-card__content-and-hidden .ui-recommendations-card__content .ui-recommendations-card__price-block .ui-recommendations-card__price-top .ui-recommendations-card__price-and-discount span .andes-money-amount__fraction').innerText
		}}))

		return tv;
	}else if(cat==2){
		await page.waitForSelector('#root-app > div > div.ui-search-main.ui-search-main--exhibitor.ui-search-main--only-products.ui-search-main--with-topkeywords.shops__search-main > section > ol');
		await wait(page)
		let refri = await page.$$eval('.ui-search-layout__item',(elements)=>elements.map((e)=>{
			const url="https://www.mercadolivre.com.br/"
			return {
			nombre:e.querySelector('.ui-search-layout__item div div div.ui-search-result__content-wrapper.shops__result-content-wrapper div.ui-search-item__group.ui-search-item__group--title.shops__items-group a h2').innerText,
			link:e.querySelector('.ui-search-layout__item div div div.ui-search-result__content-wrapper.shops__result-content-wrapper div.ui-search-item__group.ui-search-item__group--title.shops__items-group a').href,
			img: e.querySelector('.ui-search-layout__item div div div.ui-search-result__image.shops__picturesStyles a div div div div div img').src,
			precio:e.querySelector('.ui-search-layout__item div div div.ui-search-result__content-wrapper div.ui-search-result__content-columns.shops__content-columns div div div div div span span').innerText
		}}))

		return refri;

	}else if(cat == 1){
		await page.waitForSelector('#root-app > div > div:nth-child(7) > section > section > div.carousel-container > div > div > div');
		await wait(page)
		let mobile = await page.$$eval('.dynamic-carousel__item-container',(elements)=>elements.map((e)=>{
			const url="https://www.mercadolivre.com.br/"
			return {
			nombre:e.querySelector('.dynamic-carousel__item-container a div div h3').innerText,
			link:e.querySelector('.dynamic-carousel__item-container a').href,
			img: e.querySelector('.dynamic-carousel__item-container a div img').src,
			precio:e.querySelector('.dynamic-carousel__item-container a div div .dynamic-carousel__price-block .dynamic-carousel__price').innerText
		}}))

		return mobile;
		
	}
	
	return []
}
const scraperLivreSearch= async(page,cat)=>{
	
	if(cat==3){
		await page.waitForSelector('#root-app > div > div.ui-search-main');
		await wait(page)
		let data = await page.$$eval('.ui-search-layout__item',(elements)=>elements.map((e)=>{
			const url="https://www.mercadolivre.com.br/"
			return {
			nombre:e.querySelector('div div div.ui-search-result__content-wrapper.shops__result-content-wrapper div a h2').innerText,
			link:e.querySelector('div div div.ui-search-result__content-wrapper.shops__result-content-wrapper div a').href,
			img: e.querySelector('div div div div div div img').src,
			precio:e.querySelector('div div div.ui-search-result__content-wrapper.shops__result-content-wrapper div.ui-search-item__group.ui-search-item__group--price.shops__items-group div div div span span').innerText
		}}))

		return data;
		
	}else{
		await page.waitForSelector('#root-app > div > div.ui-search-main');
		await wait(page)
		let data = await page.$$eval('.ui-search-layout__item.shops__layout-item',(elements)=>elements.map((e)=>{
			const url="https://www.mercadolivre.com.br/"
			return {
			nombre:e.querySelector('div div div.ui-search-result__content-wrapper.shops__result-content-wrapper div a h2').innerText,
			link:e.querySelector('div div div.ui-search-result__content-wrapper.shops__result-content-wrapper div a').href,
			img: e.querySelector('div div div div div div img').src,
			precio:e.querySelector('div div div.ui-search-result__content-wrapper.shops__result-content-wrapper div div div div div div span span').innerText
		}}))

		return data;
	}
	return []
}
const scraperObject = {
	async scraper(browser,url,search,store,cat){
		let data={}
		let page = await browser.newPage();
		console.log(`Navigating...`);
		await page.goto(url,{waitUntil: "domcontentloaded"});
		if(store=="livre"){
			data =   (search) ? (await scraperLivreSearch(page,cat)):(await scraperLivre(page,cat))
		}else if(store=="buscape"){
			data = await scraperBuscape(page)
		}
		return data
	}
}

module.exports = scraperObject;