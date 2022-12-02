import React, { Component, lazy } from "react";
import { Link } from "react-router-dom";
import { data } from "../../data";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
const Banner = lazy(() => import("../../components/carousel/Banner"));
const CardList = lazy(() => import("../../components/blog/CardList"));
const Widgets = lazy(() => import("../../components/blog/Widgets"));

class BlogView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="container my-3">
        <Banner
          className="mb-3"
          id="carouselBlogBanner"
          data={data.blogBanner}
        />

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">
                  Cuidado personal
                </strong>
                <h4 className="mb-0">Colgate® Luminous White Lovers Vino y Tabaco 70g</h4>
                <div className="mb-1 text-muted small">Oct 06, 2020</div>
                <p className="card-text mb-auto">
                  Colgate® Luminous White Lovers Vino es la pasta de dientes blanqueadora clínicamente comprobada y especialmente desarrollada
                  para eliminar hasta las manchas difíciles en los dientes* como las causadas por el consumo de vino y tabaco, para una sonrisa más blanca.
                </p>
                <Link to="/" className="stretched-link btn btn-sm btn-light">
                  Leer
                  <IconChevronRight />
                </Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img src="./../images/products/luminous-white-vino-es.jpg.rendition.300.300.webp" alt="..." />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-success">
                  Cuidado personal
                </strong>
                <h4 className="mb-0">Cepillo Dental Colgate® Encías Therapy</h4>
                <div className="mb-1 text-muted small">Oct 08, 2020</div>
                <p className="mb-auto">
                  Para personas que buscan mantener sus encías sanas, el cepillo dental Colgate Encías Therapy masajea suavemente
                  y ayuda a revitalizar las encías otorgando una limpieza bucal superior y espumante  con +9.800 cerdas suaves multi-nivel.
                </p>
                <Link to="/" className="stretched-link btn btn-sm btn-light">
                  Leer
                  <IconChevronRight />
                </Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img src="./../images/products/colgate-encias-therapy-2022.jpg.rendition.300.300.webp" alt="..." />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            {data.blogList.map((item, idx) => (
              <CardList key={idx} data={item} />
            ))}
          </div>
          <div className="col-md-4">
            <Widgets />
          </div>
        </div>
      </div>
    );
  }
}

export default BlogView;
