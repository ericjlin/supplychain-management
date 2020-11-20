import React from 'react';
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
                <h3>{this.props.title}</h3>    
                <Table xs="10" hover={true}>
                    <thead>
                    <tr>
                        {
                            this.props.header.map((hr) => {
                                return(
                                    <th>{hr}</th>
                                );
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.trows.map((r) => {
                                // const tmp = [];
                                // r.forEach(i => {
                                //     tmp.add(<t>)
                                // });
                                return(
                                <tr onClick={(e) => this.props.handleRowClick(e, r)}>
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
            </div>
          );
      }

  }

  export default CustomTable;