import React from 'react'
import "./footer.scss"
function Footer() {
  return (
    <div>
        <footer className="footer">
      <div className="footer-container">
      
        <div className="footer-left">
          <h1 className="footer-logo">Fit<span>Flow</span></h1>
          <p>
            Considering its massive size, New York is a remarkably safe city and few travellers experience any problems in terms of safety. Always take extra care of your belongings in crowded places.
          </p>
          <div className="social-icons">
            <div className="icon facebook">f</div>
            <div className="icon twitter">t</div>
            <div className="icon behance">Bē</div>
            <div className="icon youtube">▶</div>
          </div>
        </div>

        
        <div className="footer-middle">
          <div className="about-us">
            <h3>About Us</h3>
            <ul>
              <li>Home</li>
              <li>Services</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>News</li>
            </ul>
          </div>
          <div className="contact-us">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: info@webmail.com</li>
              <li>Phone: 098–098–086–09</li>
              <li>Website: webexample.com</li>
              <li>Location: 12/A, Miranda Halim City, US</li>
            </ul>
          </div>
        </div>

        <div className="footer-right">
          <h3>News Feeds</h3>
          <div className="news-item">
            <p className="date">December 24, 2020</p>
            <p className="desc">An 'IT solution' is a set of software programs and/or services</p>
          </div>
          <div className="news-item">
            <p className="date">December 24, 2020</p>
            <p className="desc">An 'IT solution' is a set of software programs and/or services</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
