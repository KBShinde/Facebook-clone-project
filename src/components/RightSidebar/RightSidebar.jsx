import React from 'react';
import './rightSidebar.css';

const ads = [
  {
    img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRvwAUXPfk09IuhMQzqyOD7yAczo9lW_LVbnAVdSkJV6eu1EkI9',
    title: 'Travel Deals',
    description: 'Lets click and check my another project.',
    url: 'https://heartfelt-shortbread-c2072b.netlify.app/'
  },
  {
    img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT0gAMl7WEXfXrQ7m-ArGa4kzdTpPLL-K_Bt1v2F9qRiQ9WsTXy',
    title: 'Explore My Projects',
    description: 'Check out my GitHub for innovative coding solutions.',
    url: 'https://github.com/KBShinde'
  },
  {
    img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQQxLtVXOZ3ZjDRx8Ij53bA4aBfgKqhAfvA59cKOKKH8foJC7AI',
    title: 'Next Adventure',
    description: 'Book now for incredible flight deals.',
    url: 'https://heartfelt-shortbread-c2072b.netlify.app/'
  },
  {
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRs8V7TLrRjlE7PZefwB9nzdZyXl3NmpHdD63XGa39UcyQQ_Ak',
    title: 'Ultimate Getaways',
    description: 'Find top hotel deals and book now!',
    url: 'https://heartfelt-shortbread-c2072b.netlify.app/'
  },

];

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      {ads.map((ad, index) => (
        <a key={index} href={ad.url} target="_blank" rel="noopener noreferrer" className="ad-container">
          <img src={ad.img} alt={ad.title} className="ad-image" />
          <div className="ad-text">
            <h4>{ad.title}</h4>
            <p>{ad.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default RightSidebar;
