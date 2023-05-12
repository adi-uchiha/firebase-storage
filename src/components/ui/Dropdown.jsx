import './Dropdown.css'

const Dropdown = () => {
  return <>
    <input className="dark-light" type="checkbox" id="dark-light" name="dark-light" />
    <label htmlFor="dark-light"></label>

    <div className="light-back"></div>

    <a href="https://front.codes/" className="logo" target="_blank" rel="noreferrer">
      <img src="https://assets.codepen.io/1462889/fcy.png" alt=""></img>
    </a>

    <div className="sec-center">
      <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
      <label className="for-dropdown" htmlFor="dropdown">Dropdown Menu <i className="uil uil-arrow-down"></i></label>
      <div className="section-dropdown">
        <a href="#">Dropdown Link <i className="uil uil-arrow-right"></i></a>
        <input className="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub" />
        <label className="for-dropdown-sub" htmlFor="dropdown-sub">Dropdown Sub <i className="uil uil-plus"></i></label>
        <div className="section-dropdown-sub">
          <a href="#">Dropdown Link <i className="uil uil-arrow-right"></i></a>
          <a href="#">Dropdown Link <i className="uil uil-arrow-right"></i></a>
        </div>
        <a href="#">Dropdown Link <i className="uil uil-arrow-right"></i></a>
        <a href="#">Dropdown Link <i className="uil uil-arrow-right"></i></a>
      </div>
    </div>
  </>
}

export default Dropdown