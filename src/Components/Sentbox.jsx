import {useEffect , useState} from 'react'
import { FirebaseAuthentication } from '../Firebase/FirebaseConfig';
import Sidebar from './SideNavbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSentEmails } from '../ReduxToolKit/mailSlice';
const Sentbox = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sentEmails= useSelector((state) => state.mail.sentEmailsArr);
  console.log("sentEmails",sentEmails)

    
    const userEmail = FirebaseAuthentication.currentUser.email;





    useEffect(() => {
        const unsubscribe = FirebaseAuthentication.onAuthStateChanged(user => {
          if (user) {
            dispatch(fetchSentEmails(userEmail));
            console.log('User is signed in');
          } else {
            console.log('No user is signed in');
          }
        });
        
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
    
      }, []);


      const handleReadMail = (id)=>{
        console.log("clicked",id)
    
        //chage the read status of the mail to true
      //do this update the redux 
    
      
        navigate(`/sentmail/${id}`)
      }

      if(!sentEmails){
        return <div>Loading...</div>
      }

console.log("sentMailArr",sentEmails)

  return (
    <div className="bg-white ml-64 mt-24 mr-24 rounded-lg shadow-md overflow-hidden">
    <Sidebar/>
    <div className="px-4 py-5  bg-gray-100 border-b border-gray-200 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Sent Mail</h3>
    </div>
    <ul className="divide-y divide-gray-200 ">
      {sentEmails.map((email) => (
         
        <li key={email.requestBody.sentAt} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
          
          <div className="flex items-center justify-between"
            onClick={() => handleReadMail(email.id)}
          >
            <div className="truncate">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://via.placeholder.com/50"
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {email.requestBody.to}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {email.requestBody.subject}
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-2 flex-shrink-0 flex">
              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Sent
              </p>

              <span className="text-sm text-gray-500">
            {new Date(email.requestBody.sentAt).toLocaleString()}
          </span>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600 line-clamp-2">
              {email.requestBody.message}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Sentbox