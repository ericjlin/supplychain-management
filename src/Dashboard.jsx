import React from 'react';
import {
    Collapse, Col, Table, Form, Label,
    FormGroup, Input, Badge, Container,
    Button, Row, Card, CardText, CardBody,
    CardTitle, CardSubtitle,Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';
import CustomTable from "./common/CustomTable.jsx";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { withRouter } from "react-router-dom";


 class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isOpen: false,
            table_header: [],
            table_data: [],
            showTooltip: {},
            activeMarker: [],
            markerData: [{
                id : "1",
                location: {
                    lat: 40.854885,
                    lng: -88.081807},
                status : "operational",
                orders: 20
            },
            {
                id : "2",
                location: {
                    lat: 30.266666,
                    lng: -97.733330},
                status : "operational",
                orders: 5
            },
            {
                id : "3",
                location: {
                    lat: 38.854885,
                    lng: -88.081807},
                status : "operational",
                orders: 100
            },
            {
                id : "4",
                location: {
                    lat: 37.773972,
                    lng: -122.431297},
                status : "error",
                orders: 0
            },
            {
                id : "5",
                location: {
                    lat: 40.730610 ,
                    lng: -73.935242},
                status : "operational",
                orders: 19
            }]
        }
    }

    componentDidMount() {
        const role = localStorage.getItem('user');
        if (role === 'manager' || role === 'support') {
            // show customers
            console.log('manager or support!');
            this.chart_data = [
                ["Customer1", "Data", "Data"],
                ["Customer1", "Data", "Data"],
                ["Customer1", "Data", "Data"],
                ["Customer1", "Data", "Data"],
                ["Customer1", "Data", "Data"],
            ];
        } else if (role === 'supplier') {
            // show current user warehouses
            console.log('supplier!');
        }

        // let showTooltip = this.state.showTooltip;
        // this.state.markerData.forEach((obj) => {
        //     showTooltip[obj.id] = false;
        // });
        // this.setState({
        //     showTooltip : showTooltip
        // });

        this.setState({
            table_header : ["ID", "Name", "Orders", "Location", "Status"],
            table_data : [
                [1, "Alpha", "20", "Texas", "Operational"],
                [2, "Bravo", "5", "Nevada", "Operational"],
                [3, "Charlie", "100", "New York", "Sensor Issue"],
                [4, "Delta", "0", "San Francisco", "Operational"],
                [5, "Epsilon", "19", "Kansas", "Operational"]
            ]
        });
        // grab all warehouse in user's home region and load on map
        // default detailed warehouse is first on the list 
        // run a condition check on role
        // Manager and IOT Support will get table of customer
    }

    // need list of longitude and latitude to define marker locations
    searchWarehouse = (e) => {
        // search warehouse
    }

    modalToggle = (e) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal
        });
    }

    collapse = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleRowClick = (e, r) => {
        // handle clicking a row
        console.log(e.target, r);
        // condition check to see if row is for individual warehouse or for everything
        // clicking orders won't do anything
        this.props.history.push({
            pathname: '/warehouse',
            state: {
                warehouseId: r[0]
            }
        });

    }

    onMarkerClick = (props, marker) => {
        let m = this.state.activeMarker;
        m.push(marker);
        console.log(props);
        this.setState({
            activeMarker: m,
            showTooltip: true
        });
    }

    onToolTipClose = (e) => {
        console.log(e);
        e.preventDefault();
        this.setState({
            activeMarker: null,
            showTooltip: false
        });
    }

    // close tooltip if user clicks off the tooltip
    // onMapClick = (e) => {
    //     console.log(e);
    //     if (this.state.showTooltip) {
    //         this.setState({
    //             activeMarker: null,
    //             showTooltip: false
    //         });
    //     }
    // }

    render () {
        const map_data = [
            {
                id : "1",
                location: {
                    lat: 40.854885,
                    lng: -88.081807},
                status : "operational",
                orders: 20
            },
            {
                id : "2",
                location: {
                    lat: 30.266666,
                    lng: -97.733330},
                status : "operational",
                orders: 5
            },
            {
                id : "3",
                location: {
                    lat: 38.854885,
                    lng: -88.081807},
                status : "operational",
                orders: 100
            },
            {
                id : "4",
                location: {
                    lat: 37.773972,
                    lng: -122.431297},
                status : "error",
                orders: 0
            },
            {
                id : "5",
                location: {
                    lat: 40.730610 ,
                    lng: -73.935242},
                status : "operational",
                orders: 19
            }
        ];
        return(
                // <div className="pl-3 pt-2">
                <div className="pt-2 container-fluid">
                    <Form>
                        <Row>
                            <Col>
                            <FormGroup>
                                <Input name="search" id="search" placeholder="Enter a address, zip code or city...." />
                            </FormGroup>
                            </Col>
                            <Col>
                            <Button onClick={this.collapse}>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col md="7">
                            <Map 
                                google={this.props.google} 
                                style={{width: '90%', height: '800px', position: 'relative'}}
                                initialCenter={{
                                    lat: 40.854885,
                                    lng: -88.081807
                                }}
                                zoom={14}>
                                {
                                    map_data.map(
                                        (obj, index) => {
                                            let lat = parseFloat(obj.location.lat, 10);
                                            let lng = parseFloat(obj.location.lng, 10);
                                            let wareid = obj.id
                                            console.log("test", lat, lng);
                                            return(
                                                <Marker
                                                    key={index}
                                                    name={obj.id}
                                                    onClick={this.onMarkerClick}
                                                    position={{
                                                        lat: lat,
                                                        lng: lng
                                                    }}
                                                    >

                                                <InfoWindow 
                                                key={index + "_info"}
                                                name={wareid}
                                                visible={this.state.showTooltip}
                                                marker={this.state.activeMarker}
                                                onClose={this.onToolTipClose}
                                                >
                                                    <div key={index}>
                                                        <Row>
                                                            <Col>
                                                                <h6>Warehouse {obj.id}</h6>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-center">
                                                            <Col>
                                                                <Badge color="success">{obj.status}</Badge>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </InfoWindow>
                                                </Marker>
                                    );})
                                }
                            </Map>
                        </Col>
                        <Col md="5">
                        <Card height='100%' width="100%">
                            <CardBody>
                            <Row>
                                <Col md="10">
                                    <h2>List of Warehouses</h2>
                                </Col>
                                <Col md="1">
                                    <Button onClick={this.modalToggle}>Add</Button>
                                </Col>
                            </Row>
                            <CustomTable 
                                title=""
                                header={this.state.table_header}
                                trows={this.state.table_data}
                                handleRowClick={this.handleRowClick}
                                />
                                </CardBody>
                                </Card>
                        </Col>
                    </Row>


                    <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
                            <ModalHeader toggle={this.modalToggle}>Add Warehouse</ModalHeader>
                        <ModalBody>
                            <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Warehouse Name</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Name here..." />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Location</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="" />
                            </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.modalToggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("")
  })(withRouter(Dashboard));