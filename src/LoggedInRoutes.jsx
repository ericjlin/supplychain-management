import React from 'react';
import Dashboard from './Dashboard.jsx';
import Layout from './common/Layout.jsx';
import InfraDashboard from './InfraManager/InfraDashboard.jsx';
import SupportDashboard from './IOTSupport/SupportDashboard.jsx';

import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";

export default class LoggedInRoutes extends React.Component {
    render() {
        // conditional check to direct to correct dashboard
        return (
            <Layout>
                <Switch>
                    <Route path="/" component={Dashboard} />
                    <Route path="/manager" component={InfraDashboard} />
                    <Route path="/support" component={SupportDashboard} />
                </Switch>
            </Layout>
        );
    }
}