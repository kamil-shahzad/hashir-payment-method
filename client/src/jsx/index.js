import React, { useContext } from 'react'
/// React router dom
import {Routes, Route, Outlet } from 'react-router-dom'
/// Css
import './index.css'
import './chart.css'
import './step.css'

/// Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'
import { ThemeContext } from "../context/ThemeContext";
/// Dashboard
import Home from "./components/Dashboard/Home";
import Analytics from "./components/Dashboard/Analytics";
import Customers from "./components/Dashboard/Customers";
import Event from "./components/Dashboard/Event";
import EventDetail from "./components/Dashboard/EventDetail";
import Reviews from "./components/Dashboard/Reviews";
import Task from './components/Dashboard/Task';

/// App
import AppProfile from './components/AppsMenu/AppProfile/AppProfile'
import PostDetails from './components/AppsMenu/AppProfile/PostDetails'
import Compose from './components/AppsMenu/Email/Compose/Compose'
import Inbox from './components/AppsMenu/Email/Inbox/Inbox'
import Read from './components/AppsMenu/Email/Read/Read'
import Calendar from './components/AppsMenu/Calendar/Calendar'

/// Product List
import ProductGrid from './components/AppsMenu/Shop/ProductGrid/ProductGrid'
import ProductList from './components/AppsMenu/Shop/ProductList/ProductList'
import ProductDetail from './components/AppsMenu/Shop/ProductGrid/ProductDetail'
import Checkout from './components/AppsMenu/Shop/Checkout/Checkout'
import Invoice from './components/AppsMenu/Shop/Invoice/Invoice'
import ProductOrder from './components/AppsMenu/Shop/ProductOrder'
import EcomCustomers from './components/AppsMenu/Shop/Customers/Customers'

/// Charts
import RechartJs from './components/charts/rechart'
import ChartJs from './components/charts/Chartjs'
//import Chartist from './components/charts/chartist'
import SparklineChart from './components/charts/Sparkline'
import ApexChart from './components/charts/apexcharts'

/// Bootstrap
import UiAlert from './components/bootstrap/Alert'
import UiAccordion from './components/bootstrap/Accordion'
import UiBadge from './components/bootstrap/Badge'
import UiButton from './components/bootstrap/Button'
import UiModal from './components/bootstrap/Modal'
import UiButtonGroup from './components/bootstrap/ButtonGroup'
import UiListGroup from './components/bootstrap/ListGroup'
import UiCards from './components/bootstrap/Cards'
import UiCarousel from './components/bootstrap/Carousel'
import UiDropDown from './components/bootstrap/DropDown'
import UiPopOver from './components/bootstrap/PopOver'
import UiProgressBar from './components/bootstrap/ProgressBar'
import UiTab from './components/bootstrap/Tab'
import UiPagination from './components/bootstrap/Pagination'
import UiGrid from './components/bootstrap/Grid'
import UiTypography from './components/bootstrap/Typography'

/// Plugins
import Select2 from './components/PluginsMenu/Select2/Select2'
//import Nestable from './components/PluginsMenu/Nestable/Nestable'
//import MainNouiSlider from './components/PluginsMenu/Noui Slider/MainNouiSlider'
import MainSweetAlert from './components/PluginsMenu/SweetAlert/SweetAlert'
import Toastr from './components/PluginsMenu/Toastr/Toastr'
import JqvMap from './components/PluginsMenu/JqvMap/JqvMap'
import Lightgallery from './components/PluginsMenu/Lightgallery/Lightgallery'


/// Widget
import Widget from './pages/Widget'

/// Table
import DataTable from './components/table/DataTable'
import BootstrapTable from './components/table/BootstrapTable'
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";


/// Form
//import ReduxForm from "./components/Forms/ReduxForm/ReduxForm";
//import WizardForm from "./components/Forms/ReduxWizard/Index";
import Element from './components/Forms/Element/Element'
import Wizard from './components/Forms/Wizard/Wizard'
import CkEditor from './components/Forms/CkEditor/CkEditor'
import Pickers from './components/Forms/Pickers/Pickers'
import FormValidation from "./components/Forms/FormValidation/FormValidation";


//payment Forms:


/// Pages
import Registration from './pages/Registration'
import Login from './pages/Login'
import LockScreen from './pages/LockScreen'
import Error400 from './pages/Error400'
import Error403 from './pages/Error403'
import Error404 from './pages/Error404'
import Error500 from './pages/Error500'
import Error503 from './pages/Error503'
import Todo from './pages/Todo';

//Scroll To Top
import ScrollToTop from './layouts/ScrollToTop';
import { Jazzcash } from './PaymentForms/Jazzcash'


const Markup = () => {
  // let path = window.location.pathname
  // path = path.split('/')
  // path = path[path.length - 1]
  // let pagePath = path.split('-').includes('page')
  // const [activeEvent, setActiveEvent] = useState(!path)

  const allroutes = [
    /// Dashboard
    { url: "", component: <Home/> },
    { url: "dashboard", component: <Home/> },
    { url: "event", component: <Event/> },
    { url: "event-detail", component: <EventDetail /> },
    { url: "customers", component: <Customers/> },
    { url: "analytics", component: <Analytics/> },
    { url: "reviews", component: <Reviews/> },
	{ url: 'task', component: <Task/> },

    /// Apps
    { url: 'app-profile', component: <AppProfile/> },
    { url: 'post-details', component: <PostDetails/> },
    { url: 'email-compose', component: <Compose/> },
    { url: 'email-inbox', component: <Inbox/> },
    { url: 'email-read', component: <Read/> },
    { url: 'app-calender', component: <Calendar/> },
    

    /// Chart
    { url: 'chart-sparkline', component: <SparklineChart/> },
    { url: 'chart-chartjs', component: <ChartJs/> },
    //{ url: 'chart-chartist', component: Chartist },
    { url: 'chart-apexchart', component: <ApexChart/> },
    { url: 'chart-rechart', component: <RechartJs/> },

    /// Bootstrap
    { url: 'ui-alert', component: <UiAlert/> },
    { url: 'ui-badge', component: <UiBadge/> },
    { url: 'ui-button', component: <UiButton/> },
    { url: 'ui-modal', component: <UiModal/> },
    { url: 'ui-button-group', component: <UiButtonGroup/> },
    { url: 'ui-accordion', component: <UiAccordion/> },
    { url: 'ui-list-group', component: <UiListGroup/> },
    { url: 'ui-card', component: <UiCards/> },
    { url: 'ui-carousel', component: <UiCarousel/> },
    { url: 'ui-dropdown', component: <UiDropDown/> },
    { url: 'ui-popover', component: <UiPopOver/> },
    { url: 'ui-progressbar', component: <UiProgressBar/> },
    { url: 'ui-tab', component: <UiTab/> },
    { url: 'ui-pagination', component: <UiPagination/> },
    { url: 'ui-typography', component: <UiTypography/> },
    { url: 'ui-grid', component: <UiGrid/> },

    /// Plugin
    { url: 'uc-select2', component: <Select2/> },
    //{ url: 'uc-nestable', component: Nestable },
    //{ url: 'uc-noui-slider', component: MainNouiSlider },
    { url: 'uc-sweetalert', component: <MainSweetAlert/> },
    { url: 'uc-toastr', component: <Toastr/> },
    { url: 'map-jqvmap', component: <JqvMap/> },
    { url: 'uc-lightgallery', component: <Lightgallery/> },


    /// Widget
   { url: 'widget-basic', component: <Widget /> },

    /// Shop
    { url: 'ecom-product-grid', component: <ProductGrid/> },
    { url: 'ecom-product-list', component: <ProductList/> },
    { url: 'ecom-product-detail', component: <ProductDetail/> },
    { url: 'ecom-product-order', component: <ProductOrder/> },
    { url: 'ecom-checkout', component: <Checkout/> },
    { url: 'ecom-invoice', component: <Invoice/> },
    { url: 'ecom-product-detail', component: <ProductDetail/> },
    { url: 'ecom-customers', component: <EcomCustomers/> },

    /// Form
    
    //payment form
    {url: 'jazzcash' , component: <Jazzcash/>},

    //{ url: 'form-redux', component: ReduxForm },
    //{ url: 'form-redux-wizard', component: WizardForm },
    { url: 'form-element', component: <Element/> },
    { url: 'form-wizard', component: <Wizard/> },
    { url: "form-ckeditor", component: <CkEditor /> },
    { url: 'form-pickers', component: <Pickers/> },
    { url: "form-validation", component: <FormValidation /> },

    /// table
    { url: 'table-datatable-basic', component: <DataTable/> },
    { url: 'table-bootstrap-basic', component: <BootstrapTable/> },
    { url: 'table-filtering', component: <FilteringTable/> },
    { url: 'table-sorting', component: <SortingTable /> },

    /// pages
    { url: 'page-register', component: <Registration/> },
    { url: 'page-lock-screen', component: <LockScreen/> },
    { url: 'page-login', component: <Login/> },
    { url: 'todo', component: <Todo/> },
  ]

  return (
       <> 
         <Routes>
          <Route path='page-lock-screen' element= {<LockScreen />} />
          <Route path='page-error-400' element={<Error400/>} />
          <Route path='page-error-403' element={<Error403/>} />
          <Route path='page-error-404' element={<Error404/>} />
          <Route path='page-error-500' element={<Error500/>} />
          <Route path='page-error-503' element={<Error503/>} />
            <Route  element={<MainLayout />} > 
                {allroutes.map((data, i) => (
                  <Route
                      key={i}
                      exact
                      path={`${data.url}`}
                      element={data.component}
                    />
                ))}
            </Route>
          </Routes>
          <ScrollToTop />
       </>
  )
}

function MainLayout(){  
  return (
    <div id="main-wrapper" 
        className={`show `}
      >  
        <Nav />
        <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
          <div className="container-fluid">
            <Outlet />                
          </div>
        </div>
      <Footer />
    </div>
  )

};

export default Markup
