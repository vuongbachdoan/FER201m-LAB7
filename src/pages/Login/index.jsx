import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, googleProvider } from '../../core/config/firebase';
import GoogleButton from 'react-google-button';
import { createUser, getAllUsers } from '../../core/services/user';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../routes';

export const Login = () => {
    React.useEffect(() => window.scrollTo(0, 0), []);
    const navigate = useNavigate();
    const {user, setUser} = React.useContext(UserContext);

    const signin = (provider) => {
        signInWithPopup(auth, provider)
            .then(async (res) => {
                const currentUsers = await getAllUsers();
                const existUser = currentUsers.find(user => user.uid === res.user.uid);
                if (!existUser) {
                    createUser({
                        uid: res.user.uid,
                        photo: res.user.photoURL,
                        username: res.user.displayName,
                        email: res.user.email
                    }).
                        then((res) => {
                            alert('Sign in Success!');
                            setUser(res);
                            navigate('/');
                        })
                        .catch((err) => console.log(err))
                } else {
                    alert('Sign in Success!');
                    setUser(existUser);
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <GoogleButton
            type="light" // can be light or dark
            onClick={() => signin(googleProvider)}
        />
    );
};