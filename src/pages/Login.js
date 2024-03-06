// import React from 'react';

// const Login = () => {
//   return (
//     <div>
//       <h1>Login Page</h1>
//       <p>This is the login page.</p>
//     </div>
//   );
// };

// export default Login;
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginForm />
    </HelmetProvider>
  );
};

export default Login;
