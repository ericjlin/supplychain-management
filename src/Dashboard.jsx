import React from 'react';
import {
    Collapse, Col, Table, Form, Label,
    FormGroup, Input, Badge, Container,
    Button, Row, Card, CardText, CardBody,
    CardTitle, CardSubtitle,Modal, ModalHeader, ModalBody, ModalFooter,
    ButtonGroup, 
  } from 'reactstrap';
import { useMediaQuery, MediaQuery } from 'react-responsive';
import CustomTable from "./common/CustomTable.jsx";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { withRouter } from "react-router-dom";
import Geocode from "react-geocode";


 class Dashboard extends React.Component {

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
            }],
            deleteModal: false,
            selectedLocation: {
                lat: "",
                lng: ""
            }
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

        this.setState({
            table_header : ["Name", "Orders", "Location", "Status"],
            table_data : [
                ["Alpha", "20", "Texas", "Operational"],
                ["Bravo", "5", "Nevada", "Operational"],
                ["Charlie", "100", "New York", "Sensor Issue"],
                ["Delta", "0", "San Francisco", "Operational"],
                ["Epsilon", "19", "Kansas", "Operational"],
                ["Foxtrot", "4", "Kansas", "No Sensors Detected"]
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

    deleteToggle = (e) => {
        e.preventDefault();
        this.setState({
            deleteModal: !this.state.deleteModal
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
                name: r[0]
            }
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

    addWarehouseSubmit = () => {
        // use react geocode to convert address to lat/lng
        // Geocode.fromAddress("address").then(
        //     (response) => {
        //         const { lat, lng } = response.results[0].geometry.location;
        //         console.log(lat, lng);
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );
    }

    deleteWarehouseSubmit = () => {
        // delete warehouse from the network for the specific customer
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
                <Container className="pt-2" fluid={true}>
                    <Form>
                        <Row>
                            <Col md="7" xs="9">
                            <FormGroup>
                                <Input name="search" id="search" placeholder="Enter a address, zip code or city...." />
                            </FormGroup>
                            </Col>
                            <Col md="1" xs="1">
                            <Button onClick={this.collapse}>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col xs= "12" md="7">
                        <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
                            <Map 
                                google={this.props.google} 
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
                            </div>
                        </Col>
                        <Col xs="12" md="5">
                            <Card height='100%' width="100%">
                                <CardBody>
                                    <Row>
                                        <Col md="9">
                                            <h2>List of Warehouses</h2>
                                        </Col>
                                        <Col md="1">
                                            <ButtonGroup>
                                                <Button onClick={this.modalToggle}>Add</Button>
                                                <Button onClick={this.deleteToggle}>Delete</Button>
                                            </ButtonGroup>
                                        </Col>
                                    </Row>
                                    <Table xs="10" hover={true}>
                                        <thead>
                                        <tr>
                                            {
                                                this.state.table_header.map((hr) => {
                                                    return(
                                                        <th>{hr}</th>
                                                    );
                                                })
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.table_data.map((r) => {
                                                    return(
                                                    <tr onClick={(e) => this.handleRowClick(e, r)}>
                                                        <td>{r[0]}</td>
                                                        <td>{r[1]}</td>
                                                        <td>{r[2]}</td>
                                                        <td>{r[3]}</td>
                                                        <td>{r[4]}</td>
                                                    </tr>);
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Modal isOpen={this.state.deleteModal} toggle={this.deleteToggle}>
                        <ModalHeader toggle={this.deleteToggle}>Delete Warehouse</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.deleteWarehouseSubmit}>
                                <FormGroup>
                                    <Label for="exampleEmail">Warehouse Name</Label>
                                    <Input type="select" name="warehouse_delete">
                                        <option value="alpha">Alpha</option>
                                        <option value="bravo">Bravo</option>
                                        <option value="charlie">Charlie</option>
                                        <option value="delta">Delta</option>
                                        <option value="epsilon">Epsilon</option>
                                        <option value="foxtrot">Foxtrot</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.deleteToggle}>Delete</Button>{' '}
                            <Button color="primary" onClick={this.deleteToggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

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
                </Container>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("")
  })(withRouter(Dashboard));