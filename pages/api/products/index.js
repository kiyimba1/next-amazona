import nc from 'next-connect';
import Product from '../../../models/product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  res.send(products);
  db.disconnect();
});

export default handler;
