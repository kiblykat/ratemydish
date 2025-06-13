import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import type { Dish } from "../types";

const GET_FEATURED_DISHES = gql`
  query GetFeaturedDishes {
    dishes(limit: 3) {
      id
      name
      description
      imageUrl
      rating
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_FEATURED_DISHES);

  return (
    <div className="space-y-12">
      <section className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">RateMyDish</h1>
            <p className="py-6">
              Discover and share your favorite dishes. Rate, review, and connect
              with food lovers around the world.
            </p>
            <Link to="/dishes" className="btn btn-primary">
              Browse Dishes
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Dishes</h2>
        {loading && <div className="text-center">Loading...</div>}
        {error && (
          <div className="text-center text-error">Error loading dishes</div>
        )}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.dishes.map((dish: Dish) => (
              <div key={dish.id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{dish.name}</h2>
                  <p>{dish.description}</p>
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="rating rating-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name={`rating-${dish.id}`}
                          className="mask mask-star-2 bg-orange-400"
                          checked={star === Math.round(dish.rating)}
                          readOnly
                        />
                      ))}
                    </div>
                    <Link
                      to={`/dishes/${dish.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
