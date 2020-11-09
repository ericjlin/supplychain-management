import React from 'react';
import NavBar from './common/Navbar.jsx';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button, Row, Table, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
  import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


export default class Dashboard extends React.Component {

    searchWarehouse = () => {
        // search warehouse
    }
    render () {
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
                            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[51.505, -0.09]}>
                                <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                            </MapContainer>
                        </Col>
                        <Col xs="5">
                        <Card>
                            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <h3>List of Orders</h3>
                                <Table>
                                <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            </tbody>
                                </Table>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="10">
                        <h3>List of Warehouses</h3>    
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            </tbody>
                        </Table>
                        </Col>
                    </Row>
                </div>
        );
    }
}