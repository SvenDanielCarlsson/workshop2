import React from "react";
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from "react-router-dom";

const DemoRouter = () => {

    return(

        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/home" component={Home} />
                <Route path="/person" component={Person} />
                <Route path="/about" component={About} />
                <Route path="" component={NotFound} />
            </Switch>
        </Router>
    )
};

const Header = () => {
    return(
        <nav>
            <ul className="nav bg-dark">
                <li><Link className="nav-link" to="/">"LOGO"</Link></li>
                <li><Link className="nav-link" to="/home">Home</Link></li>
                <li><Link className="nav-link" to="/person">Person</Link></li>
                <li><Link className="nav-link" to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

/*const Header = () => {
    return(
        <nav>
            <div className>
                <NavLink to="/">"LOGO"</NavLink>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/person">Person</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        </nav>
    );
}*/

    const Welcome = () => {
        return (<b>Welcome page</b>);
    }

    const About = () => {
        return (<b>About Page</b>);
    }

    const Home =() => {
        return (<b>Home Page</b>);
    }

    const Person = () => {
        return(<b>Person Page</b>);
    }

    const NotFound = () => {
        return(<b>NotFound Page</b>);
    }

    //return (Header);    // return for DemoRouter


export default DemoRouter;