import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Free Shirt',
      category: 'Shirts',
      slug: 'free-shirt',
      image: '/images/shirt1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numRevews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Fit Shirt',
      category: 'Shirts',
      slug: 'fit-shirt',
      image: '/images/shirt2.jpg',
      price: 40,
      brand: 'Puma',
      rating: 4.5,
      numRevews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Slim Shirt',
      category: 'Shirts',
      slug: 'slim-shirt',
      image: '/images/shirt3.jpg',
      price: 90,
      brand: 'Rymond',
      rating: 4.5,
      numRevews: 10,
      countInStock: 20,
      description: 'A small shirt',
    },
    {
      name: 'Golf Pants',
      category: 'Shirts',
      slug: 'golf-pants',
      image: '/images/pants1.jpg',
      price: 70,
      brand: 'Oliver',
      rating: 4.5,
      numRevews: 10,
      countInStock: 20,
      description: 'A popular pant',
    },
    {
      name: 'Fit Pants',
      category: 'Pants',
      slug: 'fit-pants',
      image: '/images/pants2.jpg',
      price: 95,
      brand: 'Zara',
      rating: 4.5,
      numRevews: 10,
      countInStock: 20,
      description: 'A popular pants',
    },
    {
      name: 'Classic Pants',
      category: 'Pants',
      slug: 'classic-pants',
      image: '/images/pants3.jpg',
      price: 75,
      brand: 'Casely',
      rating: 4.5,
      numRevews: 10,
      countInStock: 20,
      description: 'A popular pants',
    },
  ],
};

export default data;
