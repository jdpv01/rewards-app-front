import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb rounded-0">
        <li className="breadcrumb-item">
          <Link to="/" title="Home">
            Aseo personal
          </Link>
        </li>
        {/*<li className="breadcrumb-item">*/}
        {/*  <Link to="/" title="Men">*/}
        {/*    Higiene dental*/}
        {/*  </Link>*/}
        {/*</li>*/}
        <li className="breadcrumb-item active" aria-current="page">
          Colgate
        </li>
      </ol>
    </nav>
  );
};
export default Breadcrumb;
