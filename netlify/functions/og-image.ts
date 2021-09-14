const fs = require('fs').promises;

//const Handler = require('@netlify/functions').Handler;

const chromium = require('chrome-aws-lambda');

//import { compileLocalTemplate } from '@resoc/create-img'
//import { FacebookOpenGraph } from '@resoc/core'

const handler = async (event, context) => {
  /*
  await compileLocalTemplate('./assets/resoc-template/resoc.manifest.json', {
    title: "Hello!!",
    mainImageUrl: "https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg",
    textColor: "#fff",
    backgroundColor: "#20552a"
  }, FacebookOpenGraph, './pic.png');
  const img = await fs.readFile('./pic.png', {encoding: 'base64'});
  */
  console.log("Start");

  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    headless: chromium.headless
  });
  const page = await browser.newPage();
  // Wait until there are no network connexion for 500ms
  await page.goto('http://realfavicongenerator.net', {waitUntil: [
    'networkidle0', 'domcontentloaded', 'load'
  ]});
  const output = './pic.png';
  await page.screenshot({
    path: output,
    fullPage: true
  });

  await browser.close();

  console.log("Chrome closed");

  const img = await fs.readFile('./pic.png', {encoding: 'base64'});

  console.log("Read pic", img.length);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png'
    },
    body: img.toString(),
    isBase64Encoded: true
  };
};

export { handler };
