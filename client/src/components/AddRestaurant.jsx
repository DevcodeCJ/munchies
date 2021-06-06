import React, { useContext, useState } from "react";
import { RestaurantsContext } from "../contextAPI/RestaurantsContext";
import Munchies from "./apis/Munchies";

function AddRestaurant() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const { addRestaurant } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Munchies.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
      setName("");
      setLocation("");
      setPriceRange("Price Range");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
              }}
              className="custom-select my-1 mr-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="add-btn btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
