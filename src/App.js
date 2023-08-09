/** @format */

import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Regsiter } from './pages/login/Regsiter';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DetailsPages } from './pages/details/DetailsPages';
import { Account } from './pages/account/Account';
import { Create } from './pages/blogs/Create';
import { CreateCategory } from './pages/category/createCategory.jsx';
import { Card } from './components/blog/blogCard';
import { SingleCard } from './components/blog/singleblog';

const App = () => {
  //after login
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
            component={Home}
          />
          <Route
            exact
            path='/login'
            component={Login}
          />
          <Route
            exact
            path='/register'
            component={Regsiter}
          />
          <Route
            exact
            path='/blog/:id'
            component={DetailsPages}
          />
          <Route
            exact
            path='/account'
            component={Account}
          />
          <Route
            exact
            path='/create'
            component={Create}
          />
          <Route
            exact
            path='/blogs/:type'
            component={Card}
          />
          <Route
            exact
            path='/single-Card'
            component={SingleCard}
          />
          <Route
            exact
            path='/category'
            component={CreateCategory}
          />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};
export default App;
