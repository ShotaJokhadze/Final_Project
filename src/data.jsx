import prod1 from './assets/image1.jpg';
import prod2 from './assets/image2.jpg';
import prod3 from './assets/image3.jpg';
import prod4 from './assets/image4.jpg';
import userImg from './assets/user.jpg';
import reactLogo from './assets/reactLogo.jpg';
import nodeLogo from './assets/nodeLogo.jpg';
import nextLogo from './assets/nextLogo.jpg';
import jsLogo from './assets/JsLogo.jpg'

export const cardData = [
  {
    src: prod1,
    header: 'Product 1',
    content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, placeat.',
  },
  {
    src: prod2,
    header: 'Product 2',
    content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, placeat.',
  },
  {
    src: prod3,
    header: 'Product 3',
    content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, placeat.',
  },
  {
    src: prod4,
    header: 'Product 4',
    content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, placeat.',
  },
];

export const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  photo: userImg,
};

export const blogPosts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    content: 'In this post, we explore the concept of React Hooks, how they work, and why they are beneficial for functional components.',
    image: reactLogo,
  },
  {
    id: 2,
    title: 'Getting Started with Node.js',
    content: 'Node.js is a runtime environment that allows you to run JavaScript on the server. This post covers the basics to get started.',
    image: nodeLogo,
  },
  {
    id: 3,
    title: 'Mastering JavaScript ES6 Features',
    content: 'ES6 brought many new features to JavaScript, making it more powerful and easier to work with. Explore these features in this post.',
    image: jsLogo,
  },
  {
    id: 4,
    title: 'Getting Started with Next.js',
    content: 'Next.js is a React framework that gives you building blocks to create web applications.',
    image: nextLogo,
  },
];