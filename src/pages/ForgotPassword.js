import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email.trim()) return toast.error("Enter your email");

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent! 📩");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleReset}>Send Reset Link</button>
        <h6> check link in spam mails in your mail account </h6>
      </div>
    </div>
  );
}

export default ForgotPassword;
