function NavTabs({ currentPage, handlePageChange }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
          
  <a className="navbar-brand ml-4 mr-5" href="#">Yee Yang</a>

  <div className="navbar-collapse " id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active  ml-4 mr-4 ">
        <a
            href="#Home"
            onClick={() => handlePageChange('Home')}
            className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
          >
            Home
        </a>
      </li>

      <li className="nav-item active  ml-4 mr-4">
      <a
            href="#about"
            onClick={() => handlePageChange('About')}
            className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
          >
            About
          </a>
      </li>
      <li className="nav-item  ml-4  mr-4">
      <a
            href="#Projects"
            onClick={() => handlePageChange('Projects')}
            className={currentPage === 'Projects' ? 'nav-link active' : 'nav-link'}
          >
            Projects
          </a>
        </li>
        <li className="nav-item ml-4 mr-4">
        <a
            href="#Resume"
            onClick={() => handlePageChange('Resume')}
            className={currentPage === 'Resume' ? 'nav-link active' : 'nav-link'}
          >
            Resume
          </a>
        </li>
        <li className="nav-item ml-4 mr-4">
        <a
            href="#contact"
            onClick={() => handlePageChange('Contact')}
            className={currentPage === 'Contact' ? 'nav-link active' : 'nav-link'}
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
    
  </nav>
  );
}


  
  export default NavTabs;
  