import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import TopMenu from "./components/TopMenu";
import HeaderView from "./components/HeaderView";
import Footer from "./components/Footer";
import "./App.min.css";
import ChoseStore from "./components/blog/ChoseStore";
import UploadInvoicePhoto from "./components/blog/UploadInvoicePhoto";
import ChoseProduct from "./components/blog/ChoseProducts";
import Wallet from "./components/account/Wallet";
import ChoseStoreForRedeem from "./components/account/ChoseStoreForRedeem";
import RedeemCode from "./components/account/RedeemCode";
import Profile from "./components/account/Profile";
const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const NotificationView = lazy(() => import("./views/account/Notification"));
//const ProfileView = lazy(() => import("./views/account/Profile"));
const ProductListView = lazy(() => import("./views/promotion/List"));
const ProductDetailView = lazy(() => import("./views/promotion/Detail"));
const StarZoneView = lazy(() => import("./views/promotion/StarZone"));
const FavoriteView = lazy(() => import("./views/points/Favorite"));
const PointsResume = lazy(() => import("./views/points/PointsResume"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));
const BlogView = lazy(() => import("./views/blog/Blog"));
const BlogDetailView = lazy(() => import("./views/blog/Detail"));
//import { data as dataX, setData as setDataX } from "./components/others/storageManager";

function App() {

  useEffect(() => {
    document.title = 'EFIPuntos';
  }, []);

  return (
    <BrowserRouter>
      <React.Fragment>
        <HeaderView />
        <TopMenu />
        <Suspense
          fallback={
            <div className="text-white text-center mt-3">Loading...</div>
          }
        >
          <Routes>
            <Route exact path="/" element={<HomeView/>} />
            <Route exact path="/account/signin" element={<SignInView/>} />
            <Route exact path="/account/signup" element={<SignUpView/>} />
            <Route
              exact
              path="/account/forgotpassword"
              element={<ForgotPasswordView/>}
            />
            {/*<Route exact path="/account/profile" element={<ProfileView/>} />*/}
            <Route exact path="/account/profile" element={<Profile/>}/>
            <Route exact path="/account/choseStore" element={<ChoseStore/>}/>
            <Route exact path="/account/orders" element={<OrdersView/>} />
            <Route exact path="/account/wishlist" element={<WishlistView/>} />
            <Route
              exact
              path="/account/notification"
              element={<NotificationView/>}
            />
            <Route exact path="/redeem/code" element={<RedeemCode/>}/>
            <Route exact path="/redeem/choseStore" element={<ChoseStoreForRedeem/>}/>
            <Route exact path="/wallet" element={<Wallet/>}/>
            <Route exact path="/uploadInvoice" element={<UploadInvoicePhoto/>}/>
            <Route exact path="/choseProduct" element={<ChoseProduct/>}/>
            <Route exact path="/category" element={<ProductListView/>} />
            <Route exact path="/product/detail" element={<ProductDetailView/>} />
            <Route exact path="/star/zone" element={<StarZoneView/>} />
            <Route exact path="/favorite" element={<FavoriteView/>} />
            <Route exact path="/points-resume" element={<PointsResume />} />
            <Route exact path="/contact-us" element={<ContactUsView/>} />
            <Route exact path="/support" element={<SupportView/>} />
            <Route exact path="/blog" element={<BlogView/>} />
            <Route exact path="/blog/detail" element={<BlogDetailView/>} />
            <Route exact path="/500" element={<InternalServerErrorView/>} />
            <Route path="*" element={<NotFoundView/>} />
          </Routes>
        </Suspense>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
