import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './components/Main';
import { Catalog } from './components/Catalog';
import { Search } from './components/Search';
import { ProductPage } from './components/ProductPage';
import { About } from './components/About';
import { Contacts } from './components/Contacts';
import { ConnectedCart } from './components/Cart';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Router>
      <Menu />
      <Layout>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/catalog" exact>
            <Catalog>
              <Search />
            </Catalog>
          </Route>
          <Route path="/catalog/:id" component={ProductPage} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/cart" component={ConnectedCart} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
      <Footer />
    </Router>
  );
}

export default App;
