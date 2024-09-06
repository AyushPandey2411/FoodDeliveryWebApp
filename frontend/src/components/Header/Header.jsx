import React from 'react'
import "./Header.css"
const Header = () => {
  return (
    <div className='header'>
        <div className="header-content">
            <h2>
                Order your Favourite Food here
            </h2>
            <p>
            Explore our diverse menu, featuring an exquisite selection of dishes crafted with premium ingredients and culinary mastery.Our mission is to satisfy your cravings with an array of delicious and expertly crafted dishes, ensuring every bite is a delightful experience.
            </p>
            <button><a href='#explore-menu'>View Menu</a></button>
        </div>    
    </div>
  )
}

export default Header
