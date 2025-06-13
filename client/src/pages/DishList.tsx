import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import type { Dish } from "../types";

const GET_DISHES = gql`
  query GetDishes($search: String) {
    dishes(search: $search) {
      id
      name
      description
      imageUrl
      rating
    }
  }
`;

const DishList = () => {
  const [search, setSearch] = useState("");
  const { loading, error, data } = useQuery(GET_DISHES, {
    variables: { search },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Dishes</h1>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search dishes..."
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

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
    </div>
  );
};

export default DishList;
