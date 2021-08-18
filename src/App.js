import React from 'react';
import ToDo from "./componets/Pages/ToDo/ToDo";
import About from './componets/Pages/About/About';
import SingleTask from './componets/Pages/SingleTask/SingleTask';
// import SingleTaskHooks from './componets/Pages/SingleTask/SingleTaskHooks';
import NotFound from './componets/Pages/NotFound/NotFound';
import NavMenu from './componets/NavMenu/NavMenu';
import Contact from './componets/Pages/Contact/Contact';
import Spinner from './componets/Spinner/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

function App(props) {

  const { errorMessage, successMessage, loading } = props;

  const routes = [
    {
      path: '/',
      component: ToDo
    },
    {
      path: '/task',
      component: ToDo
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/task/:id',
      component: SingleTask
    },
    {
      path: '/404',
      component: NotFound
    }
  ];

  if (errorMessage) {
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (successMessage) {
    toast.success(successMessage, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      <NavMenu />
      <Switch>
        {
          routes.map((item, index) =>
            <Route
              path={item.path}
              exact
              component={item.component}
              key={index}
            />)}
        <Redirect to='404' />
      </Switch>
      {/* <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/task' exact component={ToDo} />
        <Route path='/about' exact component={About} />
        <Route path='/contact' exact component={Contact} />
        //<Route path='/task/:id' exact component={SingleTask} />
        <Route path='/task/:id' exact component={SingleTaskHooks} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='404' />
      </Switch> */}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading && <Spinner />}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(App);
