


import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className="bg-white  sticky top-0 z-10 dark:bg-black dark:text-white">
    <div className=" w-full">
      <div className="flex justify-between h-16">
        <div className="w-full flex items-center justify-start md:w-auto">
          <a href="#" className="flex-shrink-0">
          <span className="font-bold text-3xl">
  <span className="text-gray-500 ml-4">Email Client</span>
  
</span>
          </a>
        </div>
        <div className="hidden md:block w-full md:w-auto" id="navbar-solid-bg">
          <div className="md:ml-auto md:mr-0 md:py-0 md:block md:basis-1/4">
            <div className="flex items-center justify-end flex-1 md:flex-none md:mr-4">
              <div
              
              className=" p-4 text-xl text-blue-800 cursor-pointer  hover:text-2xl ">
                <Link to={'/'}>Home</Link> 
                
              </div>
              <div className=" p-4 text-xl text-blue-800 cursor-pointer  hover:text-2xl ">
                About
              </div>
              <div className=" p-4 text-xl text-blue-800 cursor-pointer  hover:text-2xl ">
                Pricing
              </div>
              <div className=" p-4 text-xl text-blue-800 cursor-pointer  hover:text-2xl ">
                FAQ
              </div>
              <div className=" p-4 text-xl text-blue-800 cursor-pointer  hover:text-2xl ">
                Blog
              </div>
              <div className=" p-4 text-xl text-blue-800 cursor-pointer  hover:text-2xl ">
               Contact
              </div>
              <button className="bg-white mr-2 px-4 py-2 rounded-md text-gray-800 border border-gray-400 shadow-sm hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link to={'/signup'}>Signup</Link> 
              </button>
              <button className="white px-4 ml-2 py-2 rounded-md text-gray-700 bg-gray-100 border border-transparent shadow-sm hover:text-blue-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:text-xl">
              <Link to={'/login'}>Login</Link> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header