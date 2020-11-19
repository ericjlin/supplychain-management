import React from 'react';
import {
    Collapse, Col, Table, Form, Label,
    FormGroup, Input, Badge, Container,
    Button, Row, Card, CardText, CardBody,
    CardTitle, CardSubtitle,Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';
import CustomTable from "../common/CustomTable.jsx";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { withRouter } from "react-router-dom";
import customerJson from '../mock_data/customer';

class SupportDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isOpen: false,
            table_header: [],
            table_data: [],
            showTooltip: {},
            activeMarker: null,
            selectedMarkerInfo: {
                name: "",
                status: "Unknown"
            },
            markerData: [{
                "id" : 1,
                "location": {
                    "lat": 40.854885,
                    "lng": -88.081807},
                "status" : "operational",
                "orders": 20
            },
            {
                "id" : 2,
                "location": {
                    "lat": 30.266666,
                    "lng": -97.733330},
                "status" : "operational",
                "orders": 5
            },
            {
                "id" : 3,
                "location": {
                    "lat": 38.854885,
                    "lng": -88.081807},
                "status" : "operational",
                "orders": 100
            },
            {
                "id" : 4,
                "location": {
                    "lat": 37.773972,
                    "lng": -122.431297},
                "status" : "error",
                "orders": 0
            },
            {
                "id" : 5,
                "location": {
                    "lat": 40.730610 ,
                    "lng": -73.935242},
                "status" : "operational",
                "orders": 19
            }],
            customerTable: [],
            customerHeader: ["Name", "# of Warehouses"],
            isCustomerView: true,
            selectedCustomer: ""
        }
    }

    componentDidMount() {
        const role = localStorage.getItem('user');

        this.grabCustomer();
        this.setState({
            table_header : ["ID", "Name", "Orders", "Location", "Status"],
            table_data : [
                [1, "Alpha", "20", "Texas", "Operational"],
                [2, "Bravo", "5", "Nevada", "Operational"],
                [3, "Charlie", "100", "New York", "Sensor Issue"],
                [4, "Delta", "0", "San Francisco", "Operational"],
                [5, "Epsilon", "19", "Kansas", "Operational"],
                [6, "Foxtrot", "4", "Kansas", "No Sensors Detected"]
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

    grabCustomer = () =>  {
        let cust = []
        customerJson.forEach((customer) => {
            let tmp = [customer.name, customer.warehouses.length];
            cust.push(tmp);
        });
        this.setState({
            customerTable: cust
        });
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

    handleCustomerRowClick = (e, r) => {
        // handle clicking a row
        console.log(e.target, r);
        // condition check to see if row is for individual warehouse or for everything
        // clicking orders won't do anything
        this.setState({
            isCustomerView: !this.state.isCustomerView
        });
    }

    handleWarehouseRowClick = (e, r) =>{
        // handle the warehouse row click
        this.props.history.push({
            pathname: '/support_warehouse',
            state: {
                warehouseId: r[0],
                name: r[1]
            }
        });
    }

    backToCustomer = () => {
        this.setState({
            isCustomerView: !this.state.isCustomerView
        });
    }

    onMarkerClick = (props, marker) => {
        console.log(props);
        let h = props.name.split(" ");
        console.log(h);
        this.setState({
            activeMarker: marker,
            showTooltip: true,
            selectedMarkerInfo: {
                name: h[0],
                status: h[1]
            }
        });
    }

    onToolTipClose = (e) => {
        console.log(e);
        // e.preventDefault();
        this.setState({
            activeMarker: null,
            showTooltip: false
        });
    }

    // close tooltip if user clicks off the tooltip
    onMapClick = (e) => {
        console.log(e);
        if (this.state.showTooltip) {
            this.setState({
                activeMarker: null,
                showTooltip: false
            });
        }
    }



    render () {
        return(
                <div className="pt-2 container-fluid">
                    <Form>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Input name="search" id="search" placeholder="Enter a address, zip code or city...." />
                                </FormGroup>
                            </Col>
                            <Col>
                                <Button onClick={this.collapse}>Submit</Button>
                            </Col>
                            { !this.state.isCustomerView ?
                            <Col md="5">
                                <h2 >Currently Viewing Customer: Name</h2>
                            </Col>
                            : null}
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
                                onClick={this.onMapClick}
                                zoom={14}>
                                {
                                    this.state.markerData.map(
                                        (obj, index) => {
                                            let lat = parseFloat(obj.location.lat, 10);
                                            let lng = parseFloat(obj.location.lng, 10);
                                            return(
                                                <Marker
                                                    key={index}
                                                    name={`${obj.id} ${obj.status}`}
                                                    onClick={this.onMarkerClick}
                                                    position={{
                                                        lat: lat,
                                                        lng: lng
                                                    }}
                                                    />
                                    );})
                                }
                                    <InfoWindow
                                                visible={this.state.showTooltip}
                                                marker={this.state.activeMarker}
                                                onClose={this.onToolTipClose}
                                                >
                                                    <div>
                                                        <Row>
                                                            <Col>
                                                                <h6>Warehouse {this.state.selectedMarkerInfo.name}</h6>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-center">
                                                            <Col>
                                                                <Badge 
                                                                    color={this.state.selectedMarkerInfo.status === "error" ? 
                                                                    "danger" : "success"}>
                                                                    {this.state.selectedMarkerInfo.status}
                                                                </Badge>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                        </InfoWindow>
                            </Map>
                        </Col>
                        <Col md="5">
                            <Card height='100%' width="100%">
                                <CardBody>
                                { this.state.isCustomerView ? 
                                    <>
                                        <Row>
                                            <Col md="8">
                                                <h2>List of Customers</h2>
                                            </Col>
                                            
                                        </Row> 
                                        <CustomTable 
                                            title=""
                                            header={this.state.customerHeader}
                                            trows={this.state.customerTable}
                                            handleRowClick={this.handleCustomerRowClick}
                                            />
                                    </> :
                                    <>
                                        <Row>
                                            <Col md="8">
                                                <h2>List of Warehouses</h2>
                                            </Col>
                                            <Col md="4">
                                            <Button onClick={this.backToCustomer}>Go Back</Button>
                                        </Col>
                                        </Row>
                                        <CustomTable 
                                            title=""
                                            header={this.state.table_header}
                                            trows={this.state.table_data}
                                            handleRowClick={this.handleWarehouseRowClick}
                                            />
                                        </>
                                }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
                        <ModalHeader toggle={this.modalToggle}>Add Warehouse</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.addWarehouseSubmit}>
                                <FormGroup>
                                    <Label for="exampleEmail">Warehouse Name</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Name here..." />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Address</Label>
                                    <Input name="address"/>
                                    <Row>
                                        <Col>
                                            <Label>City</Label>
                                            <Input name="city"/>
                                        </Col>
                                        <Col>
                                            <Label>State</Label>
                                            <Input name="address"/>
                                        </Col>
                                        <Col>
                                            <Label>Zipcode</Label>
                                            <Input name="address"/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.modalToggle}>Add</Button>{' '}
                            <Button color="danger" onClick={this.modalToggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("")
  })(withRouter(SupportDashboard));