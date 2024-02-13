import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const OUTPUT_DIR = path.join(__dirname, '..', '..', 'assets', 'thumb');

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

export const saveResizedImage = async (
  imagePath: string,
  imgWidth: number,
  imgHeight: number,
  outputFilename: string
): Promise<string> => {
  try {
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    await sharp(imagePath).resize(imgWidth, imgHeight).toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Error resizing and saving image:', error);
    throw error;
  }
};
