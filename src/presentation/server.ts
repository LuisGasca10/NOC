import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", function () {
      new CheckService(
        () => console.log("Succes"),
        (error) => console.log(error)
      ).execute("https://google.com");

      //   new CheckService().execute("http://localhost:3000");
    });
  }
}
