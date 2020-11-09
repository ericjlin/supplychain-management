import React from 'react';
import NavBar from './common/Navbar.jsx';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button, Row, Table, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';

  class CustomTable extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              rows_array: []
          }
      }

      componentDidMount() {
          // loop through props and convert to rows
      }


      render() {
          return(
              <div>
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
            </div>
          );
      }

  }

  export default CustomTable;