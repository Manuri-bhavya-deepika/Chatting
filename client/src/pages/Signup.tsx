import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserIcon } from "@heroicons/react/20/solid";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/google-auth", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/createprofile");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 opacity-60"></div>
      <div className="relative w-full max-w-md p-8 bg-slate-900 shadow-2xl rounded-xl transition-transform duration-300 transform hover:scale-105">
        <h1 className="text-3xl font-semibold text-white text-center mb-8">Sign Up</h1>

        {/* Person Icon inside a Circle with soft gray background */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-500 p-4 rounded-full">
            <UserIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          {/* Google Login Wrapper */}
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error("Login Failed")}
              useOneTap
              shape="pill"
              text="continue_with"
            />
          </div>

          {/* Already have an account link */}
          <div className="text-center text-sm text-gray-400">
            <p>
              Already have an account? 
              <span 
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate("/signin")}>
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;