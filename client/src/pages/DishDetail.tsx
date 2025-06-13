import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import type { Dish, Rating } from "../types";

const GET_DISH = gql`
  query GetDish($id: ID!) {
    dish(id: $id) {
      id
      name
      description
      price
      portion_size
      location {
        id
        name
        address
      }
      ratings {
        id
        taste_rating
        portion_rating
        presentation_rating
        notes
        created_at
        user {
          username
        }
      }
    }
  }
`;

const CREATE_RATING = gql`
  mutation CreateRating($input: CreateRatingInput!) {
    createRating(input: $input) {
      id
      taste_rating
      portion_rating
      presentation_rating
      notes
      created_at
      user {
        username
      }
    }
  }
`;

const DishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [tasteRating, setTasteRating] = useState(0);
  const [portionRating, setPortionRating] = useState(0);
  const [presentationRating, setPresentationRating] = useState(0);
  const [notes, setNotes] = useState("");

  const { data, loading, error } = useQuery<{ dish: Dish }>(GET_DISH, {
    variables: { id },
  });

  const [createRating, { loading: submitting }] = useMutation(CREATE_RATING, {
    onCompleted: () => {
      setShowRatingForm(false);
      setTasteRating(0);
      setPortionRating(0);
      setPresentationRating(0);
      setNotes("");
    },
  });

  const calculateAverageRating = (ratings: Rating[]) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => {
      return (
        sum +
        (rating.taste_rating +
          rating.portion_rating +
          rating.presentation_rating) /
          3
      );
    }, 0);
    return Number((total / ratings.length).toFixed(1));
  };

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await createRating({
        variables: {
          input: {
            dish_id: id,
            taste_rating: tasteRating,
            portion_rating: portionRating,
            presentation_rating: presentationRating,
            notes,
          },
        },
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !data?.dish) {
    return (
      <div className="alert alert-error">
        <span>Error loading dish details. Please try again later.</span>
      </div>
    );
  }

  const dish = data.dish;
  const averageRating = calculateAverageRating(dish.ratings);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Dish Information */}
      <div className="card-primary">
        <div className="card-body">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{dish.name}</h1>
              <p className="text-gray-500">{dish.location.name}</p>
              <p>{dish.location.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={star <= Math.round(averageRating)}
                    readOnly
                  />
                ))}
              </div>
              <span className="text-lg">({averageRating})</span>
            </div>
          </div>
          <div className="divider"></div>
          <p className="text-lg">{dish.description}</p>
          <div className="flex gap-4 mt-4">
            <div>
              <span className="font-semibold">Price:</span> $
              {dish.price.toFixed(2)}
            </div>
            <div>
              <span className="font-semibold">Portion Size:</span>{" "}
              {dish.portion_size}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Form */}
      <div className="card-primary">
        <div className="card-body">
          {!showRatingForm ? (
            <button
              className="btn btn-primary"
              onClick={() => setShowRatingForm(true)}
            >
              Rate this Dish
            </button>
          ) : (
            <form onSubmit={handleSubmitRating} className="space-y-6">
              <h2 className="text-2xl font-bold">Submit Your Rating</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Taste</span>
                  </label>
                  <div className="rating rating-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name="taste-rating"
                        className="mask mask-star-2 bg-orange-400"
                        checked={star === tasteRating}
                        onChange={() => setTasteRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Portion Size</span>
                  </label>
                  <div className="rating rating-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name="portion-rating"
                        className="mask mask-star-2 bg-orange-400"
                        checked={star === portionRating}
                        onChange={() => setPortionRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Presentation</span>
                  </label>
                  <div className="rating rating-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name="presentation-rating"
                        className="mask mask-star-2 bg-orange-400"
                        checked={star === presentationRating}
                        onChange={() => setPresentationRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Notes (Optional)</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share your thoughts about this dish..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowRatingForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    submitting ||
                    !tasteRating ||
                    !portionRating ||
                    !presentationRating
                  }
                >
                  {submitting ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Submit Rating"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Ratings List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {dish.ratings.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to rate this dish!
          </p>
        ) : (
          <div className="space-y-4">
            {dish.ratings.map((rating) => (
              <div key={rating.id} className="card-primary">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{rating.user?.username}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(rating.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rating rating-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name={`rating-${rating.id}`}
                            className="mask mask-star-2 bg-orange-400"
                            checked={
                              star <=
                              Math.round(
                                (rating.taste_rating +
                                  rating.portion_rating +
                                  rating.presentation_rating) /
                                  3
                              )
                            }
                            readOnly
                          />
                        ))}
                      </div>
                      <span className="text-sm">
                        (
                        {(
                          (rating.taste_rating +
                            rating.portion_rating +
                            rating.presentation_rating) /
                          3
                        ).toFixed(1)}
                        )
                      </span>
                    </div>
                  </div>
                  {rating.notes && (
                    <div className="mt-2">
                      <p>{rating.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DishDetail;
