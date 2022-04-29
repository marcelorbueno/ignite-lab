import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

interface CreateCourseParams {
  slug?: string;
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
    const courseWithSameTitle = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseWithSameTitle) {
      throw new Error(`Course with title ${title} already exists`);
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
