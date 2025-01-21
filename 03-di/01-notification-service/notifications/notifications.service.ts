import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  constructor() {}

  sendEmail(to: string, subject: string, message: string) {
    if (!to) {
      throw new BadRequestException()
    }
    console.log(`Email sent to ${to}: [${subject}] ${message}`);
  }

  sendSMS(to: string, message: string) {
    if (!to) {
      throw new BadRequestException()
    }
    console.log(`SMS sent to ${to}: ${message}`);
  }
}
