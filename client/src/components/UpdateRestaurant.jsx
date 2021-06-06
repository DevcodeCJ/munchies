import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import Munchies from "./apis/Munchies";

function UpdateRestaurant() {
  const id = useParams();
  // useHistory
  let history = useHistory();
  // useState
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("$");
  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Munchies.get(`/${id.id}`);
        const currentRestaurant = response.data.data.restaurant;
        setName(currentRestaurant.name);
        setLocation(currentRestaurant.location);
        setPriceRange(currentRestaurant.price_range);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // Handle Update
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      await Munchies.put(`/${id.id}`, {
        name,
        location,
        price_range: priceRange,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="">
        <div className="form-group mb-4">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group price-update mb-4">
          <label htmlFor="price_range" className="price-label">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button
          onClick={handleUpdate}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateRestaurant;
