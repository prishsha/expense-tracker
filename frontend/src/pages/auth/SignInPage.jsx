import React from "react";
import { SignInButton, SignUpButton, useSignIn, useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css"; // Separate CSS file for styling
import imageSrc from "../auth/image.png";

const SignInPage = () => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="text-content">
        <h2 className="fade-in">Expense Tracker</h2>
        <p className="slide-up">Prisha Vadhavkar</p>
        <div className="button-group">
          <SignInButton>
          <button className="btn read-report">Login</button>
          </SignInButton>
          <SignUpButton>
          <button className="btn learn-more">SignUp</button>
          </SignUpButton>
        </div>
      </div>
      <div className="image-content">
        <div className="image-wrapper">
        <img src={imageSrc} alt="Report Visual" className="image-animate" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
