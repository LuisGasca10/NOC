import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositroyImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    await this.logDatasource.saveLog(log);
  }
  async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return await this.logDatasource.getLog(severityLevel);
  }
}
