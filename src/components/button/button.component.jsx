import React from "react";

const Button = ({ children, isGoogleSignIn, ...otherProps }) => {
  return (
    <button
      className={`${isGoogleSignIn ? "google-sign-in" : ""} btn-custom`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
