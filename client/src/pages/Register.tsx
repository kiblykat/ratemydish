import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const REGISTER = gql`
  mutation Register($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted: () => {
      navigate("/login");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await register({
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      });
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card-primary w-full max-w-md">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="alert alert-error">
                <span>Error creating account. Please try again.</span>
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
                  "Register"
                )}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
