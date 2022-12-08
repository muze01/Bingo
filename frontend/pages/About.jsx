import React from "react";
import { useGlobalContext } from "../utils/context";

const About = () => {
  const { backIMG, backId } = useGlobalContext();

  return (
    <section id="about" className="spaceup">
      <h2>about</h2>
      <h5>bingo token</h5>

      <main className="container about-container">
        {/* write-up */}
        <div className="about-info">
          <p>
            Bingo 🐶 is cute but with a lot of BITE! $Bingo Token is a
            deflationary token designed to become more scarce over time. All
            holders of $Bingo Token 💰 will earn more through reflections
            automatically sent to your wallet by simply holding the $Bingo Token
            💰 in your wallet. Watch the amount of $Bingo Token 💰 grow in your
            wallet, as $Bingo Token 💰 holders automatically receive a 5% fee
            from every on chain transaction that happens on the $Bingo Token 💰
            ecosystem. The community receives more $Bingo Token 💰 from the fees
            generated on each transaction. We also have NFT's to help support
            our primary course, dog protection. In general our community aims to
            spread awareness of animal adoption and this new technoloy "crypto".
          </p>
        </div>

        {/* images */}
        <div className="about-images">
          <img
            src="./pics/HeroDoge.webp"
            alt="about-pic"
            className="about-bingo"
          />

          {/* blob 1 */}
          <div className="">
            {backIMG.map((item, index) => {
              const { color, blob } = item;
              let wave = backId === color;
              return (
                wave && (
                  <div key={index} className="">
                    <img src={blob} alt="blob1" className="about-blob" />
                  </div>
                )
              );
            })}
          </div>

          {/* blob 2*/}
          <div className="">
            {backIMG.map((item, index) => {
              const { color, blob } = item;
              let wave = backId === color;
              return (
                wave && (
                  <div key={index} className="">
                    <img src={blob} alt="blob1" className="about-blob2" />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </main>
    </section>
  );
};

export default About;
