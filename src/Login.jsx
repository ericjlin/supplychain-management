import React from 'react';
import {withRouter} from 'react-router-dom'; 
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';
  


class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: ''
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
    submitLogin = (e) => {
        const json = {
            'support': '1234',
            'manager': '1234',
            'supplier': '1234'
        }
        // run authentication
        e.preventDefault();
        if (json[this.state.username] === this.state.pass) {
            if (this.state.username === 'support') {
                localStorage.setItem('support', 'true');
            } else if (this.state.username === 'manager') {
                localStorage.setItem('manager', 'true');
            } else {
                localStorage.setItem('user', 'true');
            }
            console.log("redirect...");
            this.props.history.push("/");
        }
    }

    render () {
        return(
            <div>
                <Container>
                    <h2>SupplyChain Login</h2>
                    <Form onSubmit={this.submitLogin}>
                        <Col>
                            <FormGroup>
                                <Label>Username/Email</Label>
                                <Input 
                                    type="username"
                                    name="username"
                                    placeholder="email@email.com"
                                    value={this.state.username || ''}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                            <Label for="exPassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="exPassword"
                                placeholder="*******"
                                value={this.state.pass || ''}
                                onChange={this.handleChange}
                            />
                            </FormGroup>
                        </Col>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(Login);