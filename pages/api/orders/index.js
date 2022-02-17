import nc from 'next-connect';
import Order from '../../../models/order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';

const handler = nc({
  onError
});

handler.use(isAuth);

handler.post(async (req, res)=>{
  try {
    await db.connect();
  const newOrder = new Order({
    ...req.body
  })
  const order = await newOrder.save();
  res.status(201).send(order)
  } catch (error) {
    // console.log(error)
  }
  
})

export default handler;
