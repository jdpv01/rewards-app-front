import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EFIPuntos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {/*<li className="nav-item">
              <Link className="nav-link" to="/category">
                Acumula!
              </Link>
            </li>*/}
            <li className="nav-item">
              <Link className="nav-link" to="/redeem/choseStore">
                Aliados
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                  className="btn nav-link dropdown-toggle fw-bold"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
              >
                Conoce como ganar más!
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/blog">
                    Comenta y gana!
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/**">
                    Responde nuestras encuestas!
                  </Link>
                </li>
                {/*<li>*/}
                {/*<li>*/}
                {/*  <Link className="dropdown-item" to="/account/signin">*/}
                {/*    Sign In*/}
                {/*  </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <Link className="dropdown-item" to="/account/signup">*/}
                {/*    Sign Up*/}
                {/*  </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <hr className="dropdown-divider" />*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <Link className="dropdown-item" to="/checkout">*/}
                {/*    Checkout Page*/}
                {/*  </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <Link className="dropdown-item" to="/contact-us">*/}
                {/*    Contact Us*/}
                {/*  </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <Link className="dropdown-item" to="/blog">*/}
                {/*    Blog*/}
                {/*  </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <Link className="dropdown-item" to="/blog/detail">*/}
                {/*    Blog Detail*/}
                {/*  </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <hr className="dropdown-divider" />*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <Link className="dropdown-item" to="/fsafasf">*/}
                {/*    404 Page Not Found*/}
                {/*  </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <Link className="dropdown-item" to="/500">*/}
                {/*    500 Internal Server Error*/}
                {/*  </Link>*/}
                {/*</li>*/}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
