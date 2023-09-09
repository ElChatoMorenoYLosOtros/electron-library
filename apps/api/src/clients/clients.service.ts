import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';
import CreateClientDto from './dto/create-client.dto';
import UpdateClientDto from './dto/update-client.dto';

@Injectable()
class ClientsService {
  constructor(private prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto
    });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  findOne(clientId: number) {
    return this.prisma.client.findMany({
      where: { clientId }
    });
  }

  update(clientId: number, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { clientId },
      data: updateClientDto
    });
  }

  remove(clientId: number) {
    return this.prisma.client.delete({
      where: { clientId }
    });
  }

  getTotalRead(clientId: number) {
    return this.prisma.loan.count({
      where: {
        clientId,
        returned: true
      }
    });
  }

  getTotalActiveLoans(clientId: number) {
    return this.prisma.loan.count({
      where: {
        clientId,
        returned: false
      }
    });
  }

  async getTotalFine(clientId: number) {
    const userFines = await this.prisma.fine.findMany({
      where: { clientId }
    });

    if (!userFines) {
      throw new Error('User not found');
    }

    let totalFine = 0.0;

    userFines.forEach(fine => {
      totalFine = +fine.debt;
    });

    return totalFine;
  }
}

export default ClientsService;
