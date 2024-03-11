// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import LoginForm from '../components/LoginPage/LoginForm';

// const Login = () => {
//   return (
//     <HelmetProvider>
//       <Helmet>
//         <title>Login</title>
//       </Helmet>
//       <LoginForm />
//     </HelmetProvider>
//   );
// };

// export default Login;

import React from 'react';
import LoginForm from '../components/LoginPage/LoginForm';

const Login = () => {
  const redirectToPhonebook = () => {
    console.log('Redirecting to Phonebook...');
  };

  return <LoginForm onLoginSuccess={redirectToPhonebook} />;
};

export default Login;
