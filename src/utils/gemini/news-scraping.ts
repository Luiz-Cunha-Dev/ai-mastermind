'use server';
import genAI from ".";
import axios from "axios";
import * as cheerio from 'cheerio';

type news ={
    title: string;
    content: string;
    link: string;
    summary: string;
    imageUrl: string;
  }

async function getLastNewsUrl(theme: string) {
    const response = await axios.get(`https://www.google.com/search?q=${theme}&tbm=nws`);

    const startbody = response.data.indexOf('<body');
    const endbody = response.data.indexOf('</body>');
    let body = response.data.slice(startbody, endbody + 7);

    //apagar scripts
    while (body.indexOf('<script') != -1) {
        const startscript = body.indexOf('<script');
        const endscript = body.indexOf('</script>');
        body = body.slice(0, startscript) + body.slice(endscript + 9);
    }

    //apagar estilos
    while (body.indexOf('<style') != -1) {
        const startstyle = body.indexOf('<style');
        const endstyle = body.indexOf('</style>');
        body = body.slice(0, startstyle) + body.slice(endstyle + 8);
    }

    //apagar noscript
    while (body.indexOf('<noscript') != -1) {
        const startnoscript = body.indexOf('<noscript');
        const endnoscript = body.indexOf('</noscript>');
        body = body.slice(0, startnoscript) + body.slice(endnoscript + 11);
    }

    //apagar tudo que não for o resultado da busca
    const startdiv = body.indexOf('Classificados por data</a></li></ul></div></div></div></div></div></div><div></div>');
    const endDiv = body.indexOf('<footer>');
    body = body.slice(startdiv + 83, endDiv);


    const $ = cheerio.load(body);

    let links: any = [];
    $('a').each((index, element) => {
        const link = $(element).attr('href');

        links.push(link);
    });

    links = links.map((link : string) => link.replace('/url?q=', '').split('&')[0]).filter((link : string) => link.startsWith('http'));



    return links;
}

async function getContentOfNews(theme: string) {
    try {
        const links = await getLastNewsUrl(theme);
        const news = await Promise.all(links.map(async (link: string) => {
            try {
                const response = await axios.get(link);
                const $ = cheerio.load(response.data);
                const title = $('title').text().replace(/\n+/g, '').trim();
                const content = $('p').text().replace(/\n+/g, '').trim();
                return { title, content, link };
            } catch (error) {
                console.error(`Failed to scrape ${link}: ${error}`);
                return null;
            }
        }));

        return news.filter(Boolean);
    } catch (error) {
        console.error(`Failed to get news for ${theme}: ${error}`);
        return [];
    }
}

export async function getSummaryOfNews(theme: string) {
    try {
        const news = await getContentOfNews(theme);
        const model = genAI.getGenerativeModel({
            model: 'gemini-pro',
        });

        const summaries = await Promise.all(news.map(async (article) => {
            const prompt = `Return the summary of the text: ${article.content}`;
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            return text;
        }));

        for (let i = 0; i < news.length; i++) {
            news[i].summary = summaries[i];
        }

        const promises = news.map(async (news: news ) => {
            const imageUrl = await getFirstGoogleImageUrlByTopic(news.title);
            return { ...news, imageUrl };
        });

        const updatedNews: news[] = await Promise.all(promises);

        return updatedNews;

    } catch (error) {
        console.error(`Failed to get news for ${theme}: ${error}`);
    }
}

async function getFirstGoogleImageUrlByTopic(topic: string) {
    try {
        const response = await axios.get(`https://www.google.com/search?q=${topic}&tbm=isch`);
        const html = response.data;
        const firstImageUrl = html.match(/src="(https:\/\/[^"]*)/)[1];
        return firstImageUrl;
    } catch (error) {
        console.error(error);
    }
}