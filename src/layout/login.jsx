import React from "react";
import Logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className="bg-[#eeeeee] flex justify-center items-center h-[100vh] relative">
        <form className="bg-white max-w-[550px] w-full flex flex-col justify-center items-center rounded-2xl px-5 py-7 gap-[15px]">
          <img className="w-[100px]" src={Logo} alt="logo" />
          <h3 className="text-[#093b94] text-2xl font-bold">KIU LMS</h3>
          <button className="bg-[#34a853] rounded-full text-white p-2">
            Download App
          </button>
          <div className="w-full">
            <label for="username" class="block text-sm text-[#093b94]">
              Registration No.
            </label>

            <input
              type="text"
              placeholder="YYYY-KIU*****"
              class="block  mt-2 w-full placeholder-[black]  rounded-2xl border border-[black] bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              required
            />
          </div>
          <div className="w-full">
            <label for="username" class="block text-sm text-[#093b94]">
              password
            </label>

            <input
              type="password"
              placeholder="********"
              class="block  mt-2 w-full placeholder-[black]  rounded-2xl border border-[black] bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              required
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="flex gap-[5px]">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember me</label>
            </div>
            <button className="bg-[#ea4335] rounded-full text-white p-1 text-[12px]">
              forget password?
            </button>
          </div>

          <div className="w-full">
            <Link to="/dashboard">
              <button className="bg-[#093b94] text-white rounded-2xl w-[300px] py-2">
                Sign In
              </button>
            </Link>
          </div>
          <div className="w-full">
            <p className="text-[#093b94]">Track your problem</p>
          </div>
        </form>
        <p className="absolute bottom-[10px] left-50 right-50">
          © 2024 Karakoram International University
        </p>
      </div>
    </>
  );
};
export default Login;
