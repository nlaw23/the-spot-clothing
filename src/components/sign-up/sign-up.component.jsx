import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    //async function that prevents the default submit action from firing, checks if passwords match, and creates a user using the auth library from firebase. also clears form.
    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            //we use destructuring to get the user key off of the auth object using the await keyword.
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            //await for this to finish so we can then run this.setState to clear form
            await createUserProfileDocument(user, {displayName});


            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = event => {
        //destructure off of the event the name and value from the target
        const {name, value} = event.target;

        //set state and dynamically set the name value from above.
        this.setState({[name]: value});
     }


    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='display name'
                        required
                    />
                    <FormInput 
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='email'
                        required
                    />  
                    <FormInput 
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='password'
                        required
                    />
                    <FormInput 
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='confirm password'
                        required
                    /> 
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                
                </form>
            </div>
        );
    }
}

export default SignUp;