import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Autho.css";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import axios from "axios";
function Autho({onClose}){

const {setIsLogin}=useContext(MyContext)
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

    const [inputData,setInputData]=useState({
        username:"",
        businessName:"",
        email:"",
        mobile:"",
        password:"",
    })
    const [isAlredyAcc,setIsAlredyAcc]=useState(true);

    const handleInput=(e)=>{
       const {name,value}=e.target;
       setInputData((prev)=>({...prev,[name]:value}))
    }


    const handleSubmit = async (e) => {
  e.preventDefault();

  const { username, businessName, email, mobile, password } = inputData;

  const endpoint = isAlredyAcc ? "login" : "register";
  const body = isAlredyAcc
    ? { email: email.trim().toLowerCase(), password }
    : { username, businessName, email: email.trim().toLowerCase(), mobile, password };

  try {
    const { data } = await axios.post(`${API_URL}/${endpoint}`, body, {
      withCredentials: true,
    });

    if (!isAlredyAcc) {
      alert("Registered successfully! Now, please log in.");
      setIsAlredyAcc(true);
      return;
    }

    // backend access token bhejta hai, refresh token cookie me jata hai
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("businessLogin", JSON.stringify(data.businessLogin));

    setIsLogin(true);
    onClose();
    navigate("/dashboard");
  } catch (err) {
    if (err.response) {
      // backend ne error bheja (400, 401, 409 etc.)
      alert(err.response.data.error || "Something went wrong");
    } else {
      // server tak request pahunchi hi nahi
      console.error("Request failed:", err);
      alert("Could not connect to the server.");
    }
  }
};

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);
    
    return(          
        <>
    
        <div className="AuthoDiv">
            <button type="button" className="AuthoClose" onClick={onClose} aria-label="Close">
  <i className="fa-solid fa-xmark"></i>
</button>
            <h2>{isAlredyAcc?"Login to BillKhata":"Create Account"}</h2>
            <form onSubmit={handleSubmit}>

          {!isAlredyAcc &&<label htmlFor="username">User Name</label>}
          {!isAlredyAcc && <input type="text" name="username" id="username" placeholder="eg.Rahul wagh" value={inputData.username} onChange={handleInput}/> }

            {!isAlredyAcc && <label htmlFor="businessName">Business Name</label>}
             {!isAlredyAcc && <input type="text" name="businessName" id="businessName" placeholder="eg.D-mart" value={inputData.businessName} onChange={handleInput} />}

             <label htmlFor="email">Email</label>
             <input type="email" name="email" id="email" placeholder="you@example.com" value={inputData.email} onChange={handleInput} />

            {!isAlredyAcc && <label htmlFor="mobile">Mobile</label>}
            {!isAlredyAcc && <input type="text" name="mobile" id="mobile" placeholder="+91 9730******" value={inputData.mobile} onChange={handleInput} />}

              <label htmlFor="password">Password</label>
             <input type="password" name="password" id="password" placeholder="******" value={inputData.password} onChange={handleInput} />
               
               <button type="submit">{isAlredyAcc?"Login":"Register"}</button>

               <p>{isAlredyAcc?"Don't have an account?":"Already have an account?"}
                  <span onClick={() => setIsAlredyAcc(!isAlredyAcc)}> {isAlredyAcc ? " Register" : " Login"} </span>
               </p>
             </form>
        </div>
        </>
    )
}
export default Autho;