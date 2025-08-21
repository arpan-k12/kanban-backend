import app from "./app";
import { HOST, APP_PORT } from "./config/dotenv.config";
import serverConfig from "./config/server.config";

const host = HOST;
const port = APP_PORT;

app.listen(serverConfig.port, (): void => {
  console.log(`Server running on http://${host}:${port}`);
});
