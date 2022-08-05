import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto py-4">
      <div className="container text-center mb-5">
        <div className='d-flex'>
          <div>
            <Icon icon="icon-park-solid:twitter" className='nav-icon'></Icon>
          </div>
          <div>
            <Icon icon="brandico:facebook-rect" className='nav-icon' ></Icon>
          </div>
          <div>
            <Icon icon="ant-design:instagram-filled" className='nav-icon'></Icon>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
