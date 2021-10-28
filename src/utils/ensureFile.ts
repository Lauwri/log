import * as fs from "fs";
import ensureDir from "./ensureDir";

const ensureFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    return true;
  }
  ensureDir(filePath);
  fs.writeFileSync(filePath, "");
};

export default ensureFile;
