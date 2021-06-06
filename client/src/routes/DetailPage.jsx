import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import Munchies from "../components/apis/Munchies";
import { RestaurantsContext } from "../contextAPI/RestaurantsContext";

function DetailPage() {
  const { id } = useParams();
  // useContext
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Munchies.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <div>{selectedRestaurant && selectedRestaurant.name}</div>;
}

export default DetailPage;
