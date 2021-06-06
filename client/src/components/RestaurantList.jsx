import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { RestaurantsContext } from "../contextAPI/RestaurantsContext";
import Munchies from "./apis/Munchies";

function RestaurantList() {
  // UseContext
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  // Browser History Object
  let history = useHistory();
  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Munchies.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // Handle Delete
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await Munchies.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  // Handle Updates
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };
  // handle Selected Restaurant
  const handleSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <div className="list-group">
      <table className="table">
        <thead>
          <tr className="bg-primary table-head-row">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => {
                    handleSelect(restaurant.id);
                  }}
                  key={restaurant.id}
                  className="table-row"
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>Rating</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr className="table-row">
            <td>McDonalds</td>
            <td>New York</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr className="table-row">
            <td>McDonalds</td>
            <td>New York</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
