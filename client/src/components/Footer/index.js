import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';


const Footer = () => {
  const year = new Date().getFullYear()
  const location = useLocation();
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState(year)
  

  return (
    <footer className="w-100 mt-auto bg-light">
      <div className="container">
        <div className='row py-1 justify-content-between align-items-center'>


        <div className='col-lg-4'>
          <h6>ABOUT</h6>
          <div className='row'>
            <span className='py-0'>Our Story</span>
            <span>Our Works</span>
            <span>FAQ</span>
          </div>

          </div>

          <div className='col-lg-4'>
          <h6>SUPPORT</h6>
          <div className='row'>
            <span className='py-0'>Our Story</span>
            <span>Support Request</span>
            <span>Contact Us</span>
          </div>

          </div>

          <div className='col-lg-4 d-flex justify-content-end align-items-center'>
          <h6>Follow Us On</h6>
          <div className='px-4 d-flex justify-content-end'>
          <div>
            <Icon icon="icon-park-solid:twitter" className='footer-icon'></Icon>
          </div>
          <div>
            <Icon icon="brandico:facebook-rect" className='footer-icon' ></Icon>
          </div>
          <div>
            <Icon icon="ant-design:instagram-filled" className='footer-icon'></Icon>
          </div>
          </div>
          </div>
          
        </div>
        <div className='conainer w-100 justify-conent-center col-lg-12 text-center py-2'>
          <small className='text-dark'>&copy; {currentYear} Steep Dreams Ltd All rights reserved</small>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
