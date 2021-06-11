import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import AddReview from "../components/AddReview";
import Munchies from "../components/apis/Munchies";
import Reviews from "../components/Reviews";
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
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="font-weight-light display-1 text-center">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
}

export default DetailPage;
