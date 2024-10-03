import { Link } from "react-router-dom";
import facebookIcon from '../assets/facebook.png'; 
import instagramIcon from '../assets/instagram.png'; 
import youtubeIcon from '../assets/youtube.png'; 
import pinterestIcon from '../assets/pinterest.png'; 
import xIcon from '../assets/x.png'; 
import discoverIcon from '../assets/discover.png'; 
import skrillIcon from '../assets/skrill.png'; 
import paypalIcon from '../assets/paypal.png'; 
import mastercardIcon from '../assets/mastercard.png'; 
import visaIcon from '../assets/visa.png'; 

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link to="/">
            <div className="text-2xl tracking-wide">LAMA</div>
          </Link>
          <p>
            3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United
            States
          </p>
          <span className="font-semibold">hello@lama.dev</span>
          <span className="font-semibold">+1 234 567 890</span>
          <div className="flex gap-6">
            <img src={facebookIcon} alt="Facebook" width={16} height={16} />
            <img src={instagramIcon} alt="Instagram" width={16} height={16} />
            <img src={youtubeIcon} alt="YouTube" width={16} height={16} />
            <img src={pinterestIcon} alt="Pinterest" width={16} height={16} />
            <img src={xIcon} alt="X" width={16} height={16} />
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link to="">About Us</Link>
              <Link to="">Careers</Link>
              <Link to="">Affiliates</Link>
              <Link to="">Blog</Link>
              <Link to="">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link to="">New Arrivals</Link>
              <Link to="">Accessories</Link>
              <Link to="">Men</Link>
              <Link to="">Women</Link>
              <Link to="">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link to="">Customer Service</Link>
              <Link to="">My Account</Link>
              <Link to="">Find a Store</Link>
              <Link to="">Legal & Privacy</Link>
              <Link to="">Gift Card</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-lama text-white">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
            <img src={discoverIcon} alt="Discover" width={40} height={20} />
            <img src={skrillIcon} alt="Skrill" width={40} height={20} />
            <img src={paypalIcon} alt="PayPal" width={40} height={20} />
            <img src={mastercardIcon} alt="MasterCard" width={40} height={20} />
            <img src={visaIcon} alt="Visa" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2024 Lama Shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">United States | English</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;