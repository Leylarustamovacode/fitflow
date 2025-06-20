import React from 'react'
import './contact.scss'
function Contact() {
  return (
    <div>
      {/* Breadcrumb Area */}
      <div
        className="breadcrumb-area mb-160"
        style={{ backgroundImage: "url(assets/img/bg/breadcrumb-bg.jpg)" }}
        data-overlay="dark"
        data-opacity="7"
      >
        <div className="container pt-150 pb-150 position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="breadcrumb-title">
                <span className="sub-title">Get In Touch</span>
                <h3 className="title">Get Answers</h3>
              </div>
            </div>
          </div>
          <div className="breadcrumb-nav">
            <ul>
              <li><a href="index.html">Home</a></li>
              <li className="active">Contact</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Address Area */}
      <div className="address-area">
        <div className="container">
          <div className="row">
            {[
              {
                icon: "flaticon-email-1",
                title: "info@webmail.com",
                text: "Select a category that best suits your interest. Use filters to customize your search and to find exactly.",
                link: "mailto:info@webmail.com",
                btnText: "Email Us"
              },
              {
                icon: "flaticon-phone-call",
                title: "897-098-574-87",
                text: "Use filters to customize your search and to find exactly select a category that best suits your interest.",
                link: "tel:89709857487",
                btnText: "Make A Call"
              },
              {
                icon: "flaticon-location-1",
                title: "12/A, Miranda Hall, NYC",
                text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
                link: "about.html",
                btnText: "Make Phone"
              }
            ].map((item, idx) => (
              <div key={idx} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="single-address mb-130 text-center">
                  <div className="shape">
                    <img src="assets/img/bg/pattern.jpg" alt="" />
                  </div>
                  <div className="address-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="address-desc">
                    <h4><a href={item.link}>{item.title}</a></h4>
                    <p>{item.text}</p>
                    <a href={item.link} className="generic-btn">
                      {item.btnText} <span className="pl-13 d-inline-block">+</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="map-area pb-95">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14596.899807208923!2d90.3654215!3d23.8461445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c17d65b609fd%3A0x1ffbba3a894b4cf5!2sDHAKA%20BOAT%20CLUB%20LIMITED!5e0!3m2!1sen!2sbd!4v1617309291595!5m2!1sen!2sbd"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>

      {/* Answer Form Area */}
      <div className="answare-area pb-160">
        <div className="container">
          <div className="row">
            <div className="col-xl-123">
              <div className="answere-box answere-box-2">
                <div className="thumb mb-30 mb-lg-0">
                  <img src="assets/img/faq/ans2.jpg" alt="FAQ Visual" />
                </div>
                <div className="answere-form">
                  <span>Answers</span>
                  <h3>More Answers</h3>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row row-20">
                      <div className="col-xl-6">
                        <div className="input-group mb-20">
                          <input type="text" name="fullname" placeholder="Enter full name" />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="input-group mb-20">
                          <input type="email" name="email" placeholder="Enter your email" />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="input-gruop mb-15">
                          <textarea name="message" cols="30" rows="10" placeholder="Enter message"></textarea>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="text-centers">
                          <button type="submit">
                            <i className="fal fa-envelope"></i> Sent Mail
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact
