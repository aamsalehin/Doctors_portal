import React from "react";

function InfoCard(props) {
  const { img, title, description, bg_class } = props;
  return (
    <>
      <div className={`p-5  card card-side shadow-xl ${bg_class}`}>
        <figure>
          <img src={img} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-white">{title}</h2>
          <p className="text-slate-50">{description}</p>
        </div>
      </div>
    </>
  );
}

export default InfoCard;
