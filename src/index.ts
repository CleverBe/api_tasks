import app from "./app";
import { config } from "./config";

const main = async () => {
  const PORT = config.PORT;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

main();
