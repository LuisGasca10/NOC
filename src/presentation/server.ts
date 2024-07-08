import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FyleSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgressLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositroyImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepositoryFileSystem = new LogRepositroyImpl(
  new FyleSystemDatasource()
);

const logRepositoryMongo = new LogRepositroyImpl(new MongoLogDataSource());

const logRepositoryPostgreSQL = new LogRepositroyImpl(
  new PostgressLogDatasource()
);

const emailService = new EmailService();
export class Server {
  public static async start() {
    console.log("Server started...");
    // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);
    // TODO: Mandar email

    // const logs = await logRepository.getLog(LogSeverityLevel.high);

    // console.log(logs);

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "luisgasca10@outlook.com",
    //   "rapidosyfuriosos.luis@gmail.com",
    // ]);

    // emailService.sendEmailWithFileSystemLogs([
    //   "luisgasca10@outlook.com",
    //   "rapidosyfuriosos.luis@gmail.com",
    // ]);

    // CronService.createJob("*/5 * * * * *", function () {
    //   const url = "http://google.com";
    //   new CheckServiceMultiple(
    //     [logRepositoryFileSystem, logRepositoryMongo, logRepositoryPostgreSQL],
    //     () => console.log("Success Multiple"),
    //     (error) => console.log(error)
    //   ).execute(url);

    //   //   "http://localhost:3000"
    // });

    // CronService.createJob("*/5 * * * * *", function () {
    //   const url = "http://googlre.com";
    //   new CheckService(
    //     logRepository,
    //     () => console.log("Success filesystem"),
    //     (error) => console.log(error)
    //   ).execute(url);

    //   //   "http://localhost:3000"
    // });
    // Mongo

    // CronService.createJob("*/5 * * * * *", function () {
    //   const url = "http://google.com";
    //   new CheckService(
    //     mongoLogRepository,
    //     () => console.log("Success MongoDb"),
    //     (error) => console.log(error)
    //   ).execute(url);

    //   //   new CheckService().execute("http://localhost:3000");
    // });
  }
}
