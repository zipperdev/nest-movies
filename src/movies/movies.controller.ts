import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { PatchMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getMovies(): Movie[] {
        return this.moviesService.getMovies();
    }
    
    @Get('/:id')
    getMovie(@Param('id') id: number): Movie {
        return this.moviesService.getMovie(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDTO) {
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.moviesService.remove(id);
    }

    @Patch('/:id')
    patch(
        @Param('id') id: number, 
        @Body() patchedData: PatchMovieDTO
    ) {
        return this.moviesService.patch(id, patchedData);
    }
}
