import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Spinner from "../Shared/Spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

function Signup() {
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const [token] = useToken(user || gUser);
  useEffect(() => {
    if (token) {
      navigate("/appointment");
    }
  }, [token, navigate]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  if (gLoading || loading || updating) {
    return <Spinner></Spinner>;
  }

  let errMsg;
  if (error || gError || updateError) {
    errMsg = error.message || gError.message || updateError.message;
  }
  return (
    <div className="flex justify-center align-items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center uppercase text-primary">
            Sign Up
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-clos-1 gap-5"
          >
            <input
              {...register(
                "name",

                {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                }
              )}
              type="text"
              placeholder="Type Name"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name?.type === "required" && (
              <span className="text-red-500 small">{errors.name.message}</span>
            )}
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
            <span className="text-red-500 small">{errMsg}</span>
            <input
              type="submit"
              className="btn btn-primary text-white font-bold"
              value="Sign Up"
            />
          </form>
          <p className="text-center">
            Already have an acoount?
            <span>
              <Link className="text-primary ml-1" to="/login">
                Login
              </Link>
            </span>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className=" w-full btn btn-outline btn-warning "
          >
            Sign In with google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
