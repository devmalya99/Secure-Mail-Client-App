import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

import Header from "./Header";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  

  const Navigate = useNavigate();

  async function signup(email,password){

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALYreoXqacVFLxlDfVmjCAVcp21Q-PeGI', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    })

    if (!response.ok) {
      throw new Error('Error during sign up');
    }

    const data = await response.json();
    console.log(data)




    } catch (error) {
       // Check the response status
   
      console.log(error)
    }
   
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("please enter all the fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    // Perform signup logic here
   await signup(email,password)
    


    // Reset form fields
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);



    alert("Please Login To continue");
    

    Navigate("/login");
  };

  return (
    <>
    <Header />
     
      <section className="bg-white-800 dark:bg-black dark:text-white">
        <div className="grid grid-cols-2 md:h-screen lg:py-0 px-6 py-8 mx-auto items-center justify-items-center">
          <img
            className="justify-self-center"
            src="https://img.freepik.com/free-vector/phone-surrounded-by-messages-isometric-style_52683-22931.jpg?w=740&t=st=1710596350~exp=1710596950~hmac=dfedf037e78f122259561cef0d33068d7745d0937976909a003535aa1c1437ac"
            alt="Paisa Kaha Gaya Image"
            width="740"
            height="582"
          />
          <div className="bg-white w-full max-w-2xl p-6 m-4 rounded-lg  dark:bg-black  md:mt-0 sm:max-w-md xl:p-0">
          <h2 className="font-bold text-2xl mb-5 text-gray-800 dark:text-gray-100">Signup</h2>
            {error && <p>{error}</p>}
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  aria-label="Sign Up"
                  tabIndex="0"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
