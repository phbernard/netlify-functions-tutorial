import { promises as fs } from "fs"

import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const img = await fs.readFile('./public/pic.png', {encoding: 'base64'});

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
