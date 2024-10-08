import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt=''/>
            <p>Join the Foodsy community to explore a wide variety of delicious recipes, share your culinary adventures with fellow food enthusiasts, and find daily inspiration to create your next favorite dish. Discover new flavors, cooking tips, and a supportive network of food lovers all in one place.</p>
            <div className="footer-social-icons">
             <img src={assets.facebook_icon} alt="" />
             <img src={assets.twitter_icon} alt="" />
             <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Ap Technologies</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+1-212-786-9867</li>
                <li>contact@foodsy.com</li>
              </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
      "© 2024 Foodsy. All rights reserved. | Your ultimate destination for delicious recipes and food inspiration."
      </p>
    </div>
  )
}

export default Footer
