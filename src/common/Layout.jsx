import React from 'react';
import Navbar from './Navbar.jsx';

class Layout extends React.Component {
    render() {
        const container = {
            "paddingTop": "100px",
            "display": "flex",
            "flexDirection": "column",
            "minHeight": "90vh"
        }
        return(
            <div>
                <Navbar />
                {/* <div className="container"> */}
                    {this.props.children}
                {/* </div> */}
            </div>
        );
    }
}

export default Layout;