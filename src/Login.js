import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './Firebase'
import './Login.css'
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{}, dispatach] = useStateValue();

    const signIn = ()=>{
        auth.signInWithPopup(provider).then(result=>{
            dispatach({
                type:actionTypes.SET_USER,
                user: result.user
            })
        }).catch(err=>{
            alert('error ', console.log(err))
        })
    }
    
    return (
        <div>
            <div className="login">
                <div className="login__container">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png" alt=""/>
                    <div className="login__text">
                        <h1>Sign in to WhatsApp</h1>
                    </div>
                    <Button onClick ={signIn}>
                        Sign In with Google
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
