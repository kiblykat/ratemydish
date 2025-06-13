import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import type { Dish, Rating } from "../types";

const GET_FEATURED_DISHES = gql`
  query GetFeaturedDishes {
    dishes(filter: { min_rating: 4 }) {
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
      }
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery<{ dishes: Dish[] }>(
    GET_FEATURED_DISHES
  );

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

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">RateMyDish</h1>
            <p className="py-6 text-lg">
              Discover and share your favorite dishes from Singapore's vibrant
              food scene. Rate individual dishes, not just restaurants, and help
              others find the best culinary experiences.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/dishes" className="btn btn-primary">
                Browse Dishes
              </Link>
              <Link to="/dishes/add" className="btn btn-secondary">
                Add a Dish
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Dishes</h2>
          <Link to="/dishes" className="link link-primary">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <span>Error loading featured dishes. Please try again later.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.dishes.map((dish) => (
              <Link
                key={dish.id}
                to={`/dishes/${dish.id}`}
                className="card-primary hover:shadow-lg transition-shadow"
              >
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title">{dish.name}</h3>
                      <p className="text-gray-500">{dish.location.name}</p>
                      <p className="text-sm">{dish.location.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rating rating-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name={`rating-${dish.id}`}
                            className="mask mask-star-2 bg-orange-400"
                            checked={
                              star <=
                              Math.round(calculateAverageRating(dish.ratings))
                            }
                            readOnly
                          />
                        ))}
                      </div>
                      <span className="text-sm">
                        ({calculateAverageRating(dish.ratings)})
                      </span>
                    </div>
                  </div>
                  <p className="line-clamp-2">{dish.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold">
                      ${dish.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {dish.portion_size}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {data?.dishes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured dishes available.</p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-base-200 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Share Your Food Journey</h2>
          <p className="text-lg mb-8">
            Join our community of food enthusiasts and help others discover the
            best dishes Singapore has to offer. Your ratings and reviews make a
            difference!
          </p>
          <Link to="/dishes/add" className="btn btn-primary btn-lg">
            Start Rating Dishes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
