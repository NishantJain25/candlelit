import React, { useEffect } from "react";
import "./about.styles.scss";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-container">
      
      
        
        <header>
        <h2>About Us</h2>
      </header>
      <div className="divider"></div>
          <p id="body">
            Hi there! My name is Kashish and I am the creator/owner of CandleLit
            Company. I'm currently pursuing my Masters degree. I always utilised
            my free time to think about what the next chapter of my life could
            be.

<br/>
<br/>
			I developed a sudden passion for candle-making in May of 2021, and
            haven't looked back since. I've transformed this little idea in my
            head into this small business that I'm very passionate about, and am
            so happy to share it with you all! Thank you for stopping by and for
            your support. It means the world to me!
			
          </p>
       
      
    </div>
  );
};

export default About;
