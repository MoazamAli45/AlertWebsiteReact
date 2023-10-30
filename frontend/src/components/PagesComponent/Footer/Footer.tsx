import LinkedIcon from '@/assets/icons/LinkedIn';
import FacebookIcon from '../../../assets/icons/FacebookIcon';
import PinterestIcon from '../../../assets/icons/PinterestIcon';
import YouTubeIcon from '../../../assets/icons/YoutubeIcon';
import Logo1 from '/logo1.png';

function Footer() {
  return (
    <footer className="flex flex-col py-[1.2rem]">
      {/*   Upper content */}
      <div className="flex sm:justify-between pb-[3rem] flex-wrap sm:flex-row flex-col justify-center gap-[1.2rem]">
        <div className="flex flex-col gap-[1.2rem] flex-1">
          <div>
            <img src={Logo1} alt="logo" />
          </div>
          <p className="font-light text-[1rem] text-white md:w-[52%] text-start">
            Massa blandit semper varius faucibus. Suspendisse viverra venenatis
            placerat nam ut. Pellentesque sit id tempor turpis.
          </p>
        </div>
        {/*  right */}
        <div className="flex sm:justify-evenly gap-[1.2rem] flex-1 flex-wrap sm:flex-row flex-col    ">
          <ul className="flex flex-col gap-[.8rem] list-none">
            <h3 className="text-[1.5rem] footer-text font-semibold">Links</h3>
            <li>
              <a className="font-light text-[1rem]">How it works</a>
            </li>
            <li>
              <a className="font-light text-[1rem]">Cryptos</a>
            </li>
            <li>
              <a className="font-light text-[1rem]">Testimonial</a>
            </li>
            <li>
              <a className="font-light text-[1rem]">Blogs</a>
            </li>
          </ul>
          <ul className="flex flex-col gap-[.8rem] list-none">
            <h3 className="text-[1.5rem] footer-text font-semibold">Legal</h3>
            <li>
              <a className="font-light text-[1rem]">Terms of use</a>
            </li>
            <li>
              <a className="font-light text-[1rem]">Terms of Condition</a>
            </li>
            <li>
              <a className="font-light text-[1rem]">Privacy Policy</a>
            </li>
            <li>
              <a className="font-light text-[1rem]">Cookie Policy</a>
            </li>
          </ul>
        </div>
      </div>
      {/*  Lower  */}
      <div className="flex flex-wrap sm:justify-between border-t-[1px] border-solid border-[#fff] border-opacity-[.2] py-[1.5rem] sm:flex-row flex-col gap-[1rem] justify-center items-center">
        <div className="flex gap-[.7rem]">
          <span className="text-[.8rem]">Privacy & Terms </span>
          <span className="text-[.8rem]">Contact Us </span>
        </div>
        <div className="text-[.8rem]">Copyright @ 2022 xpence</div>
        <div className="flex gap-[.7rem]">
          <YouTubeIcon />
          <FacebookIcon />
          <LinkedIcon />
          <PinterestIcon />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
