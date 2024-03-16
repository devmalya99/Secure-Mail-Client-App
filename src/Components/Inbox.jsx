

import {useState, useEffect} from 'react'
import Sidebar from './SideNavbar'
import {Link, useNavigate} from 'react-router-dom'
import Logout from './Buttons/LogoutButton'
import { FirebaseAuthentication } from '../Firebase/FirebaseConfig'
import { deleteInboxEmail, fetchInboxEmails, updateInboxEmail } from '../ReduxToolKit/mailSlice';
import ReadMails from './ReadMails'
import { useSelector , useDispatch} from 'react-redux';
const Inbox = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const inboxEmails = useSelector((state) => state.mail.inboxEmailsArr);
  console.log("inboxEmails",inboxEmails)

  

  const handleDeleteMail = (id) => {
    dispatch(deleteInboxEmail({id, email: FirebaseAuthentication.currentUser.email}));
  }


  const handleReadMail = (id)=>{
    console.log("clicked",id)

    //chage the read status of the mail to true
  //do this update the redux 

  dispatch(updateInboxEmail({ id, email: FirebaseAuthentication.currentUser.email, readStatus: true }));
    navigate(`/readmail/${id}`)
  }

  useEffect(()=>{
    const unsubscribe = FirebaseAuthentication.onAuthStateChanged(user=>{
      if(user){
        dispatch(fetchInboxEmails(user.email));
        console.log('User is signed in');
      }else{
        console.log('No user is signed in');
      }
    })
    
     // Cleanup subscription on unmount
     return () => unsubscribe();
  },[])


  if(!inboxEmails){
    return <div>Loading...</div>
  }

  return (
    <>
    <Sidebar/>
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
              
              
              <Logout/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 ml-64 ">
    <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">See What's Waiting for You</h1>
    <ul className="divide-y divide-gray-200 primary-shadow rounded-lg overflow-hidden">
        {inboxEmails.map((email) => (
            <li
                key={email.requestBody.sentAt}
                className="bg-blue-gray-100 mt-4 hover:bg-gray-400 transition duration-300 ease-in-out p-6 space-y-4">
                <div className="flex items-start space-x-4 cursor-pointer"
                     onClick={() => handleReadMail(email.id)}>
                    <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-blue-gray-200">
                        {email.requestBody.read === false && (
                            <div className="text-blue-500">🔵</div>
                        )}
                        <img
                            className="h-10 w-10 rounded-full"
                            src="https://via.placeholder.com/50"
                            alt="Avatar"
                        />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-red-700 truncate">{email.requestBody.to}</p>
                        <p className="text-base text-gray-500 truncate">{email.requestBody.subject}</p>
                    </div>
                </div>
                <p className="text-2xl text-gray-600 line-clamp-2 ">{email.requestBody.body}</p>
                <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Sent
                    </span>
                    <span className="text-sm text-gray-500">{new Date(email.requestBody.sentAt).toLocaleString()}</span>
                </div>
                <div className="text-right">
                    <button
                        onClick={() => handleDeleteMail(email.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg shadow bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white">
                        Delete Email
                    </button>
                </div>
            </li>
        ))}
    </ul>
</div>

  

  </>
  )
}

export default Inbox