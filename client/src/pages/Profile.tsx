import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import type { Rating, User } from "../types";

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      id
      username
      email
      ratings {
        id
        dish {
          id
          name
          location {
            name
            address
          }
        }
        taste_rating
        portion_rating
        presentation_rating
        notes
        created_at
      }
    }
  }
`;

const Profile = () => {
  const { data, loading, error } = useQuery<{ me: User }>(GET_USER_PROFILE);

  const calculateAverageRating = (rating: Rating) => {
    return Number(
      (
        (rating.taste_rating +
          rating.portion_rating +
          rating.presentation_rating) /
        3
      ).toFixed(1)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !data?.me) {
    return (
      <div className="alert alert-error">
        <span>Error loading profile. Please try again later.</span>
      </div>
    );
  }

  const user = data.me;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* User Information */}
      <div className="card-primary">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="divider"></div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Username</h2>
              <p>{user.username}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email</h2>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User's Ratings */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">My Ratings</h2>
        {user.ratings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't rated any dishes yet.</p>
            <Link to="/dishes" className="btn btn-primary mt-4">
              Browse Dishes
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {user.ratings.map((rating: Rating) => (
              <div key={rating.id} className="card-primary">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">
                        <Link
                          to={`/dishes/${rating.dish?.id}`}
                          className="hover:underline"
                        >
                          {rating.dish?.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">
                        {rating.dish?.location.name}
                      </p>
                      <p className="text-sm">{rating.dish?.location.address}</p>
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
                              star <= Math.round(calculateAverageRating(rating))
                            }
                            readOnly
                          />
                        ))}
                      </div>
                      <span className="text-sm">
                        ({calculateAverageRating(rating)})
                      </span>
                    </div>
                  </div>
                  {rating.notes && (
                    <div className="mt-2">
                      <p className="text-sm">{rating.notes}</p>
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-2">
                    Rated on {new Date(rating.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
