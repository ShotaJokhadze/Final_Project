import './Header.scss';

export default function Header() {
  return (
    <>
      <nav id='topnav'>
        <div className="navbar-container">
          <div className="logo">
            <a href="#">Logo</a>
          </div>
          <div className="navigation">
            <ul className="navigation-menu">
              <li className='active'>
                <a href="">About</a>
              </li>
              <li>
                <a href="">Contact Us</a>
              </li>
              <li>
                <a href="">assignment 3</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
