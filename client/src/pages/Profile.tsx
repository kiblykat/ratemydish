import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      id
      username
      email
      reviews {
        id
        rating
        comment
        createdAt
        dish {
          id
          name
          imageUrl
        }
      }
    }
  }
`;

const Profile = () => {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-error">Error loading profile</div>;
  if (!data?.me) return <div className="text-center">Profile not found</div>;

  const { username, email, reviews } = data.me;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Username</h2>
              <p>{username}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email</h2>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">My Reviews</h2>
        {reviews.length === 0 ? (
          <p>You haven't written any reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.dish.imageUrl}
                      alt={review.dish.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/dishes/${review.dish.id}`}
                        className="text-xl font-semibold hover:link"
                      >
                        {review.dish.name}
                      </Link>
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
                      <p className="mt-2">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
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
