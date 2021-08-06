import React from 'react';
import ToDo from "./componets/Pages/ToDo/ToDo";
import About from './componets/Pages/About/About';
// import SingleTask from './componets/Pages/SingleTask/SingleTask';
import SingleTaskHooks from './componets/Pages/SingleTask/SingleTaskHooks';
import NotFound from './componets/Pages/NotFound/NotFound';
import NavMenu from './componets/NavMenu/NavMenu';
import Contact from './componets/Pages/Contact/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavMenu />
      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/task' exact component={ToDo} />
        <Route path='/about' exact component={About} />
        <Route path='/contact' exact component={Contact} />
        {/* <Route path='/task/:id' exact component={SingleTask} /> */}
        <Route path='/task/:id' exact component={SingleTaskHooks} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='404'/>
      </Switch>
    </div>
  );
}

export default App;
