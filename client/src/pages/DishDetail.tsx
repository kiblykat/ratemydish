import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useAuth } from "../hooks/useAuth";
import type { Dish, Review } from "../types";

const GET_DISH = gql`
  query GetDish($id: ID!) {
    dish(id: $id) {
      id
      name
      description
      imageUrl
      rating
      reviews {
        id
        rating
        comment
        user {
          id
          username
        }
        createdAt
      }
    }
  }
`;

const ADD_REVIEW = gql`
  mutation AddReview($dishId: ID!, $rating: Int!, $comment: String!) {
    addReview(dishId: $dishId, rating: $rating, comment: $comment) {
      id
      rating
      comment
      user {
        id
        username
      }
      createdAt
    }
  }
`;

const DishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { loading, error, data } = useQuery(GET_DISH, {
    variables: { id },
  });

  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_DISH, variables: { id } }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview({
        variables: {
          dishId: id,
          rating,
          comment,
        },
      });
      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-error">Error loading dish</div>;
  if (!data?.dish) return <div className="text-center">Dish not found</div>;

  const dish: Dish = data.dish;

  return (
    <div className="space-y-8">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="h-96 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-3xl">{dish.name}</h1>
          <p className="text-lg">{dish.description}</p>
          <div className="rating rating-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-orange-400"
                checked={star === Math.round(dish.rating)}
                readOnly
              />
            ))}
          </div>
        </div>
      </div>

      {user && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating-input"
                    className="mask mask-star-2 bg-orange-400"
                    checked={star === rating}
                    onChange={() => setRating(star)}
                  />
                ))}
              </div>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {dish.reviews.map((review: Review) => (
          <div key={review.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{review.user.username}</h3>
                  <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`rating-${review.id}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked={star === review.rating}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishDetail;
