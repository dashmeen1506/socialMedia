import React,{useState,useEffect} from 'react'
import {HeaderMessage,FooterMessage} from '../components/Common/WelcomeMessage';
import {Form,Button,Message,Segment,TextArea,Divider} from 'semantic-ui-react';

export default function Login() {
    
    const[user,setUser] = useState({
        email:"",
        password:""
    });

    const{email,password}=user;
    
    const[showPassowrd,setShowPassowrd]=useState(false);
    const[errorMessage,setErrorMessage]=useState(false);
    const[formLoading,setFormLoading]=useState(false);
    const [submitDisabled,setSubmitDisabled]=useState(true);

    const handleChange = (e)=>{
        const{name,value}=e.target;
        setUser(prev=>(
            {...prev,[name]:value}))
    }

    useEffect(()=>{
        const isUser = Object.values({email,password}).every(item=>Boolean(item))
        isUser?setSubmitDisabled(false):setSubmitDisabled(true);
    },[user]);


    const handleSubmit = (e) => e.preventDefault();

    return (
        <>
        <HeaderMessage />

        <Form 
        loading={formLoading} 
        error={errorMessage!=null} 
        onSubmit={handleSubmit} >

            <Message 
                error 
                header="Oops" 
                content={errorMessage} 
                onDismiss={()=>setErrorMessage(null)} 
            />

        <Segment>
        
            <Form.Input
            required
                label="Email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                fluid
                icon="envelope"
                iconPosition="left" 
                type="email" />
            
            <Form.Input
                label="Password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                fluid
                icon={{name:"eye",circular:true,link:true,onClick:()=>setShowPassowrd(!showPassowrd) }} 
                iconPosition="left" 
                type={showPassowrd?'text':"password"} />


            <Divider hidden />
                <Button
                icon="signup"
                content="Login" 
                type="submit" 
                color="orange"
                disabled={submitDisabled}/>
        </Segment>
        
        </Form>

        <FooterMessage />
        </>
    )
}
