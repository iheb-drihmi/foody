'use client';

import InputComponent from '@/components/FormElements/InputComponent';
import Notification from '@/components/Notification';
import { GlobalContext } from '@/context';
import { registrationFormControls } from '@/utils';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@/lib/axios';
import Background from './background';
import Cookies from 'js-cookie';

const initialFormData = {
  name: '',
  email: '',
  password: '',
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
    isAuthUser,
  } = useContext(GlobalContext);
  const router = useRouter();

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== '' &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== ''
      ? true
      : false;
  }

  async function handleRegisterOnSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const {
        data: { message, result },
      } = await api.post('/auth/register', formData);

      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(result.user);
      setFormData(initialFormData);
      Cookies.set('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData(initialFormData);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push('/');
  }, [isAuthUser]);

  return (
    <div className="flex gap-10 h-100vh">
      <Background />
      <div className="w-1/2 grid items-center">
        {/* <p className="text-2xl font-medium text-center font-serif">
          {isRegistered ? 'Registration Successfull !' : 'Sign up for an account'}
        </p> */}
        {isRegistered ? (
          <button
            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        ) : (
          <form className="space-y-6 p-6" onSubmit={handleRegisterOnSubmit}>
            <p className="text-2xl font-medium text-center font-serif">
              {isRegistered ? 'Registration Successfull !' : 'Sign up for an account'}
            </p>
            {registrationFormControls.map(controlItem => (
              <InputComponent
                {...controlItem}
                onChange={event => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
                value={formData[controlItem.id]}
              />
            ))}
            <button
              className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-3 rounded-md text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
              disabled={!isFormValid()}
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </form>
        )}
        <Notification />
      </div>
    </div>
  );
}
