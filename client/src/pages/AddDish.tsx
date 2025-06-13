import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const CREATE_DISH = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createDish(input: $input) {
      id
      name
    }
  }
`;

const AddDish = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [portionSize, setPortionSize] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");

  const [createDish, { loading, error }] = useMutation(CREATE_DISH, {
    onCompleted: (data) => {
      navigate(`/dishes/${data.createDish.id}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDish({
        variables: {
          input: {
            name,
            description,
            price: Number(price),
            portion_size: portionSize,
            location: {
              name: locationName,
              address: locationAddress,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error creating dish:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Add a New Dish</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-primary">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Dish Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price ($)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="input input-bordered"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Portion Size</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={portionSize}
                  onChange={(e) => setPortionSize(e.target.value)}
                  placeholder="e.g., Regular, Large"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-primary">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Location Information</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Restaurant/Eatery Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>Error creating dish. Please try again.</span>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Add Dish"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDish;
