import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !year || !branch) {
      toast.error("All fields are required");
      return;
    }

    // SRIT email validation (case-insensitive)
    const emailPattern = /^[0-9]{3}g[0-9]a[a-z0-9]{4,5}@srit\.ac\.in$/i;

    if (!emailPattern.test(email)) {
      toast.error("Only SRIT college email allowed");
      return;
    }

    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email, // already lowercase
        year: Number(year),
        branch,
        createdAt: serverTimestamp(),
      });

      toast.success("Signup successful 🎉");
      navigate("/create");
    } catch (error) {
      toast.error("Mail already in use");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          placeholder="Year of Study"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />

        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </div>
    </div>
  );
}

export default Signup;
