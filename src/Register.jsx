import React from 'react';
import {withRouter, Link} from 'react-router-dom'; 
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            username: "",
            password: "",
            role: "Supplier"
        }
    }

    handleChange = (e) => {
        console.log("handle change", e);
        if (e.target.name === 'username') {
            this.setState({
                'username': e.target.value
            });
        } else {
            this.setState({
                'pass': e.target.value
            });
        }

    }
    registerSubmit = (e) => {
        // save user to the backend
        e.preventDefault();
        console.log("redirect...");
        this.props.history.push("/login");
    }
    render() {
        return(
            <div className="App">
            <h2>SupplyChain Register</h2>
            <Form className="login-form" onSubmit={this.registerSubmit}>
              <Container className="login-border">
                <Col className="font-weight-bold">
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="role">Role</Label>
                    <Input
                      type="select"
                      name="role-select"
                      value={this.state.role}
                      onChange={this.handleChange}
                    >
                        <option>Supplier</option>
                        <option>Infrastructure Manager</option>
                        <option>IOT Support</option>
                    </Input>
                  </FormGroup>
                  <Button type="submit">Register</Button>
                </Col>
              </Container>
            </Form>
          </div>
        )
    }
}

export default withRouter(Register);