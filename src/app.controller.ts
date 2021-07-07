import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    home(): object {
        return {
            title: 'NestMovies',
            message: 'Welcome to NestMovies API'
        };
    }
}
