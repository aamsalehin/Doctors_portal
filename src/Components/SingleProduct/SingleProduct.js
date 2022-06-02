import React from "react";

function SingleProduct() {
  return (
    <div>
      <div class="rounded-lg ring-1 ring-gray-900 ring-opacity-5 overflow-hidden bg-white">
        <img
          class="sm:hidden w-full h-auto"
          loading="lazy"
          src="https://img.freepik.com/free-photo/white-chair-isolated-white-background-great-article-about-home-decor-essentials_181624-34302.jpg?t=st=1653134449~exp=1653135049~hmac=89bb75a7051c4780fce7bf757a6ecf351b609d850ccbd3a7cdc96d0fe70d11bf&w=1800"
          alt=""
          width="375"
          height="656"
        />
        <img
          class="hidden sm:block w-full h-auto"
          loading="lazy"
          src="https://img.freepik.com/free-photo/white-chair-isolated-white-background-great-article-about-home-decor-essentials_181624-34302.jpg?t=st=1653134449~exp=1653135049~hmac=89bb75a7051c4780fce7bf757a6ecf351b609d850ccbd3a7cdc96d0fe70d11bf&w=1800"
          alt=""
          width="1280"
          height="676"
        />
      </div>
    </div>
  );
}

export default SingleProduct;
