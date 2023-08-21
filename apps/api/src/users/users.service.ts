import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { name, direction, gender, phone } = createUserDto;

    return this.prisma.user.create({
      data: {
        name,
        direction,
        gender,
        phone
      }
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}

export default UsersService;
