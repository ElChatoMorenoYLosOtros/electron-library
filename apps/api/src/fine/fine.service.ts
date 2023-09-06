import PrismaService from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import CreateFineDto from './dto/create-fine.dto';
import UpdateFineDto from './dto/update-fine.dto';

@Injectable()
export default class FineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFineDto: CreateFineDto) {
    const fineData = {
      debt: createFineDto.debt,
      payeed: createFineDto.payeed,
      loanId: createFineDto.loanId,
      clientId: createFineDto.clientId
    };

    const { loanId } = createFineDto;

    const loan = this.prisma.loan.findUnique({
      where: { loanId }
    });

    if (!loan) {
      throw new Error('Loan not available');
    }

    const createdFine = await this.prisma.fine.create({
      data: fineData
    });

    return createdFine;
  }

  async verifyUsersFine() {
    const userLoans = await this.prisma.loan.findMany();

    const currentDate = new Date();

    if (userLoans.length <= 0) {
      throw new Error('No Loans Found');
    }

    userLoans.forEach(async loan => {
      if (loan.loanDate <= currentDate) {
        await this.create({
          debt: 75.5,
          payeed: false,
          loanId: loan.loanId,
          clientId: loan.clientId
        });
      }
    });
  }

  async userTotalFine(email: string) {
    const userInformation = await this.prisma.client.findUnique({
      where: { email },
      select: { clientId: true }
    });

    if (!userInformation) {
      throw new Error('User not found');
    }

    const userFines = await this.prisma.fine.findMany({
      where: { clientId: userInformation.clientId },
      select: { debt: true }
    });

    let totalFine = new Decimal(0.0);

    userFines.forEach(fine => {
      totalFine = totalFine.add(new Decimal(fine.debt));
    });

    return totalFine;
  }

  findAll() {
    return this.prisma.fine.findMany();
  }

  findOne(fineId: number) {
    return this.prisma.fine.findMany({
      where: { fineId }
    });
  }

  update(fineId: number, updateFineDto: UpdateFineDto) {
    return this.prisma.fine.update({
      where: { fineId },
      data: updateFineDto
    });
  }

  remove(fineId: number) {
    return this.prisma.fine.delete({
      where: { fineId }
    });
  }
}
