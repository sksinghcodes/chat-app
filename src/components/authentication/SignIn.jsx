import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Context } from '../../App';

const SignIn = () => {
    const [signInState, setSignInState] = useState({
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const { login } = useContext(Context);

    const navigate = useNavigate();

    const handleSignInFormStateChange = e => {
        const { name, value } = e.currentTarget || e.target;
        setSignInState({
            ...signInState,
            [name]: value,
        })
    }

    const handleSignIn = e => {
        e.preventDefault();
        setLoading(true);
        axios.post('/user/sign-in', signInState).then((res, err) => {
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
                    onSubmit={handleSignIn}
                    className="rounded p-5 bg-white shadow ms-auto me-auto"
                    style={{maxWidth: 600}}
                >
                    <h2 className="text-center mb-3">Sign In</h2>
                    <div className="mb-3">
                        <label className="form-label">Email or Username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            value={signInState.username}
                            onChange={handleSignInFormStateChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            autoComplete="true"
                            name="password"
                            value={signInState.password}
                            onChange={handleSignInFormStateChange}
                        />
                    </div>
                    <div className="text-center pt-3">
                        <button
                            className="btn btn-primary ps-5 pe-5"
                            type="submit"
                            disabled={loading}
                        >
                            <span>Sign In</span>
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

export default SignIn;