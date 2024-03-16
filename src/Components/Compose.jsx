

import {useState , useEffect } from 'react';
// import firebase from 'firebase/app';
import { FirebaseAuthentication } from '../Firebase/FirebaseConfig';

import Sidebar from './SideNavbar';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchInboxEmails, saveInboxEmail, saveSentEmail } from '../ReduxToolKit/mailSlice';
const EmailCompose = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.mail.isLoading);
  const error = useSelector((state) => state.mail.error);

  useEffect(() => {
    const unsubscribe = FirebaseAuthentication.onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in');
      } else {
        console.log('No user is signed in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();

  }, []);

  const currentUser = FirebaseAuthentication.currentUser;
  console.log(currentUser)
  const from = currentUser.email

  const [mailContent,setMailContent] = useState({})
  
  const handleChange = (e)=>{
    setMailContent({...mailContent, [e.target.name]: e.target.value})
  }

  

 


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {to , subject , message} = mailContent;
    const sentAt = new Date().getTime();
     
    if(currentUser){
      
      const requestBody = {
        to,
        subject,
        message,
        sentAt,
        from,
        read: false,
      };

      try{
           // Dispatch the saveInboxEmail action
           dispatch(saveInboxEmail({ to, requestBody }));

            // Dispatch the saveSentEmail action
            dispatch(saveSentEmail({ from, requestBody }));
            

            // Fetch the latest emails after sending
        dispatch(fetchInboxEmails(currentUser.email));

        //reset input field
        setMailContent({})
             // Handle successful response if needed
             alert('Mail sent');
             
          }

      catch(error) 
      {
         console.error('Error:', error);
      }
  }else{
      console.log("User not logged in")
    }

    console.log("submitted")
  }

  return (
    <>
    <header className="bg-gray-500 text-white sticky top-0 z-10 dark:bg-black dark:text-white">
    <div className=" w-full">
      <div className="flex justify-between h-16">
        <div className="w-full flex items-center justify-start md:w-auto">
          <a href="#" className="flex-shrink-0">
          <span className="font-bold text-3xl">
  <span className="text-gray-300 ml-64">Email Client</span>
  
</span>
          </a>
        </div>
        <div className="hidden md:block w-full md:w-auto" id="navbar-solid-bg">
          <div className="md:ml-auto md:mr-0 md:py-0 md:block md:basis-1/4">
            <div className="flex items-center justify-end flex-1 md:flex-none md:mr-4">
              <div
              
              className=" p-4 text-xl text-white cursor-pointer  hover:text-2xl ">
                <Link to={''}>Profile</Link> 
                
              </div>
              <div className=" p-4 text-xl text-white cursor-pointer  hover:text-2xl ">
                About
              </div>
              <div className=" p-4 text-xl text-white cursor-pointer  hover:text-2xl ">
              <i className="fa-solid fa-sun"></i>
              </div>
              
              
              <button className="white px-4 ml-2 py-2 rounded-md text-gray-700 bg-gray-100 border border-transparent shadow-sm hover:text-blue-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:text-xl">
              <Link to={''}>Logout</Link> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
    <Sidebar/>
    <div className="p-6 max-w-3xl ml-64 mt-16 bg-white rounded-xl shadow-md space-y-4">
      <p  className='bg-teal-200 text-xl'>Compose New Message</p>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To
        </label>
        <div className="mt-1">
          <input
            id="to"
            name="to"
            type="text"
            value={mailContent.to || ''}
            autoComplete="email"
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <div className="mt-1">
          <input
            id="subject"
            name="subject"
            type="text"
            value={mailContent.subject || ''}
            autoComplete="email-subject"
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows="4"
            value={mailContent.message || ''}
            
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </div>
      </form>
    </div>
    </>
  );
};

export default EmailCompose;