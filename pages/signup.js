import React,{useState,useEffect,useRef} from 'react';
import {Form,Button,Message,Segment,TextArea,Divider} from 'semantic-ui-react';
import {HeaderMessage,FooterMessage} from '../components/Common/WelcomeMessage';
import CommonInputs from "../components/Common/CommonInputs";
import ImageDropDiv from '../components/Common/ImageDropDiv';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import {registerUser} from '../utils/authUser';
import uploadPic from '../utils/uploadPicToCloudinary';

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
    const [submitDisabled,setSubmitDisabled]=useState(true);
    
    const[username,setUsername]=useState('');
    const[usernameAvailable,setUsernameAvailable]=useState(false);
    const[usernameLoading,setUsernameLoading]=useState(false);
    const[media,setMedia] =useState(null);
    const[mediaPreview,setMediaPreview]=useState(null);
    const[highlighted,setHighlighted]=useState(false);
    const inputRef = useRef();

    const handleSubmit =async e => {
        e.preventDefault();
        setFormLoading(true);

        let profilePicUrl;
        if(media != null)
        {
            profilePicUrl=await uploadPic(media);
        }

        if(media!=null && !profilePicUrl)
        {
            setFormLoading(false);
            return setErrorMessage('Error Uploading Image');
        }
        await registerUser(user,profilePicUrl,setErrorMessage,setFormLoading);
    }
    useEffect(()=>{
        const isUser = Object.values({name,email,password,bio}).every(item=>Boolean(item))
        isUser?setSubmitDisabled(false):setSubmitDisabled(true);
    },[user])

    const checkUsername =async()=>{
        setUsernameLoading(true);
        try {
            cancel && cancel();
            const cancelToken = axios.CancelToken;
            const res = await axios.get(`${baseUrl}/api/signup/${username}`,
            {cancelToken:new cancelToken(canceler=>{
                cancel=canceler;
            })
        });

        if(errorMessage != null)
        setErrorMessage(null);
            if(res.data === 'Available'){
                setUsernameAvailable(true);
                setUser(prev=>({...prev,username}));
            }
        } catch (error) {
            
            setErrorMessage("Username Not Available");
            setUsernameAvailable(false);
        }
        setUsernameLoading(false);
    }

    useEffect(()=>{
        username===""?setUsernameAvailable(false):checkUsername()
    },[username]);

    const handleChange = (e)=>{
        const{name,value,files}=e.target;
        if(name==='media'){
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]));
        }

        setUser(prev=>(
            {...prev,[name]:value}))
    }
    return (
        <>
        <HeaderMessage />
        <Form loading={formLoading} error={errorMessage!=null} onSubmit={handleSubmit} >
            <Message error header="Oops" content={errorMessage} onDismiss={()=>setErrorMessage(null)} />

        <Segment>
            <ImageDropDiv 
            mediaPreview={mediaPreview} 
            setMediaPreview={setMediaPreview} 
            setMedia={setMedia} 
            inputRef={inputRef} 
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleChange={handleChange}
            />
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
            type="name" />
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
            
            <CommonInputs 
                user={user}
                showSocialLinks={showSocialLinks}
                setSocialLinks={setSocialLinks} 
                handleChange={handleChange}
            />

            <Divider hidden />
            <Button
             content="Signup" 
             type="submit" 
             color="orange"
             disabled={submitDisabled || !usernameAvailable}/>
      
            </Segment>
        </Form>

        <FooterMessage />
        </>
    )
}
