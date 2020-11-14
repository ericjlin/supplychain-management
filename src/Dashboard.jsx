import React from 'react';
import {
    Collapse, Col, Form,
    FormGroup, Input,
    Button, Row, Card, CardText, CardBody,
    CardTitle, CardSubtitle,Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';
import CustomTable from "./common/CustomTable.jsx";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';



 class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chart_data: [],
            modal: false,
            isOpen: false
        }
    }

    componentDidMount() {
        this.setState({
            chart_data : [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, 
            {name: 'Page B', uv: 300, pv: 2400, amt: 2400}, 
            {name: 'Page C', uv: 350, pv: 2400, amt: 2400}]
        });
        // grab all warehouse in user's home region and load on map
        // default detailed warehouse is first on the list 
        // run a condition check on role
        // Manager and IOT Support will get table of customer
    }
    // need list of longitude and latitude to define marker locations
    searchWarehouse = () => {
        // search warehouse
    }

    modalToggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    collapse = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleRowClick = (e, r) => {
        // handle clicking a row
        console.log(e.target, r);
        // condition check to see if row is for individual warehouse or for everything
        // clicking orders won't do anything
        // this.props.history.push('/warehouse');
    }

    render () {
        const test = [
            [1, "eric", "eric", "eruc"],
            [2, "elliot", "elliot", "elliot"],
            [3, "hi", "there", "world"],
            [4, "nice", "to", "meet you"]
        ];
        const ware_header = ["Warehouse#", "First Name", "Last Name", "Username"];
        const order_header = ["Order#", "First Name", "Last Name", "Username"];
        const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 2400, amt: 2400}, {name: 'Page C', uv: 350, pv: 2400, amt: 2400}];
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
                                <Marker
                                        name={'Current location'}
                                        />

                                <InfoWindow>
                                    <div>
                                    <h1>1234</h1>
                                    </div>
                                </InfoWindow>
                            </Map>
                        </Col>
                        <Col md="5">
                        <Card height='100%' width="100%">
                            <CardBody>
                        <CustomTable 
                                title="List of Warehouses"
                                header={ware_header}
                                trows={test}
                                handleRowClick={this.handleRowClick}
                                />
                                </CardBody>
                                </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
                            <ModalHeader toggle={this.modalToggle}>Add Warehouse</ModalHeader>
                        <ModalBody>
                        <LineChart width={600} height={300} data={this.state.chart_data}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </LineChart>
                            <CustomTable title="List of Orders" header={order_header} trows={test} handleRowClick={this.handleRowClick}/>
                                <Button onClick={this.modalToggle}>Add Sensor</Button>
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
  })(Dashboard)