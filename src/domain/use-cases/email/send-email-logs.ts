import { string } from "valibot";
import { EmailService } from "../../../presentation/email/email.service";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

interface SendLogsEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogsEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error("Email log not sent");
      }

      const log = new LogEntity({
        message: "Log email sent",
        level: LogSeverityLevel.low,
        origin: "send-mail-logs.ts",
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: "send-mail-logs.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
