
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginForm';
import Signup from './SignupForm';
import Header from './Header';
import Home from './Home';
import Inbox from './Inbox';
import Compose from './Compose';
import Forgot from './ForgotPassword';
import Protected from './Protected/Protected';
import Sentbox from './Sentbox';
import ReadMails from './ReadMails';

const Navigation = () => {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/reset_password" element={<Forgot />} />
      <Route
          exact
          path="/inbox"
          element={
            <Protected>
              <Inbox />
            </Protected>
          }
        />
        <Route
          exact
          path="/compose"
          element={
            <Protected>
              <Compose />
            </Protected>
          }
        />

<Route
          exact
          path="/sentbox"
          element={
            <Protected>
              <Sentbox />
            </Protected>
          }
        />

        <Route
          exact
          path="/readmail/:id"
          element={
            <Protected>
              <ReadMails />
            </Protected>
          }
        />

<Route
          exact
          path="/sentmail/:id"
          element={
            <Protected>
              <ReadMails />
            </Protected>
          }
        />
    </Routes>
    </BrowserRouter>

  )
}

export default Navigation
