import React from 'react';
import {
    Col, Form, Table,
    FormGroup, Input,
    Button, Row, Card, CardText, CardBody,
    CardTitle, CardSubtitle, Container
  } from 'reactstrap';
  import CustomTable from "./common/CustomTable.jsx";
  import { ResponsiveContainer,LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
  import {withRouter, Link} from 'react-router-dom';
/*
TODO: Work on modal forms for edit profile, edit billing and view charts
*/
  class Profile extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
            chart_data: [],
            role: localStorage.getItem("user") ? 
            localStorage.getItem("user") : ""
          }
      }

      componentDidMount() {

        // test data
        this.setState({
            chart_data : [
            {name: '15:05', temperature: 68},
            {name: '15:10', temperature: 69}, 
            {name: '15:15', temperature: 66}, 
            {name: '15:20', temperature: 66},
            {name: '15:25', temperature: 68},
            {name: '15:30', temperature: 70},
            {name: '15:35', temperature: 71},
            {name: '15:40', temperature: 71},
            {name: '15:45', temperature: 71},
            {name: '15:50', temperature: 75},
            {name: '15:55', temperature: 75},
            {name: '16:00', temperature: 76}
        ]
        });
    }
      render() {
          return(
                <Container className="pt-4">
                    
                    <Row className="justify-content-md-center">
                        
                        <Col xs={12} md={5}>
                            <h2>Profile</h2>
                            <Row>
                                <img src="./logo512.png" style={{height: '200px', width:'200px'}} class="rounded float-left" />
                            </Row>
                            <Row>
                                <Table borderless={true}>
                                    <thead>
                                        <tr>
                                            <th>Name of the User</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Role:</th>
                                            <th scope="row">{this.state.role}</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <th scope="row">1234 Rainbow Rd</th>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <th scope="row">City, State Zipcode</th>
                                        </tr>
                                        <tr>
                                        <th scope="row">Email:</th>
                                            <th scope="row">test@test.com</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Phone Number:</th>
                                            <th scope="row">+1(888)-009-1234</th>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button>Edit Profile</Button>
                            </Row>
                            
                        </Col>
                        <Col className="pt-2" md={7}>
                                <h2>Billing Information</h2>
                            <Row>
                                <Table borderless={true}>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Credit Card Number:</th>
                                            <th scope="row">*******1889</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Billing Address:</th>
                                            <th scope="row">1234 Rainbow Rd</th>
                                        </tr>
                                        <tr>
                                        <th scope="row"></th>
                                            <th scope="row">City, State Zipcode</th>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button>Edit Billing</Button>
                            </Row>
                            <Row className="pl-2 pt-4">
                                <h2>Track Expenses</h2>
                            </Row>
                            <Row>
                                <ResponsiveContainer className="pt-2" width="100%" height={500}>
                                    <LineChart  data={this.state.chart_data}>
                                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </Row>
                            <Button>See Details</Button>
                        </Col>
                    </Row>
                </Container>
          );
      }
  }

  export default Profile;