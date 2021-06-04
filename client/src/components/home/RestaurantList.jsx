import React, { useEffect } from "react";
import munchies from "./apis/munchies";

function RestaurantList() {
  useEffect(async () => {
    try {
      const response = await munchies.get("./");
      console.log(response);
    } catch (error) {}
  }, []);

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
          {/* Row 1 */}
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
          </tr>
          {/* Row 2 */}
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
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
