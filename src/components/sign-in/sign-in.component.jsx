import React from "react";
import { connect } from "react-redux";

import Button from "../button/button.component";

import { googleSignInStart } from "../../redux/user/user.actions";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div>
        <form>
          {/* <ButtonsBarContainer> */}
          <Button type="button" onClick={googleSignInStart} isGoogleSignIn>
            Sign in with Google
          </Button>
          {/* </ButtonsBarContainer> */}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);
