import React from 'react';
import Google from '/google.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const GoogleButton: React.FC = () => {
  //  Login Function
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log(response);
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          },
        );

        if (res.status === 200) {
          localStorage.setItem('User', JSON.stringify(res.data));
          // console.log('success');
          toast.success('Login Successful');
          setTimeout(() => {
            window.location.href = '/dashboard';
            // navigate('/dashboard');
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <Toaster position="top-center" richColors />
      <button onClick={() => login()}>
        <img src={Google} alt="google" />
      </button>
    </div>
  );
};

export default GoogleButton;
