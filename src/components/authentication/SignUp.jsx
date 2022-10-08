import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Context } from '../../App';

const SignUp = () => {
    const [signUpState, setSignUpState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const { login } = useContext(Context);

    const navigate = useNavigate();

    const handleSignUpFormStateChange = e => {
        const { name, value } = e.currentTarget || e.target;
        setSignUpState({
            ...signUpState,
            [name]: value,
        })
    }

    const handleSignUp = e => {
        e.preventDefault();
        setLoading(true);
        axios.post('/user/sign-up', signUpState).then((res, err) => {
            if(res.data.success) {
                console.log(res.data.messsage);
                login();
                navigate('/');
            } else {
                console.log(err || res.data.error)
            }
            setLoading(false);
        })
    }
 
    return (
        <div className="container">
            <div className="p-5">
                <form
                    onSubmit={handleSignUp}
                    className="rounded p-5 bg-white shadow ms-auto me-auto"
                    style={{maxWidth: 600}}
                >
                    <h2 className="text-center mb-3">Sign Up</h2>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="firstName"
                            value={signUpState.firstName}
                            onChange={handleSignUpFormStateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="lastName"
                            value={signUpState.lastName}
                            onChange={handleSignUpFormStateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Choose a Username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            value={signUpState.username}
                            onChange={handleSignUpFormStateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={signUpState.email}
                            onChange={handleSignUpFormStateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            autoComplete="true"
                            name="password"
                            value={signUpState.password}
                            onChange={handleSignUpFormStateChange}
                        />
                    </div>
                    <div className="text-center pt-3">
                        <button
                            className="btn btn-success ps-5 pe-5"
                            type="submit"
                            disabled={loading}
                        >
                            <span>Sign Up</span>
                            {loading &&
                                <span className="spinner-border spinner-border-sm ms-2 mt-1 position-absolute"></span>
                            } 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;