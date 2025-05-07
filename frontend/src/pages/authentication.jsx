import React, { useState } from 'react';
import LoginForm from '../components/loginform';
import SignupForm from '../components/signupform';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-primary-black">
      <div className="w-full max-w-md p-8 bg-secondary-darkgray rounded-2xl shadow">
        {isLogin ? (
          <>
            <LoginForm />
            <p className="text-sm text-center text-secondary-lightgray mt-4">
              Don’t have an account?{' '}
              <button
                onClick={toggleForm}
                className="text-secondary-lightblue hover:underline"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupForm />
            <p className="text-sm text-center text-secondary-lightgray mt-4">
              Already have an account?{' '}
              <button
                onClick={toggleForm}
                className="text-secondary-lightblue hover:underline"
              >
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default Authentication;
