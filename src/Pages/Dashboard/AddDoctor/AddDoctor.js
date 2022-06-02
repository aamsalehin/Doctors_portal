import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Spinner from "../../Shared/Spinner/Spinner";

function AddDoctor() {
  const { data: serviceName, isLoading } = useQuery("serviceName", () =>
    fetch("http://localhost:4000/services").then((res) => res.json())
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
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
                <span className="text-red-500 small">
                  {errors.name.message}
                </span>
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
                <span className="text-red-500 small">
                  {errors.email.message}
                </span>
              )}
              {errors.email?.type === "required" && (
                <span className="text-red-500 small">
                  {errors.email.message}
                </span>
              )}
              <select
                {...register("speciality", { required: true })}
                class="select select-bordered w-full max-w-xs"
              >
                {serviceName.map((sn) => (
                  <option key={sn._id} value={sn.name}>
                    {sn.name}
                  </option>
                ))}
              </select>
              <input
                {...register("img", { required: true })}
                type="file"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
              />

              <input
                type="submit"
                className="btn btn-primary text-white font-bold"
                value="Add"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
