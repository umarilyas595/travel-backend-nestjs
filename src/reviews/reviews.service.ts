import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}
  create(createReviewDto: CreateReviewDto) {
    try {
      const review = this.reviewRepository.create(createReviewDto);
      return this.reviewRepository.save(review);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return this.reviewRepository.find();
  }

  async findOne(id: number) {
    try {
      const review = await this.reviewRepository.findOne({
        where: {
          id,
        },
      });
      if (!review) {
        throw new NotFoundException('Not found');
      }

      return review;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.findOne(id);
      if (!review) {
        throw new NotFoundException('Not found');
      }

      return await this.reviewRepository.save({
        ...review,
        ...updateReviewDto,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const isDelete = await this.reviewRepository.delete(id);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException('Not Found any data against this id.');
      }
      return 'Successfully removed';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
