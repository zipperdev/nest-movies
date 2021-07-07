import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  const testMovie = {
    title: 'UnitTestMovie:1',
    year: 0,
    genres: ['UnitTestMovie']
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create(testMovie);
  });

  afterEach(() => {
    service.remove(1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return an array', () => {
      const result = service.getMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getMovie', () => {
    it('should return a movie', () => {
      const movie = service.getMovie(1);
      expect(movie).toBeDefined();
      expect(movie).toEqual({
        id: 1, 
        ...testMovie
      });
    });

    it('should throw 404 error', () => {
      expect(() => {
        service.getMovie(0);
      }).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const prevMoviesLength = service.getMovies().length;
      service.create(testMovie);
      const moviesLength = service.getMovies().length;
      expect(prevMoviesLength).toEqual(moviesLength - 1);
    });
  });

  describe('patch', () => {
    it('should patch a movie', () => {
      service.patch(1, {
        year: 1
      });
      const movie = service.getMovie(1);
      expect(movie.year).toEqual(1);
    });

    it('should throw 404 error', () => {
      expect(() => {
        service.patch(0, {});
      }).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a movie', () => {
      const prevMoviesLength = service.getMovies().length;
      service.remove(1);
      const moviesLength = service.getMovies().length;
      expect(moviesLength).toEqual(prevMoviesLength - 1);
    });

    it('should throw 404 error', () => {
      expect(() => {
        service.remove(0);
      }).toThrow(NotFoundException);
    });
  });
});
