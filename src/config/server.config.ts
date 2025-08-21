import IServerConfig from "../types/AppConfig.types";
import { NODE_ENV, APP_PORT } from "./dotenv.config";

const serverConfig: IServerConfig = {
  port: APP_PORT,
  nodeEnv: NODE_ENV,
};

export default serverConfig;
