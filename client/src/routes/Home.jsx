import React from "react";
import Header from "../components/home/Header";
import AddRestaurant from "../components/home/AddRestaurant";
import RestaurantList from "../components/home/RestaurantList";

function Home() {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
}

export default Home;
