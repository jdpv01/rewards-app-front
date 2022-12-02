import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { ReactComponent as IconBellFill } from "bootstrap-icons/icons/bell-fill.svg";
import { ReactComponent as IconInfoCircleFill } from "bootstrap-icons/icons/info-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthProvider";

const Header = () => {

  const { auth } = useContext(AuthContext)

  return (
    <React.Fragment>
      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <Link className="h3" to="/">
                <img
                  alt="logo"
                  src="../../images/logo.png"
                />
                {" "}<strong>EFIPuntos</strong>
              </Link>
            </div>
            <div className="col-md-5">
              <Search className="badge"/>
            </div>
            <div className="col-md-4">
              <div className="position-relative d-inline me-3">
                <Link to="/favorite" className="btn btn-primary">
                  <IconStarFill className="i-va" />
                  <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                    {/*2*/}
                  </div>
                </Link>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary rounded-circle border me-3"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Profile"
                  data-bs-toggle="dropdown"
                >
                  <FontAwesomeIcon icon={faUser} className="text-light" />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      <IconPersonBadgeFill /> Perfil
                    </Link>
                  </li>
                  {/*<li>*/}
                  {/*  <Link className="dropdown-item" to="/star/zone">*/}
                  {/*    <IconStarFill className="text-warning" /> Star Zone*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link className="dropdown-item" to="/account/orders">*/}
                  {/*    <IconListCheck className="text-primary" /> Orders*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link className="dropdown-item" to="/account/wishlist">*/}
                  {/*    <IconHeartFill className="text-danger" /> Wishlist*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/notification">
                      <IconBellFill className="text-primary" /> Notificaciones
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/support">
                      <IconInfoCircleFill className="text-success" /> Ayuda
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      <IconDoorClosedFill className="text-danger" /> Salir
                    </Link>
                  </li>
                </ul>
              </div>
              <Link to="/account/signin" > Iniciar sesión</Link> |{" "}
              <Link to="/account/signup" > Registrarse</Link>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
export default Header;
