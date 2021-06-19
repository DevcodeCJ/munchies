import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router";
import AddReview from "../components/AddReview";
import Munchies from "../components/apis/Munchies";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../contextAPI/RestaurantsContext";

function DetailPage() {
  const history = useHistory();
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
  // Return to Home
  const handleBack = () => {
    history.push("/");
  };
  return (
    <div>
      {selectedRestaurant && (
        <>
          <div className="detail-header">
            <h1 className="font-weight-light display-1 text-left">
              {selectedRestaurant.restaurant.name}
            </h1>
            <div className="back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-circle-left fa-4x"></i>
            </div>
          </div>
          <div>
            <StarRating rating={selectedRestaurant.restaurant.avg_rating} />
            <span className="text-warning ml-1">
              (
              {selectedRestaurant.restaurant.count
                ? selectedRestaurant.restaurant.count
                : "0"}
              )
            </span>
          </div>
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
