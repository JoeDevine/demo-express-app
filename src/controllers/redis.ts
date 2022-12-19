import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

const getExample = async (req: Request, res: Response, next: NextFunction) => {
  let value, keys;
  try {
    await client.connect();
    value = await client.get('mykey');
    await client.disconnect();
  } catch (err) {
    console.error(err);
  }
  // return response
  return res.status(200).json({
    message: 'Successfully Queried Example Cached String',
    body: value,
  });
};

const getCache = async (req: Request, res: Response, next: NextFunction) => {
  let values, keys, value, combined;
  try {
    await client.connect();
    keys = await client.KEYS('hash:*');
    values = await client.MGET(keys);
    const hashArray = keys;
    combined = values.map((value, i) => {
      return { hash: hashArray[i], query: value };
    });
    await client.disconnect();
  } catch (err) {
    console.error(err);
  }

  try {
  } catch (err) {
    console.error(err);
  }

  // return response
  return res.status(200).json({
    message: 'Successfully Queried Example Cached String',
    body: combined,
  });
};

export default { getCache, getExample };
