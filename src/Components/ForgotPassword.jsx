import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'

const Forgot = () => {
  let logo_src = "https://t4.ftcdn.net/jpg/04/53/70/41/360_F_453704176_fRLaZTHGmRZmM6BpZZe2PT17DBsjb4md.jpg"
  let logo_alt = "My Money Logo"

  const [email, setEmail] = useState('')
 
  
  const Navigate = useNavigate()

 
  

  const handleFormSubmit = async (e)=>{
      e.preventDefault()
      if(email.trim()===''){
          alert('please enter all the fields')
      }
      
      

  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 dark:text-white ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2"  alt={logo_alt} />
            DevMailClient App
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form 
            onSubmit={handleFormSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                type="email" name="email" id="email" aria-describedby="Email address to reset password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" aria-required="true" placeholder="name@company.com" required />
              </div>
             
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms_conditions" name="terms_conditions" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" aria-required="true" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms_conditions" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? 
                        <Link to="/login" aria-label="Sign Up" tabIndex="0" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                    </p>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
             
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Forgot