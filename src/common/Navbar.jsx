import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown, DropdownItem, DropdownToggle, DropdownMenu
  } from 'reactstrap';
  import {withRouter, Link} from 'react-router-dom'; 

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileToggle: false
        }
    }

    profileToggle = () => {
        this.setState({
            profileToggle: !this.state.profileToggle
        });
    }

    handleLogout = (e) => {
        localStorage.clear();
        this.props.history.push('/login');
    }

    //prop that checks role

    render() {
        return(
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Welcome!</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/sensors">Sensors</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/warehouse">Warehouse(Test)</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/diagnostic">Sensor Diagnostic(Test)</NavLink>
                        </NavItem>
                    </Nav>
                    <Dropdown className="pr-2" isOpen={this.state.profileToggle} toggle={this.profileToggle}>
                        <DropdownToggle caret>
                            Profile
                            </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Profile</DropdownItem>
                            <DropdownItem href="/profile">Settings</DropdownItem>
                            <DropdownItem href="">Support</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavBar);