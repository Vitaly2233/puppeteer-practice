import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

@Injectable()
export class PuppeteerService {
    async login(email: string, password: string) {
        const browser = await puppeteer.use(StealthPlugin()).launch({
            //@ts-ignore
            headless: false,
        });
        const pages = await browser.pages();
        pages[0].close();

        const page = await browser.newPage();

        await page.setViewport({
            width: 1280,
            height: 800,
        });
        await page.goto('https://www.youtube.com/account', {
            waitUntil: 'networkidle2',
        });
        await page.waitForSelector('#identifierNext');
        await page.type('#identifierId', email);

        await page.click('#identifierNext');

        await page.waitForTimeout(2000);

        await page.waitForSelector('input[type="password"]');
        await page.type('input[type="password"]', password);

        await page.waitForSelector('#passwordNext');
        await page.click('#passwordNext');

        await page.goto('https://youtube.com', {
            waitUntil: 'networkidle2',
        });
        await page.goto(
            'https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620',
        );
    }
}
