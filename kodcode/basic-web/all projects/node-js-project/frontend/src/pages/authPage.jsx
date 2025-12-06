import axios from "axios";

const AuthPage = ({onAuth}) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { value } = e.target[0];
      const resp = await axios.post("http://localhost:3000/authenticate/", {
        username: value,
      });
      onAuth({ ...resp.data, secret: value });
    } catch (error) {
      console.log("error: ",error);
    }
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Set a username to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
