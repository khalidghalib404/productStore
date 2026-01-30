import React from 'react';
import { useProductStore } from '../stores/useProductStore';

function AddProductModal() {
  const { formData, setFormData, addProduct, loading } = useProductStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.name || !formData.price || !formData.image) {
      return;
    }
    
    // Call addProduct and check if it was successful
    const success = await addProduct(e);
    
    // Close modal only after successful submission
    if (success) {
      document.getElementById('add_product_modal').close();
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById('add_product_modal').showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Product
      </button>

      {/* DaisyUI Modal */}
      <dialog id="add_product_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          
          <h3 className="font-bold text-lg mb-4">Add New Product</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Product Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="input input-bordered w-full"
                step="0.01"
                min="0"
                required
              />
            </div>

            {/* Product Image URL */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Preview Image */}
            {formData.image && (
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Image Preview</span>
                </label>
                <div className="avatar">
                  <div className="w-24 rounded">
                    <img
                      src={formData.image}
                      alt="Preview"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="modal-action">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById('add_product_modal').close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        
        {/* Modal backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AddProductModal;
