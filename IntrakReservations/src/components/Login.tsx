import React, {useContext} from 'react'
import { Form, Input, Button, message } from 'antd';
import Axios from 'axios';
import {apiUrl} from '../utils/config';
import { Context } from '../utils/store';
import { Types } from '../utils/interfaces';


// TODO: exclude login from CORS on the server side

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };
type Props = any;
export default function Login(props:Props){
  
  const {state, dispatch} = useContext(Context)
  
  const onFinish = (values:string) => {
    
    
    Axios.post(apiUrl + '/login', values).then(
      function(res){
        
        
        if(res.data.access_token){
          dispatch({type: Types.Login, payload:res.data.access_token})
        }else{
          message.error('Internal server error, no access_token recieved');
        }
      }
    ).catch(e => {
      message.error(e.response.data.description);
    })
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <div className="login-block">
          <div className='login-text'>
                <h1>INTRAK</h1>
                <h1>Reservation System</h1>
                <h3>Your login is the same as on userpanel</h3>

          </div>
      
    <Form
        className='login-form'
      
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder='username'/>
      </Form.Item>

      <Form.Item
        
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder='password'/>
      </Form.Item>

      <Form.Item >
        <Button block type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};