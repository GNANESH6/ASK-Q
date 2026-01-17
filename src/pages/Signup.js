import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const handleSignup = async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const year = document.getElementById("year").value.trim();
    const branch = document.getElementById("branch").value.trim();

    // Manual required validation
    if (!name || !email || !password || !year || !branch) {
      toast.error("All fields are required");
      return;
    }

    const emailPattern = /^[0-9]{3}g[0-9]a[0-9]{4,5}@srit\.ac\.in$/;

    if (!emailPattern.test(email)) {
      toast.error("Only SRIT college email allowed");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        name,
        year: Number(year),
        branch,
        createdAt: serverTimestamp(),
      });

      toast.success("Signup successful 🎉");
      navigate("/create");
    } catch (error) {
      toast.error("Mail already in use");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>

        <input id="name" required placeholder="Name" />
        <input id="email" required placeholder="College Email" />
        <input id="password" required type="password" placeholder="Password" />
        <input id="year" required placeholder="Year of Study" />
        <input id="branch" required placeholder="Branch" />

        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
