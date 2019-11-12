import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import routes from './components/routes';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';



class App extends React.Component {
    render() {
        return (
            <div>
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
            </div>
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
