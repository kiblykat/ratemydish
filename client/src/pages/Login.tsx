import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      navigate("/");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        variables: {
          email,
          password,
        },
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card-primary w-full max-w-md">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="alert alert-error">
                <span>Invalid email or password.</span>
              </div>
            )}

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
