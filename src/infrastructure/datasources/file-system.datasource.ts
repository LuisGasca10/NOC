import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FyleSystemDatasource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-low.log";
  private readonly meidiumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.meidiumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logJson);
    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.meidiumLogsPath, logJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logJson);
    }
    return;
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    if (content === "") return [];
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log));

    // const cleanLogs = logs.filter(
    //   (log) =>
    //     log.message !== undefined &&
    //     log.level !== undefined &&
    //     log.origin !== undefined
    // );

    return logs;
  };

  async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.meidiumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${severityLevel} not implemented`);

        break;
    }
  }
}
