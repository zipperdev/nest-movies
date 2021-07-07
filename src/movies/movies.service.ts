import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { PatchMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getMovies(): Movie[] {
        return this.movies;
    }

    getMovie(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException('Cannot find unique movie.');
        } else {
            return movie;
        };
    }

    create(movieData: CreateMovieDTO) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    remove(id: number) {
        this.getMovie(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    patch(id: number, patchedData: PatchMovieDTO) {
        const movie = this.getMovie(id);
        this.remove(id);
        this.movies.push({
            ...movie, 
            ...patchedData
        });
    }
}
