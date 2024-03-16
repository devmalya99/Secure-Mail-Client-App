

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for saving email to the inbox:

    export const saveInboxEmail = createAsyncThunk(
        'mail/saveInboxEmail',
        async (payload, { rejectWithValue }) => {
          try {
            const { to, requestBody } = payload;
            const formattedTo = to.replace(/\./g, '_');
            const response = await fetch(`https://mailbox-client-app-default-rtdb.firebaseio.com/inbox/${formattedTo}.json`, {
              method: 'POST',
              body: JSON.stringify({ requestBody })
            });
      
            if (!response.ok) {
              throw new Error('Error saving email to inbox');
            }
      
            return requestBody;
          } catch (error) {
            return rejectWithValue(error.message);
          }
        }
      );
    

//Async thunk for saving email to the sent box:
export const saveSentEmail = createAsyncThunk(
    'mail/saveSentEmail',
    async (payload, { rejectWithValue }) => {
      try {
        const { from, requestBody } = payload;
        const formattedFrom = from.replace(/\./g, '_');
        const response = await fetch(`https://mailbox-client-app-default-rtdb.firebaseio.com/sent/${formattedFrom}.json`, {
          method: 'POST',
          body: JSON.stringify({ requestBody })
        });
  
        if (!response.ok) {
          throw new Error('Error saving email to sent box');
        }
  
        return requestBody;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  //Async thunk for fetching user's inbox details:
  export const fetchInboxEmails = createAsyncThunk(
    'mail/fetchInboxEmails',
    async (email, { rejectWithValue }) => {
      try {
        const formattedEmail = email.replace(/\./g, '_');
        const response = await fetch(`https://mailbox-client-app-default-rtdb.firebaseio.com/inbox/${formattedEmail}.json`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Error fetching inbox emails');
        }
  
        const data = await response.json();
        return data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  //Async thunk for fetching user's sent box details:
  export const fetchSentEmails = createAsyncThunk(
    'mail/fetchSentEmails',
    async (email, { rejectWithValue }) => {
      try {
        const formattedEmail = email.replace(/\./g, '_');
        const response = await fetch(`https://mailbox-client-app-default-rtdb.firebaseio.com/sent/${formattedEmail}.json`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Error fetching sent emails');
        }
  
        const data = await response.json();
        return data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // Async thunk for updating read status:
// Async thunk for updating read status of an Email:
export const updateInboxEmail = createAsyncThunk(
  'mail/updateInboxEmail',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { id, email, readStatus } = payload; 
      const formattedEmail = email.replace(/\./g, '_');

      // Get the current state and the requestBody of the email to update 
      const state = getState();
      const requestBody = state.mail.inboxEmailsArr.find((email) => email.id === id).requestBody;

      // Update the read status in requestBody
      const updatedRequestBody = { ...requestBody, read: readStatus };

      // Update back to the server
      const response = await fetch(`https://mailbox-client-app-default-rtdb.firebaseio.com/inbox/${formattedEmail}/${id}/requestBody.json`, {
        method: 'PUT',
        body: JSON.stringify(updatedRequestBody)
      });

      if (!response.ok) {
        throw new Error('Error updating read status of inbox email');
      }

      return payload; // Payload is the original payload containing id,email and readStatus
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

  //Async thunk for deleting an email:
  export const deleteInboxEmail  = createAsyncThunk(
    'mail/deleteInboxEmail',
    async (payload, { rejectWithValue }) => {
      try {
        const {id,email} = payload;
        const formattedEmail = email.replace(/\./g, '_');
         
        const response = await fetch(`https://mailbox-client-app-default-rtdb.firebaseio.com/inbox/${formattedEmail}/${id}.json`,{
        
          method: 'DELETE',
        
        })

        if(!response.ok){
          throw new Error('Error deleting email')
        }

         // Returns the payload as it is as we need this information in the reducer for filtering out the deleted email from state
      return payload; 

      } catch (error) {
        console.log(error)
      }
    }
  )


  //now create slice for it
  const mailSlice = createSlice({
    name: 'mail',
    initialState: {
      inboxEmailsArr: [],
      sentEmailsArr: [],
      isLoading: false,
      error: null,
      totalUnreadMessages: 0,
    },
    reducers:{
        //how will i design my reducers here?
        //Ans: You can define reducers in the reducers field of createSlice to handle synchronous actions, 
        //such as resetting the state or updating a specific property.
        resetState: (state) => {
            state.inboxEmailsArr = [];
            state.sentEmailsArr = [];
            state.isLoading = false;
            state.error = null;
          },

    },
    extraReducers: (builder) => {
        //what is the need of extra reducers here? how should i design extra reducers here?
        //Ans: The extraReducers field is used to handle the lifecycle of asynchronous actions (like your async thunks) 
        //by defining how the state should be updated based on the different action types (pending, fulfilled, and rejected).
    
       builder

       //save Inbox Email
       .addCase(saveInboxEmail.pending , (state)=>{
        state.isLoading = true;
        state.error = null;
       })
       .addCase(saveInboxEmail.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.inboxEmailsArr.push(action.payload);
       })
       .addCase(saveInboxEmail.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.error.message;
       })

       //Save Sent Email
       .addCase(saveSentEmail.pending, (state)=>{
        state.isLoading = true;
        state.error = null;
       })
       .addCase(saveSentEmail.fulfilled, (state, action)=>{
           state.isLoading = false;
           state.sentEmailsArr.push(action.payload);
       })
       .addCase(saveSentEmail.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.error.message;
       })

       // Fetch Inbox Emails

       .addCase(fetchInboxEmails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInboxEmails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inboxEmailsArr = action.payload;
        
        // Calculate totalUnreadMessages immediately after fetching the emails.
state.totalUnreadMessages = state.inboxEmailsArr.reduce((count, email) => email.requestBody.read ? count : count + 1, 0);
      })
      .addCase(fetchInboxEmails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      // Fetch Sent Emails
      .addCase(fetchSentEmails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSentEmails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sentEmailsArr = action.payload;
      })
      .addCase(fetchSentEmails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //update read status

      // Update Inbox Email -> Fulfilled
.addCase(updateInboxEmail.fulfilled, (state, action) => {
  state.isLoading = false;
  const { id, readStatus } = action.payload;
  const emailToUpdate = state.inboxEmailsArr.find((email) => email.id === id);
  if (emailToUpdate) 
  {
    // Calculate totalUnreadMessages
    state.totalUnreadMessages = state.inboxEmailsArr.reduce((count, email) => email.requestBody.read ? count : count + 1, 0);

    emailToUpdate.requestBody.read = readStatus;
  }
  
})

//extra reducers for deleting 
// In the extraReducers field

.addCase(deleteInboxEmail.fulfilled, (state, action) => {
  state.isLoading = false;
  const { id } = action.payload;
  state.inboxEmailsArr = state.inboxEmailsArr.filter((email) => email.id !== id);
})



      
      
    
    }
  })

  export default mailSlice.reducer;


