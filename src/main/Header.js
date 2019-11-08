import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import routes from './routes';
import './pages';
// import {index} from './pages';
// console.log(index)


class Header extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <header className="header">
                <Link className="logo" to="/">
                    <img src={logo} alt="homepage" />
                    <span>React</span>
                </Link>
                <ul className="menu">
                    {routes.map((route, i) => {
                        if (route.name === '首頁') { return null;}
                        return (
                            <li className="menuItem" key={i}>
                                <Link
                                    className="menuLink"
                                    to={route.path}>
                                    {route.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </header>
        )
    }
}
export default Header;