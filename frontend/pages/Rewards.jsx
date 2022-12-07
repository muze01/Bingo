import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "../utils/data.js";

const Rewards = () => {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

   useEffect(() => {
     const lastIndex = people.length - 1;
     if (index < 0) {
       setIndex(lastIndex);
     }
     if (index > lastIndex) {
       setIndex(0);
     }
   }, [index, people]);

   useEffect(() => {
     let slider = setInterval(() => {
       setIndex(index + 1);
     }, 5000);
     return () => {
       clearInterval(slider);
     };
   }, [index]);

   
  return (
    <main id="rewards" className="reduceReward">
      <h2>Rewards</h2>
      <h5>In your wallet</h5>

      <div className="container rewardsContainer">
        <p className="rewardinfo">
          $Bingo Token is cute but with a lot of BITE! $Bingo Token is a
          deflationary token designed to become more scarce over time. All
          holders of $Bingo Token will earn more $Bingo Token that is
          automatically sent to your wallet by simply holding $Bingo Token in
          your wallet. Watch the amount of $Bingo Token grow in your wallet as
          $Bingo Token holders automatically receive a 5% fee from every
          transaction that happens on the $Bingo network. The community
          receives more $Bingo Token from the fees generated each transaction.
        </p>

        {/* reflection slide */}
        <div className="section-center">
          {people.map((person, personIndex) => {
            const { id, image, name, quote } = person;

            let position = "nextSlide";
            if (personIndex === index) {
              position = "activeSlide";
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === people.length - 1)
            ) {
              position = "lastSlide";
            }

            return (
              <article className={position} key={id}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="text">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}
          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Rewards