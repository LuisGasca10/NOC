import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";

import { Server } from "./presentation/server";
(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MANGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  // const prisma = new PrismaClient();

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message",
  //     origin: "App.ts",
  //   },
  // });

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "HIGH",
  //   },
  // });

  // console.log(logs);

  // Crear una coleccion = tables, documnento = registro
  // const newLog = await LogModel.create({
  //   message: "Test Message desde mongo",
  //   origin: "app.ts",
  //   level: "low",
  // });

  // await newLog.save();
  // console.log(newLog);

  // const logs = await LogModel.find();
  // console.log(logs);

  Server.start();
}
