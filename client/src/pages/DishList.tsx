import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import type { Dish, Rating } from "../types";

const GET_DISHES = gql`
  query GetDishes($filter: DishFilterInput) {
    dishes(filter: $filter) {
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

const DishList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data, loading, error } = useQuery<{ dishes: Dish[] }>(GET_DISHES, {
    variables: {
      filter: {
        search: searchQuery || undefined,
        min_price: minPrice ? Number(minPrice) : undefined,
        max_price: maxPrice ? Number(maxPrice) : undefined,
      },
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

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error loading dishes. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Browse Dishes</h1>
        <Link to="/dishes/add" className="btn btn-primary">
          Add New Dish
        </Link>
      </div>

      {/* Filters */}
      <div className="card-primary">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Search by dish name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Min Price ($)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                placeholder="0.00"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Max Price ($)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                placeholder="100.00"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dishes Grid */}
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
                  <h2 className="card-title">{dish.name}</h2>
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
                <span className="font-semibold">${dish.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">
                  {dish.portion_size}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {data?.dishes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No dishes found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default DishList;
