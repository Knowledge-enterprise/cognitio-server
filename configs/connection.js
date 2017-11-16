import mongoose from "mongoose";
import logger from "winston";
import dotenv from "dotenv";
import colour from "colour";

mongoose.Promise = global.Promise;
dotenv.config();

let dbURI;

if (process.env.NODE_ENV === "staging") {
  dbURI = process.env.MONGOLAB_URI;
  mongoose.set("debug", true);
} else if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGODB_ATLAS_URI;
} else {
  mongoose.set("debug", true);
  dbURI = process.env.MONGODB_URI;
}

const connection = mongoose.createConnection(dbURI);

connection.on("connected", () => {
  logger.info(`Database connection successful ${dbURI}`.green);
});

connection.on("error", error => {
  logger.error(`Database conection error: ${error}`.red);
});

connection.on("disconnect", () => {
  logger.info(`Database disconnected: ${dbURI}`.yellow);
});

global.process.on("SIGINT", () => {
  connection.close(() => {
    logger.info(
      `Database connection disconnected by cognitio-server: ${dbURI}`.yellow
    );
    proccess.exit(0);
  });
});

export default connection;
