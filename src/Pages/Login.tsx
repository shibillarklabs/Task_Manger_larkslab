import React from 'react';


const Login = () => {
  return (
    <div className='min-h-screen flex justify-center items-center px-4 py-6 sm:px-6 lg:px-8'>
        <div className="w-full max-w-sm sm:max-w-md">
            <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Welcome Back!</h1>
                <div className="text-sm sm:text-base text-gray-300">
                    <span>New User? </span>
                    <button className="text-purple-300 hover:text-purple-200 underline font-medium">
                        Sign up
                    </button>
                </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
                <div>
                    <input type="email" placeholder='Enter Your Email' className='w-full px-3 py-3 sm:px-4 sm:py-4 bg-purple-800/50 border border-purple-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-sm sm:text-base' />
                </div>
                <div className='relative'>
                    <input type="password" placeholder='Enter your password' className='w-full px-3 py-3 sm:px-4 sm:py-4 bg-purple-800/50 border border-purple-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm pr-10 sm:pr-12 text-sm sm:text-base ' />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id='terms' className='w-4 h-4 text-purple-600 bg-purple-800/50 border-purple-700/50 rounded focus:ring-purple-500 focus:ring-2' />
                    <label htmlFor="terms" className='ml-2 sm:ml-3 text-gray-300 text-xs sm:text-sm leading-tight'>
                        I agree to the {' '}
                        <button className='text-purple-300 hover:text-purple-200 underline'>Terms and Conditions</button>
                    </label>
                </div>
                <button type='submit' className=' group w-full py-3 sm:py-4  bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900 text-sm sm:text-base'><span className='inline-block transform transition-transform duration-300 ease-in-out group-hover:scale-110 '>Log In</span></button>
            </div>
        </div>
    </div>
  );
};

export default Login;