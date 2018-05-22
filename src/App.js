import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'

const FormItem = Form.Item
class LoginForm extends Component {
  constructor (props){
    super(props)
    this.state = {
      visible: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        const {userName, password} = values
        const identifier = userName
        const body = {identifier, password}
        fetch('http://140.143.222.61:8088/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }).then( (res) =>{
            console.log(res)
            if (res.status === 200 ){
              message.success('success')
            }
            else {
              message.error('failed')
            }
        }).catch((e) =>{
          console.log(e.message)
        })
        this.setState({
          visible: false
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className='app-form'>
          <div className='app-form-position'>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
          </div>
        </div>
      </div>
    );
  }
}
const App = Form.create()(LoginForm);


export default App;
