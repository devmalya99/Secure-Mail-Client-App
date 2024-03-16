import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ReadMails = () => {
    const {id} = useParams();

    const inboxEmails = useSelector((state) => state.mail.inboxEmailsArr);
    console.log("inboxEmails",inboxEmails)

    const sentEmails = useSelector((state) => state.mail.sentEmailsArr);
    console.log("sentEmails",sentEmails)

    const myMail = [...inboxEmails, ...sentEmails].find((mail) => mail.id.toString() === id);
    console.log("Mail to be read",myMail)

    if(!myMail)
    {
      return ( <div className="flex justify-center items-center h-screen">
      <p className="text-2xl text-gray-600">Email not found</p>
    </div>)
    }

    
    
    return (
      <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <h2 className="text-2xl font-bold mb-2">{myMail.requestBody.subject}</h2>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-800 mr-2">From:</span>
          <span className="text-gray-600">{myMail.requestBody.from}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-800 mr-2">To:</span>
          <span className="text-gray-600">{myMail.requestBody.to}</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="font-semibold text-gray-800 mr-2">Sent At:</span>
          <span className="text-gray-600">{new Date(myMail.requestBody.sentAt).toLocaleString()}</span>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-800">{myMail.requestBody.message}</p>
        </div>
      </div>
    </div>
  )
}

export default ReadMails
