import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
  } from 'reactstrap';
  import {withRouter} from 'react-router-dom'; 

class NavBar extends React.Component {

    handleLogout = (e) => {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        return(
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Welcome!</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                        <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                    <Button onClick={this.handleLogout}>Logout</Button>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavBar);