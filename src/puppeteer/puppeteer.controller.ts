import { Body, Controller, Post } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('api/puppeteer')
export class PuppeteerController {
    constructor(private puppeteerService: PuppeteerService) {}

    @Post('auth')
    authToYoutube(@Body() body) {
        const { email, password } = body;
        this.puppeteerService.login(email, password);
    }
}
