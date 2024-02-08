import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(__dirname, "..", "assets", "thumb");

const doesFileExist = (filename: string): boolean => {
  const filePath = path.join(OUTPUT_DIR, filename);
  return fs.existsSync(filePath);
};

export default doesFileExist;

// Asynchronous:
/*

import fs from "fs/promises";
import path from "path";

const OUTPUT_DIR = path.join(__dirname, "..", "assets", "thumb");

const doesFileExist = async (filename: string): Promise<boolean> => {
  const filePath = path.join(OUTPUT_DIR, filename);
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

*/
