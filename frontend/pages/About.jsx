import React from 'react'

const About = () => {

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
            generated on each transaction. We also have NFT's to help support our primary course, dog protection. In general our
            community aims to spread awareness of animal adoption and this new technoloy "crypto".
          </p>
        </div>

        {/* images */}
        <div className="about-images">
          <img
            src="./pics/HeroDoge.webp"
            alt="about-pic"
            className="about-bingo"
          />
          <div className="about-blob"></div>
          <div className="about-blob2"></div>
        </div>
      </main>
    </section>
  );
}

export default About;