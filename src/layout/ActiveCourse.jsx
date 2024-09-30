import React, { useState } from "react";
import { Link } from "react-router-dom";

const ActiveCourse = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "Fundamental of programming",
      answer: "attendance",
    },
    {
      question: "Intoduction to ICT",
      answer: "attendance",
    },
    {
      question: "DBMS",
      answer: "attendance",
    },
  ];
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <h1>Active Course</h1>
      <div className="w-full mt-8  flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b bg-[#1976d2] w-full rounded">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between w-full p-4 text-left focus:outline-none focus:ring"
            >
              <div className="">
                <span className="font-bold text-lg text-white">
                  {faq.question}
                </span>
              </div>
              <span className="ml-2">{activeIndex === index ? "-" : "+"}</span>
            </button>

            {activeIndex === index && (
              <div className="p-4 text-gray-600 bg-[white]">
                <Link to="attendance" className=" flex flex-col justify-center items-center text-center">
                  <svg
                    class="flex-shrink-0 w-5 h-5 fill-[#1976d2]  transition duration-75 dark:text-gray-400 group-hover:fill-gray-900 dark:group-hover:fill-white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    mirror-in-rtl="true"
                  >
                    <path
                      // fill="#ffffff"
                      d="M7 11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2zm-2 6.993L9 18c.55 0 1-.45 1-1v-2c0-1.65-1.35-3-3-3s-3 1.35-3 3v2c0 .552.448.993 1 .993zM19 18h-6c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1z"
                    />
                    <path
                      // fill="#ffffff"
                      d="M22 2H2C.9 2 0 2.9 0 4v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 17.5c0 .28-.22.5-.5.5h-19c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h19c.28 0 .5.22.5.5v15z"
                    />
                  </svg>
                  {faq.answer}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ActiveCourse;
