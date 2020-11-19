import React from 'react';
import Dashboard from './Dashboard.jsx';
import Layout from './common/Layout.jsx';
import InfraDashboard from './InfraManager/InfraDashboard.jsx';
import SupportDashboard from './IOTSupport/SupportDashboard.jsx';
import SupportWarehouse from './IOTSupport/SupportWarehouse.jsx';
import Sensors from './Sensors.jsx';
import Profile from './Profile.jsx';
import Warehouse from './Warehouse.jsx';

import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Switch
  } from "react-router-dom";

export default class LoggedInRoutes extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    checkRoles() {
        if (localStorage.getItem("user") == "support") {
            return "support";
        } else if (localStorage.getItem("user") == "manager") {
            return "manager";
        } else {
            return "supplier";
        }
    }

    render() {
        // conditional check to direct to correct dashboard
        return (
            <Layout>
                <Switch>
                    {/* <Route path="/manager" component={InfraDashboard} />
                    <Route path="/support" component={SupportDashboard} /> */}
                    <Route path="/sensors" component={Sensors} />
                    <Route path="/warehouse" component={Warehouse} />
                    <Route path="/support_warehouse" component={SupportWarehouse} />
                    <Route path="/"
                        render={props => {
                            if (this.checkRoles() === "support") {
                                return <SupportDashboard />;
                            } else if (this.checkRoles === "manager") {
                                return <InfraDashboard />;
                            } else {
                                return <Dashboard />;
                            }
                        }} />
                </Switch>
            </Layout>
        );
    }
}