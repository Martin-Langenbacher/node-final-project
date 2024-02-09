import fs from "fs";
import path from "path";

const doesFileExist = (filename: string, OUTPUT_DIR: string): boolean => {
  const filePath = path.join(OUTPUT_DIR, filename);
  return fs.existsSync(filePath);
};

export default doesFileExist;
