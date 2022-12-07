import React from 'react';

const Community = () => {
  return (
    <section id="community">
      <h2>join our community</h2>
      <h5>you are always welcome</h5>

      <div className="communitycontainer container">
        {/* community stats */}

        <div className="stats">
          <div className="twitterstats">
            <h3>+1,500,000</h3>
            <h5>TWITTER FOLLOWERS</h5>
          </div>

          <div className="telegramstats">
            <h3>+300,000 </h3>
            <h5>TELEGRAM MEMBERS</h5>
          </div>
        </div>
        {/* end of community stats */}

        {/* community info */}
        <p>
          Extremely active community that loves our mission and doges! Our
          telegram and discord is filled with community members 24/7 that would
          love to help you. Do not trust random messages of people claiming to
          be “support” or ever give out your wallet info to anyone.
        </p>
        {/* end of community info */}

        {/* community socials */}
        <ul className='icons'>
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

        {/* end of community socials */}
      </div>
    </section>
  );
}

export default Community;