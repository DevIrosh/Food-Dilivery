import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import logocompany from '../../assets/logocompany.png'


export const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footercontent'>
                <div className='footercontent-left'>
                    <img src={logocompany} alt='Company Logo' className='footer-logo' />
                    <p>Your favorite food delivered fast at your door.</p>
                </div>

                <div className='footercontent-center'>
                    <h3>About Us</h3>
                    <p>We are committed to delivering the best food experience.</p>
                </div>

                <div className='footercontent-right'>
                    <h3>Contact</h3>
                    <p>Email: support@fooddelivery.com</p>
                    <p>Phone: +1 234 567 890</p>
                </div>

                        <div className='footercontent-social'>
                            <a href='https://facebook.com' aria-label='Facebook' target='_blank' rel='noopener noreferrer'>
                                <img src={assets.facebook_icon} alt='Facebook' />
                            </a>
                            <a href='https://twitter.com' aria-label='Twitter' target='_blank' rel='noopener noreferrer'>
                                <img src={assets.twitter_icon} alt='Twitter' />
                            </a>
                            <a href='https://instagram.com' aria-label='Instagram' target='_blank' rel='noopener noreferrer'>
                                <img src={assets.instagram_icon} alt='Instagram' />
                            </a>
                        </div>
            </div>

            <div className='footer-bottom'>
                <p>© 2025 Food Delivery. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer