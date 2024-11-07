import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import SwiperItem from './components/SwiperItem/SwiperItem';
// import { Card } from './components/Card';
// import { Product } from './types/Product';

// import React, { useRef, useState } from 'react';
// Import Swiper React components

// const item: Product = {
//   id: 1,
//   category: 'phones',
//   itemId: 'apple-iphone-7-32gb-black',
//   name: 'Apple iPhone 7 32GB Black',
//   fullPrice: 400,
//   price: 375,
//   screen: "4.7' IPS",
//   capacity: '32GB',
//   color: 'black',
//   ram: '2GB',
//   year: 2016,
//   image: 'img/phones/apple-iphone-7/black/00.webp',
// };

function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <header></header>
      <SwiperItem />

      {/* <Card product={item} /> */}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
