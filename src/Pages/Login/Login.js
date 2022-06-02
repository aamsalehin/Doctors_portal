import React, { useEffect, useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Spinner from "../Shared/Spinner/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [token] = useToken(user || gUser);
  //this lines of code to reomve warning
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  if (gLoading || loading) {
    return <Spinner></Spinner>;
  }
  let errorMsg;
  if (error || gError) {
    errorMsg = error.message;
  }
  // if (user || gUser) {
  //   navigate(from, { replace: true });
  // }
  return (
    <div className="flex justify-center align-items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center uppercase text-primary">
            Login
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-clos-1 gap-5"
          >
            <input
              {...register(
                "email",

                {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Plaease enter a valid email",
                  },
                }
              )}
              type="email"
              placeholder="Type Email"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email?.type === "pattern" && (
              <span className="text-red-500 small">{errors.email.message}</span>
            )}
            {errors.email?.type === "required" && (
              <span className="text-red-500 small">{errors.email.message}</span>
            )}
            <input
              {...register(
                "password",

                {
                  required: { value: true, message: "password is required" },
                  minLength: {
                    value: 6,
                    message: "Password Should be 6 digits",
                  },
                  // pattern: {
                  //   value:
                  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  //   message: "please enter a valid password",
                  // },
                }
              )}
              type="password"
              placeholder="Type Password"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 small">
                {errors.password.message}
              </span>
            )}
            {errors.password?.type === "required" && (
              <span className="text-red-500 small">
                {errors.password.message}
              </span>
            )}

            {/* <span className="small text-gray-300">
              at least one uppercase, on lowercase, one number and one spacial
              character and minimum length 8
            </span> */}
            <span className="text-red-500 small">{errorMsg}</span>
            <input
              type="submit"
              className="btn btn-primary text-white font-bold"
              value="Login"
            />
          </form>
          <p className="text-center">
            Are you new here?
            <span>
              <Link className="text-primary ml-1" to="/signup">
                Sign Up
              </Link>
            </span>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className=" w-full btn btn-outline btn-warning "
          >
            Login with google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
