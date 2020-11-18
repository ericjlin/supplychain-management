import React from 'react';
import {
    Col, Form,
    FormGroup, Input,
    Button, Row, Card, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
  import CustomTable from "./common/CustomTable.jsx";
  import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
  import {withRouter, Link} from 'react-router-dom'; 

  class Sensors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chart_data: []
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
    }
    handleRowClick = (e, r) => {
        // handle clicking a row
        console.log(e.target, r);
        // condition check to see if row is for individual warehouse or for everything
        // clicking orders won't do anything
    }
      render() {
            const sensor_header = ["Sensor#", "First Name", "Last Name", "Username"];
            const test = [
                [1, "eric", "eric", "eruc"],
                [2, "elliot", "elliot", "elliot"],
                [3, "hi", "there", "world"],
                [4, "nice", "to", "meet you"],
                [5, "data", "data", "data"]
            ];
          return(
            <div>
                <h2>Sensors list</h2>
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
                            <CustomTable 
                                title="List of Warehouses"
                                header={sensor_header}
                                trows={test}
                                handleRowClick={this.handleRowClick}
                                />
                        </Col>
                        <Col xs="5">
                        <Card>
                            <LineChart width={600} height={300} data={this.state.chart_data}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </LineChart>
                            <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <CustomTable title="List of Orders" header={sensor_header} trows={test} handleRowClick={this.handleRowClick}/>
                                <Button>Add Sensor</Button>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
            </div>
          );
      }
  }

  export default withRouter(Sensors);