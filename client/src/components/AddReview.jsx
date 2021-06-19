import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import Munchies from "./apis/Munchies";

function AddReview() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await Munchies.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      history.push("/");
      history.push(location.pathname);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-2 add-review">
      <form action="">
        <div className="form-row mb-4">
          <div className="form-group col-7 review-info">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              className="form-control"
              type="text"
            />
          </div>
          <div className="form-group col-4 review-info">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
            id="review"
            className="form-control"
          ></textarea>
        </div>
        <button
          onClick={handleSubmitReview}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddReview;
