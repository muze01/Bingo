import React from "react";


const Footer = () => {
  return (
    <footer>
      <div className="footerline"></div>
      <main className="footer">

        {/* section one */}
        <div className="sectionone">
          {/* reach us */}
          <div className="contactinfo"></div>

          {/* links */}
          <p className="join">JOIN OUR COMMUNITY</p>
          <ul className="footericons">
            {/* twitter */}
            <li>
              <a href="">
                <img
                  src="./pics/twitter-icon.avif"
                  alt="telegram"
                  className="imageicon"
                />
              </a>
            </li>
            {/* instagram */}
            <li>
              <a href="">
                <img
                  src="./pics/insta-icon.webp"
                  alt="telegram"
                  className="imageicon"
                />
              </a>
            </li>
            {/* facebook */}
            <li>
              <a href="">
                <img
                  src="./pics/fb-icon.avif"
                  alt="telegram"
                  className="imageicon"
                />
              </a>
            </li>
            {/* telegram */}
            <li>
              <a href="">
                <img
                  src="./pics/telegram-icon.avif"
                  alt="telegram"
                  className="imageicon"
                />
              </a>
            </li>
            {/* reddit */}
            <li>
              <a href="">
                <img
                  src="./pics/reddit-icon.avif"
                  alt="telegram"
                  className="imageicon"
                />
              </a>
            </li>
            {/* discord */}
            <li>
              <a href="">
                <img
                  src="./pics/discord-icon.avif"
                  alt="telegram"
                  className="imageicon"
                />
              </a>
            </li>
          </ul>

          <img src="./pics/hd-cetrik.svg" alt="cetrik" className="certik" />
        </div>
        {/* end of section one */}
        <div className="underline">
          <img
            src="./pics/bingolil.jpg"
            alt="bingoearth"
            className="bingolil"
          />
        </div>
        {/* section two */}
        <div className="sectiontwo">
          {/* logo */}
          <div className=" footerlogo">
            <img
              src="./pics/dexanimate.avif"
              alt="bingo Logo"
              className="bingo-logo"
            />
          </div>

          <p className="footerinfo">
            Copyright ® 2022 Bingo Token. All Rights Reserved Privacy Policy -
            Terms & Conditions Bingo Token is not an investment. It was created
            as a meme parody like other meme tokens i.e (doge, floki inu, e.t.c)
            in the crypto space. Bingo Token makes no promises and is not
            responsible for any losses or errors use at your own risk.
          </p>
        </div>
        {/* end of section two */}
        {/* */}
      </main>
      <div className="newunderline">
        <p>
          donate to dev {" "}
          <small>0xfe2521C82baD4316435aF559C54cC3b0b8D9DBF3</small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
