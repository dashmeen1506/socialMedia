import React,{useState,useEffect,useRef} from 'react';
import {Form,Button,Message,Segment,TextArea,Divider} from 'semantic-ui-react';
import {HeaderMessage,FooterMessage} from '../components/Common/WelcomeMessage';
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
export default function Signup() {

    const[user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        bio:"",
        facebook:"",
        youtube:"",
        twitter:"",
        instagram:""
    });

    const{name,email,password,bio}=user;
    
    const[showSocialLinks,setSocialLinks]=useState(false);
    const[showPassowrd,setShowPassowrd]=useState(false);
    const[errorMessage,setErrorMessage]=useState(false);
    const[formLoading,setFormLoading]=useState(false);

    
    const[username,setUsername]=useState('');
    const[usernameAvailable,setUsernameAvailable]=useState(false);
    const[usernameLoading,setUsernameLoading]=useState(false);

    const handleSubmit = e => e.preventDefault();
    const handleChange = (e)=>{
        const{name,value}=e.target;
        setUser(prev=>(
            {...prev,[name]:value}))
    }
    return (
        <>
        <HeaderMessage />
        <Form loading={formLoading} error={errorMessage!=null} onSubmit={handleSubmit} >
            <Message error header="Oops" content={errorMessage} onDismiss={()=>setErrorMessage(null)} />

        <Segment>
        <Form.Input
        required
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fluid
            icon="user"
            iconPosition="left"
            type="email" />
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

<Form.Input
        required
        loading={usernameLoading}
        error={!usernameAvailable}
            label="Username"
            placeholder="Username"
            value={username}
            onChange={e=>{
                setUsername(e.target.value);
                if(regexUserName.test(e.target.value)){
                    setUsernameAvailable(true);
                }
                else{
                    setUsernameAvailable(false);
                }
            }}
            fluid
            icon={usernameAvailable?"check":"close"}
            iconPosition="left" />

        </Segment>
        </Form>

        <FooterMessage />
        </>
    )
}
