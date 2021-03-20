import React from "react";

const Button = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
  return (
    <button
      className={`${inverted ? "inverted" : ""} ${
        isGoogleSignIn ? "google-sign-in" : ""
      } btn-custom`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
