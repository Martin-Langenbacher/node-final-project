import supertest from 'supertest';
import fs from 'fs';
import path from 'path';

import app from '../index';
import { myFunc } from '../index';
import { saveResizedImage } from '../utilities/savePicture';

const request = supertest(app);

describe('*** Basic tests (for learning purpose)', () => {
  it('1) Checking the toBe-function: Is it true?', () => {
    const myVar = true;
    expect(myVar).toBe(true);
  });
  it('2) expect myFunc(5) to equal 25', () => {
    expect(myFunc(5)).toEqual(25);
  });
});

describe('*** Test endpoint responses: Test for the final project!', () => {
  const testWidth = 213;
  const testHeight = 217;
  const testPictureName = 'fjord';
  const testFileName = `${testPictureName}-${testWidth}x${testHeight}.jpg`;
  const testPath = `/api/images?filename=${testPictureName}&width=${testWidth}&height=${testHeight}`;

  const imagePath = path.join(__dirname, `../../assets/thumb/${testFileName}`);

  it('3) get the /api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('4) the api endpoint EXISTS (200): /api/images?filename=fjord&width=200&height=200', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200&height=200');
    expect(response.status).toBe(200);
  });

  it('5) file exist: fjordTestPic.jpg', async () => {
    // Check if the image file was saved correctly
    const fileExists = fs.existsSync(path.join(__dirname, `../../assets/testPic/fjordTestPic.jpg`));
    expect(fileExists).toBe(true);
  });

  it(`6) the api endpoint EXISTS (200): ${testPath}`, async () => {
    const response = await request.get(`${testPath}`);
    expect(response.status).toBe(200);

    // Check if the image file was saved correctly
    const fileExists2 = fs.existsSync(imagePath);
    expect(fileExists2).toBe(true);
  });

  it('7) the api endpoint height is missing: /api/images?filename=fjord&width=200', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200');
    expect(response.status).toBe(400);
    expect(response.text).toContain('Parameter ERROR');
    expect(response.text).toContain(
      'Sorry, wrong or missing required query parameters: filename, width, and height !'
    );
  });

  // Cleanup after the test
  afterEach(() => {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  });

  it('8) the api endpoint does NOT exist (500): /api/images?filename=wrongName&width=200&height=200', async () => {
    const response = await request.get('/api/images?filename=wrongName&width=200&height=200');
    expect(response.status).toBe(500);
  });
});

describe('*** Image Processing Test', () => {
  const testWidth = 267;
  const testHeight = 279;
  const testFileName = `test-${testWidth}x${testHeight}.jpg`;
  const testFilePath = path.join(__dirname, '..', '..', 'assets', 'testPic', 'fjordTestPic.jpg');

  const testThumbPath = path.join(
    __dirname,
    '..',
    '..',
    'assets',
    'thumb',
    `test-${testWidth}x${testHeight}.jpg`
  );

  beforeAll(() => {
    // Setup: Make sure the test image and directories exist
  });

  afterAll(() => {
    // Cleanup: Remove the generated thumbnail image after tests
    try {
      // fs.unlinkSync(testThumbPath);
      fs.unlinkSync(testThumbPath);
    } catch (error) {
      console.error('Error cleaning up test thumbnail image:', error);
    }
  });

  it('9) should not throw an error when transforming an image', async () => {
    await expectAsync(
      saveResizedImage(testFilePath, testWidth, testHeight, testFileName)
    ).toBeResolved();
  });
});

// http://localhost:3000/api/images?filename=fjord&width=200&height=200
