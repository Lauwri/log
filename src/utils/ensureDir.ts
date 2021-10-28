import * as fs from "fs";
import * as path from "path";

const ensureDir = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname);
};

export default ensureDir;
