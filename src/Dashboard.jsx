import React from 'react';
import {
    Col, Form,
    FormGroup, Input,
    Button, Row, Card, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
  import CustomTable from "./common/CustomTable.jsx";
  import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
  import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';



 class Dashboard extends React.Component {
    // need list of longitude and latitude to define marker locations
    searchWarehouse = () => {
        // search warehouse
    }
    render () {
        const test = [
            [1, "eric", "eric", "eruc"],
            [2, "elliot", "elliot", "elliot"],
            [3, "hi", "there", "world"],
            [4, "nice", "to", "meet you"]
        ];
        const header = ["#", "First Name", "Last Name", "Username"];
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
                            <Button>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col xs="7">
                            <Map google={this.props.google} 
                            style={{width: '100%', height: '100%', position: 'relative'}}
                            initialCenter={{
                                        lat: 40.854885,
                                        lng: -88.081807
                                    }} zoom={14}>

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
                        <Col xs="5">
                        <Card>
                            <LineChart width={600} height={300} data={data}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </LineChart>
                            <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <CustomTable title="List of Orders" header={header} trows={test}/>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="10">
                            <CustomTable title="List of Warehouses" header={header} trows={test}/>
                        </Col>
                    </Row>
                </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("")
  })(Dashboard)