import nc from 'next-connect';
import Product from '../../models/product';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  db.disconnect();
  res.send({ messege: 'Seeded successfully' });
});

export default handler;
