import React from "react";

function Hero(props) {
  const { image } = props;
  return (
    <>
      <div className="hero min-h-screen bg-base-200 px-12">
        <div className="hero-content gap-28 flex-col lg:flex-row-reverse">
          <img
            src={image}
            className="max-w-sm lg:max-w-lg rounded-lg shadow-2xl"
            alt="hero snap"
          />
          <div className="text-center   lg:text-left lg:max-w-xs">
            <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
            <p className="py-6 ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
            <button className="btn btn-primary uppercase">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
