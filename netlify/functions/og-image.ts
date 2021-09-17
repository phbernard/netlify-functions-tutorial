const fs = require('fs').promises;

//const Handler = require('@netlify/functions').Handler;

const chromium = require('chrome-aws-lambda');

const resocCore = require('@resoc/core');
const resoc = require('@resoc/create-img');

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
  console.log("Start", chromium.args);

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
  const output = await page.screenshot({
    type: 'jpeg',
    quality: 80,
    encoding: "base64"
  });

  await browser.close();

    return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/jpg'
    },
    body: output,
    isBase64Encoded: true
  };

/*
  resoc.createImage(
    'assets/resoc-template/resoc.manifest.json', 
    {
      title: 'A picture is worth a thousand words',
      mainImageUrl: 'https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg',
      textColor: '#ffffff',
      backgroundColor: '#20552a'
    },
    resocCore.FacebookOpenGraph,
    'output-image.jpg'
  );

  console.log("Chrome closed");

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/jpg'
    },
    body: await fs.readFile('output-image.jpg', {encoding: 'base64'}),
    isBase64Encoded: true
  };
  */
};

export { handler };
