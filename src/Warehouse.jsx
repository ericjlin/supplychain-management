import React from 'react';
import {
    Collapse, Col, Form, Table,
    FormGroup, Input, Label, FormText,
    Button, Row, Card, CardText, CardBody,
    CardTitle, CardSubtitle,Modal, ModalHeader, ModalBody, ModalFooter,
    Container, Pagination, PaginationItem, PaginationLink
  } from 'reactstrap';
import CustomTable from "./common/CustomTable.jsx";
import { ResponsiveContainer,LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import IndividualSensors from './IndividualSensor.jsx';
import { Link } from "react-router-dom";
import warehouseJSON from './mock_data/warehouse';

class Warehouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warehouseId: this.props.location.state ?
            this.props.location.state.warehouseId : null,
            warehouseName: this.props.location.state ?
            this.props.location.state.name : "",
            chart_data: [],
            addSensorModal: false,
            manageSensorModal: false,
            manageOrderModal: false,
            isOpen: false,
            addSensor : {
                sensorType: "temperature"
            },
            individualSensorId: null,
            selectedSensor: false,
            orderPages: 1,
            orderHistory: warehouseJSON[0].history        }
    }

    componentDidMount() {
        // console.log(this.props.location.state.warehouseId);
        console.log(this.state.warehouseId);

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

        let chartdata = [
            {sensorId: "1",
            sensorName: "Sensor #1",
            data: [
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
            },
            {sensorId: "2"}
        ];
        // make call to grab all sensor data from the selected warehouse
        // default detailed warehouse is first on the list 
    }

    orderTablePagination() {
        // organize order table pagination
        const table_size = 5;
    }

    addSensorToggle = () => {
        this.setState({
            addSensorModal: !this.state.addSensorModal
        });
    }

    addSensorSubmit = (e) => {
        // add sensor
        e.preventDefault();
        console.log("Adding sensors..");
    }

    manageSensorToggle = () => {
        this.setState({
            manageSensorModal: !this.state.manageSensorModal
        });
    }
    manageOrderToggle = () => {
        this.setState({
            manageOrderModal: !this.state.manageOrderModal
        });
    }

    grabAllSensor() {
        // call individual warehouse for all sensors
    }

    handleRowClick = (e, r) => {
        // handle clicking a row
        console.log(e.target, r);
        // condition check to see if row is for individual warehouse or for everything
        // clicking orders won't do anything
    }

    handleAddSensorChange = (e) => {
        console.log(e.target.value);
        this.setState({
            addSensor: {
                sensorType: e.target.value
            }
        });
    }

    manageIndividualSensor = () => {
        this.setState({
            selectedSensor: !this.state.selectedSensor
        });
    }

    renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
      }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
    }

    render() {
        const test = [
            ["11/12/2020-16:15", "71"],
            ["11/12/2020-16:10", "71"],
            ["11/12/2020-16:05", "71"],
            ["11/12/2020-16:00", "69"]
        ];
        const ware_header = ["Warehouse#", "First Name", "Last Name", "Username"];
        const temperature_header = ["Time", "Temperature"];
        const pieData = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
          ];
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
        const isMobile = this.state.width <= 600;
        return(<>
            { isMobile ? 
                <Container className="pb-5" fluid="xs">
                <Row className="justify-content-md-center pt-4 pb-4">
                    <Col md="6">
                    <h2>Warehouse {this.state.warehouseName}</h2>
                    </Col>
                    <Col md="4">
                        <Button color="primary" onClick={this.addSensorToggle}>Add Sensor</Button>{' '}
                        <Link className="btn btn-primary" to="/">Go Back</Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="pb-4" md="auto">
                        <Card width="100%">
                            <CardBody>
                                <CardTitle tag="h5">Sensor #1</CardTitle>
                                <ResponsiveContainer width='100%' height={300}>
                                    <LineChart  data={this.state.chart_data}>
                                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]}/>
                                    </LineChart>
                                </ResponsiveContainer>
                                <CustomTable 
                                    title="History" 
                                    header={temperature_header} 
                                    trows={test} 
                                    handleRowClick={this.handleRowClick}/>
                                <Button onClick={this.manageSensorToggle}>Manage Sensor</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="pb-4" xs="auto" md="auto">
                        <Card width="100%">
                            <CardBody >
                                <CardTitle tag="h5">Card2 title</CardTitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <ResponsiveContainer width={400} height={300}>
                                    <LineChart width={400} height={300} data={this.state.chart_data}>
                                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]}/>
                                    </LineChart>
                                </ResponsiveContainer>
                                <CustomTable 
                                    title="History" 
                                    header={temperature_header} 
                                    trows={test} 
                                    handleRowClick={this.handleRowClick}/>
                                <Button onClick={this.manageSensorToggle}>Manage Sensor</Button>
                            </CardBody>
                        </Card>
                        
                    </Col>
                    <Col className="pb-4" xs="auto" md="auto">
                        <Card width="100%">
                            <CardBody >
                                <CardTitle tag="h5">Card2 title</CardTitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <ResponsiveContainer width={400} height={300}>
                                    <LineChart width={400} height={300} data={this.state.chart_data}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]}/>
                                    </LineChart>
                                </ResponsiveContainer>
                                <CustomTable 
                                    title="History" 
                                    header={temperature_header} 
                                    trows={test} 
                                    handleRowClick={this.handleRowClick}/>
                                <Button onClick={this.manageSensorToggle}>Manage Sensor</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="pb-4" md="auto">
                        <Card style={{width:"500px"}}>
                            <CardBody >
                                <CardTitle tag="h5">Orders Summary</CardTitle>
                                <ResponsiveContainer width={400} height={300}>
                                <PieChart width={400} height={400}>
                                    <Pie
                                    data={pieData}
                                    cx={200}
                                    cy={150}
                                    labelLine={false}
                                    label={this.renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    >
                                    {
                                        pieData.map((entry, index) => 
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} 
                                        />)
                                    }
                                    </Pie>
                                </PieChart>
                                </ResponsiveContainer>
                                <Table>
                                    <thead>
                                        <tr>
                                            <td>Order#</td>
                                            <td>Type</td>
                                            <td>Origin</td>
                                            <td>Destination</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Corn</td>
                                            <td>San Francsico</td>
                                            <td>Las Vegas</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Fruit</td>
                                            <td>San Francsico</td>
                                            <td>New York</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Fruit</td>
                                            <td>San Francsico</td>
                                            <td>Seattle</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Food</td>
                                            <td>San Francsico</td>
                                            <td>Miami</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem>
                                        <PaginationLink first onClick={()=> {console.log("load first")}}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink previous />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink >
                                        1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink >
                                        2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink >
                                        3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink next />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink last />
                                    </PaginationItem>
                                </Pagination>
                                {/* <Button onClick={this.manageOrderToggle}>Manage Orders</Button> */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Modal isOpen={this.state.addSensorModal} toggle={this.addSensorToggle}>
                    <ModalHeader toggle={this.addSensorToggle}>Add Sensor</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.addSensorSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Sensor Name</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Sensor #1" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Location</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Second Floor" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Sensor Type</Label>
                                <Input type="select" name="select" id="exampleSelect" 
                                value={this.state.addSensor.sensorType} 
                                onChange={this.handleAddSensorChange}>
                                    <option value="temperature">Temperature</option>
                                    <option value="humidity">Humidity</option>
                                    <option value="uv">UV</option>
                                </Input>
                            </FormGroup>
                            <ModalFooter>
                                <Button color="primary" type="submit" onClick={this.addSensorToggle}>Submit</Button>{' '}
                                <Button color="secondary" onClick={this.addSensorToggle}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>        
                </Modal>

                <Modal isOpen={this.state.manageSensorModal} toggle={this.manageSensorToggle}>
                    <ModalHeader toggle={this.manageSensorToggle}>Manage Sensor</ModalHeader>
                    <ModalBody>
                        <IndividualSensors/>
                    </ModalBody> 
                    <ModalFooter>
                    <Button color="primary" onClick={this.manageIndividualSensor} >Update</Button>{' '}
                        <Button color="secondary" onClick={this.manageSensorToggle}>Cancel</Button>
                    </ModalFooter>       
                </Modal>

                <Modal isOpen={this.state.manageOrderModal} toggle={this.manageOrderToggle}>
                    <ModalHeader toggle={this.manageOrderToggle}>Manage Order</ModalHeader>
                    <ModalBody>
                        <IndividualSensors/>
                    </ModalBody> 
                    <ModalFooter>
                    <Button color="primary" type="submit">Update</Button>{' '}
                        <Button color="secondary" onClick={this.manageOrderToggle}>Cancel</Button>
                    </ModalFooter>       
                </Modal>
            </Container>
            :
            <Container className="pb-5" fluid="xl">
                <Row className="justify-content-md-center pt-4 pb-4">
                    <Col md="6">
                    <h2>Warehouse {this.state.warehouseName}</h2>
                    </Col>
                    <Col md="4">
                        <Button color="primary" onClick={this.addSensorToggle}>Add Sensor</Button>{' '}
                        <Link className="btn btn-primary" to="/">Go Back</Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="pb-4" md="auto">
                        <Card style={{width:"500px"}}>
                            <CardBody>
                                <CardTitle tag="h5">Sensor #1</CardTitle>
                                <ResponsiveContainer width='100%' height={300}>
                                    <LineChart  data={this.state.chart_data}>
                                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]}/>
                                    </LineChart>
                                </ResponsiveContainer>
                                <CustomTable 
                                    title="History" 
                                    header={temperature_header} 
                                    trows={test} 
                                    handleRowClick={this.handleRowClick}/>
                                <Button onClick={this.manageSensorToggle}>Manage Sensor</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="pb-4" md="auto">
                        <Card style={{width:"500px"}}>
                            <CardBody >
                                <CardTitle tag="h5">Card2 title</CardTitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <ResponsiveContainer width={400} height={300}>
                                    <LineChart width={400} height={300} data={this.state.chart_data}>
                                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]}/>
                                    </LineChart>
                                </ResponsiveContainer>
                                <CustomTable 
                                    title="History" 
                                    header={temperature_header} 
                                    trows={test} 
                                    handleRowClick={this.handleRowClick}/>
                                <Button onClick={this.manageSensorToggle}>Manage Sensor</Button>
                            </CardBody>
                        </Card>
                        
                    </Col>
                    <Col className="pb-4" md="auto">
                        <Card style={{width:"500px"}}>
                            <CardBody >
                                <CardTitle tag="h5">Card2 title</CardTitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <ResponsiveContainer width={400} height={300}>
                                    <LineChart width={400} height={300} data={this.state.chart_data}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]}/>
                                    </LineChart>
                                </ResponsiveContainer>
                                <CustomTable 
                                    title="History" 
                                    header={temperature_header} 
                                    trows={test} 
                                    handleRowClick={this.handleRowClick}/>
                                <Button onClick={this.manageSensorToggle}>Manage Sensor</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="pb-4" md="auto">
                        <Card style={{width:"500px"}}>
                            <CardBody >
                                <CardTitle tag="h5">Orders Summary</CardTitle>
                                <ResponsiveContainer width={400} height={300}>
                                <PieChart width={400} height={400}>
                                    <Pie
                                    data={pieData}
                                    cx={200}
                                    cy={150}
                                    labelLine={false}
                                    label={this.renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    >
                                    {
                                        pieData.map((entry, index) => 
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} 
                                        />)
                                    }
                                    </Pie>
                                </PieChart>
                                </ResponsiveContainer>
                                <Table>
                                    <thead>
                                        <tr>
                                            <td>Order#</td>
                                            <td>Type</td>
                                            <td>Origin</td>
                                            <td>Destination</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Corn</td>
                                            <td>San Francsico</td>
                                            <td>Las Vegas</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Fruit</td>
                                            <td>San Francsico</td>
                                            <td>New York</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Fruit</td>
                                            <td>San Francsico</td>
                                            <td>Seattle</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Food</td>
                                            <td>San Francsico</td>
                                            <td>Miami</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem>
                                        <PaginationLink first onClick={()=> {console.log("load first")}}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink previous />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink >
                                        1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink >
                                        2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink >
                                        3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink next />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink last />
                                    </PaginationItem>
                                </Pagination>
                                {/* <Button onClick={this.manageOrderToggle}>Manage Orders</Button> */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Modal isOpen={this.state.addSensorModal} toggle={this.addSensorToggle}>
                    <ModalHeader toggle={this.addSensorToggle}>Add Sensor</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.addSensorSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Sensor Name</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Sensor #1" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Location</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Second Floor" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Sensor Type</Label>
                                <Input type="select" name="select" id="exampleSelect" 
                                value={this.state.addSensor.sensorType} 
                                onChange={this.handleAddSensorChange}>
                                    <option value="temperature">Temperature</option>
                                    <option value="humidity">Humidity</option>
                                    <option value="uv">UV</option>
                                </Input>
                            </FormGroup>
                            <ModalFooter>
                                <Button color="primary" type="submit" onClick={this.addSensorToggle}>Submit</Button>{' '}
                                <Button color="secondary" onClick={this.addSensorToggle}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>        
                </Modal>

                <Modal isOpen={this.state.manageSensorModal} toggle={this.manageSensorToggle}>
                    <ModalHeader toggle={this.manageSensorToggle}>Manage Sensor</ModalHeader>
                    <ModalBody>
                        <IndividualSensors/>
                    </ModalBody> 
                    <ModalFooter>
                    <Button color="primary" onClick={this.manageIndividualSensor} >Update</Button>{' '}
                        <Button color="secondary" onClick={this.manageSensorToggle}>Cancel</Button>
                    </ModalFooter>       
                </Modal>

                <Modal isOpen={this.state.manageOrderModal} toggle={this.manageOrderToggle}>
                    <ModalHeader toggle={this.manageOrderToggle}>Manage Order</ModalHeader>
                    <ModalBody>
                        <IndividualSensors/>
                    </ModalBody> 
                    <ModalFooter>
                    <Button color="primary" type="submit">Update</Button>{' '}
                        <Button color="secondary" onClick={this.manageOrderToggle}>Cancel</Button>
                    </ModalFooter>       
                </Modal>
            </Container>}</>
        );
    }
}

export default Warehouse;