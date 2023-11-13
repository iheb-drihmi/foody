import React from 'react';
import Link from 'next/link';
import { Merienda } from 'next/font/google';
import './Intro.css';

const merienda = Merienda({ subsets: ['latin'] });

const Intro = () => {
  const vidRef = React.useRef();

  return (
    <div className="app__video top-0 relative">
      <video
        ref={vidRef}
        src={'/audios/meal.mp4'}
        type="video/mp4"
        controls={false}
        autoPlay
        loop
        muted
      />
      <div className="app__video-overlay flex__center">
        <div className=" flex__center"></div>
        <div className={merienda.className + ' grid place-items-center gap-4 text-white'}>
          <h1 className="text-6xl" style={{ color: 'var(--color-golden)' }}>
            Discover the Flavors of Tunisia
          </h1>
          <p>Welcome to Foody, your passport to an exquisite journey through Tunisian cuisine.</p>
          <button type="button" className="custom__button mt-8">
            <Link href="/booking">BOOK A TABLE</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
