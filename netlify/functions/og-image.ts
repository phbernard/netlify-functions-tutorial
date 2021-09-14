import { promises as fs } from "fs"

import { Handler } from "@netlify/functions";

import { compileLocalTemplate } from '@resoc/create-img'
import { FacebookOpenGraph } from '@resoc/core'

const handler: Handler = async (event, context) => {
  await compileLocalTemplate('./assets/resoc-template/resoc.manifest.json', {
    title: "Hello!!",
    mainImageUrl: "https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg",
    textColor: "#fff",
    backgroundColor: "#20552a"
  }, FacebookOpenGraph, './pic.png');
  const img = await fs.readFile('./pic.png', {encoding: 'base64'});

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
