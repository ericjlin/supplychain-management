import React from 'react';
import Dashboard from './Dashboard.jsx';
import Layout from './common/Layout.jsx';
import InfraDashboard from './InfraManager/InfraDashboard.jsx';
import SupportDashboard from './IOTSupport/SupportDashboard.jsx';
import Sensors from './Sensors.jsx';
import Profile from './Profile.jsx';
import Warehouse from './Warehouse.jsx';
import Diagnostic from './Diagnostic.jsx';

import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";

export default class LoggedInRoutes extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        // conditional check to direct to correct dashboard
        return (
            <Layout>
                <Switch>
                    <Route path="/manager" component={InfraDashboard} />
                    <Route path="/support" component={SupportDashboard} />
                    <Route path="/sensors" component={Sensors} />
                    <Route path="/warehouse" component={Warehouse} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/diagnostic" component={Diagnostic} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </Layout>
        );
    }
}