import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        //we set state in the actual sign in component, at the lowest level we can. inside, we store two values, email and password and set them equal to empty strings. we will populate later.
        this.state = {
            email: '',
            password: ''
        };
    }  

    //prevents the default submit function from firing when submit button is clicked. we want to handle this ourselves later using firebase for authentication.

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (error) {
            console.log(error);
        }

        //here we just clear the values from our state and set them back equal to empty strings.
        this.setState({email: '', password: ''})
    }

    //this is the function that gathers the data from the input fields. we take in the name and value properties from the event target, which is the input element itself. this function can be used for both the email and password input onChange events.

    handleChange = event => {
        const {value, name} = event.target;

        //dynamically sets the state using the value and name we gathered from above
        this.setState({ [name]: value});
    }
    

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email' 
                        type ='email' 
                        value={this.state.email}
                        label='email'
                        handleChange={this.handleChange}
                        required 
                    />
                    <FormInput 
                        name='password'
                        type='password' 
                        value={this.state.password} 
                        label='password'
                        handleChange={this.handleChange}
                        required 
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;