import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();

const levelSecurity = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgressLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    await prismaClient.logModel.create({
      data: {
        ...log,
        level: levelSecurity[log.level],
      },
    });
    console.log("Log creado en PostgreSQL");
  }
  async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const jsonLogs = await prismaClient.logModel.findMany({
      where: {
        level: levelSecurity[severityLevel],
      },
    });

    return jsonLogs.map(LogEntity.fromObject);
  }
}
