import React from "react";

function AddRestaurant() {
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col">
            <select className="custom-select my-1 mr-2">
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button className="add-btn btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
