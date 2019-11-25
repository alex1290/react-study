import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer/index'
import Header from './components/Header';
import routes from './components/routes';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer)

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <div className="container">
                    {routes.map((route,i)=>{
                        const {path,exact} = route;
                        return <Route 
                        key={i}
                        exact={exact}
                        path={path}
                        render={()=>(<route.component routes={routes} />)}
                        />
                    })}
                </div>
            </Provider>
        )
    }
}





ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <App />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
