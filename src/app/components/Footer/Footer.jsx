import './Footer.scss';


export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-content">
          <h5>Quick Links</h5>
          <div className="quick-links">
            <div className="logo">
              <a href="">Logo</a>
            </div>
            <ul>
              <li><a href="">Home</a></li>
              <li><a href="">About Us</a></li>
              <li><a href="">Contact Us</a></li>
            </ul>
            <button>Get in Touch</button>
          </div>
        </div>
      </footer>
    </>
  )
}
