import "./pageCss/signinPage.css"; 
import { useState } from "react";
import {JobPotalContext} from "../context/contextApi"
import { useContext } from "react";

const SigninPage = () => {

    const {signIn} = useContext(JobPotalContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(formData)
        setFormData({
            email: "",
            password: ""
        });
        
    };

    return (
        <div id="sign-in">
            <div className="sign-in-form">
                <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                </form>
            </div>
        </div>
  );
};

export default SigninPage;
