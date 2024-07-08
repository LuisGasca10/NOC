export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    this.level = options.level;
    this.message = options.message;
    this.createdAt = new Date();
    this.origin = options.origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    const { createdAt, level, message, origin } = JSON.parse(json);

    const log = new LogEntity({ message, level, createdAt, origin });
    log.createdAt = new Date(createdAt);
    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { createdAt, level, message, origin } = object;
    const log = new LogEntity({ message, level, createdAt, origin });
    return log;
  };
}
