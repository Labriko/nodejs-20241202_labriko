import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    let parsedInt = parseInt(value);

    if (isNaN(parsedInt)) {
      throw new BadRequestException(`"${value}" не является числом`);
    }

    return parsedInt;
  }
}
