import { useState } from "react";
import { FiCheck, FiImage,  } from "react-icons/fi";

const ProductCreationStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    brand: "",
    category_id: "",
    category_name: "",
    image_url: null,
    is_active: true,
    productItems: [{
      sku: "",
      price: "",
      color: "",
      size: "",
      item_image: null
    }]
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home & Garden" },
  ];

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = "Product name is required";
        if (!formData.title) newErrors.title = "Product title is required";
        if (!formData.brand) newErrors.brand = "Brand is required";
        break;
      case 2:
        if (!formData.description) newErrors.description = "Product description is required";
        if (!formData.category_id) newErrors.category_id = "Category is required";
        break;
      case 3:
        if (!formData.image_url) newErrors.image_url = "Product image is required";
        break;
      case 4:
        formData.productItems.forEach((item, index) => {
          if (!item.sku) newErrors[`sku_${index}`] = "SKU is required";
          if (!item.price || parseFloat(item.price) <= 0) newErrors[`price_${index}`] = "Valid price is required";
          if (!item.color) newErrors[`color_${index}`] = "Color is required";
          if (!item.size) newErrors[`size_${index}`] = "Size is required";
          if (!item.item_image) newErrors[`item_image_${index}`] = "Item image is required";
        });
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedItems = [...formData.productItems];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      setFormData(prev => ({ ...prev, productItems: updatedItems }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleImageUpload = (e, index = null) => {
    const file = e.target.files[0];
    if (file) {
      if (index !== null) {
        const updatedItems = [...formData.productItems];
        updatedItems[index] = { ...updatedItems[index], item_image: file };
        setFormData(prev => ({ ...prev, productItems: updatedItems }));
      } else {
        setFormData(prev => ({ ...prev, image_url: file }));
      }
    }
  };

  const addProductItem = () => {
    setFormData(prev => ({
      ...prev,
      productItems: [...prev.productItems, {
        sku: "",
        price: "",
        color: "",
        size: "",
        item_image: null
      }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      const currentDate = new Date().toISOString();
      const finalData = {
        ...formData,
        created_at: currentDate,
        updated_at: currentDate
      };
      console.log("Form submitted:", finalData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Product Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.name && touched.name ? "border-red-500" : ""}`}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </label>

            <label className="block">
              <span className="text-gray-700">Product Title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.title && touched.title ? "border-red-500" : ""}`}
              />
              {errors.title && touched.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </label>

            <label className="block">
              <span className="text-gray-700">Brand</span>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.brand && touched.brand ? "border-red-500" : ""}`}
              />
              {errors.brand && touched.brand && (
                <p className="text-red-500 text-sm">{errors.brand}</p>
              )}
            </label>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Product Description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.description && touched.description ? "border-red-500" : ""}`}
              />
              {errors.description && touched.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </label>

            <label className="block">
              <span className="text-gray-700">Category</span>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.category_id && touched.category_id ? "border-red-500" : ""}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.category_id && touched.category_id && (
                <p className="text-red-500 text-sm">{errors.category_id}</p>
              )}
            </label>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Product Main Image</span>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name="image_url"
                        className="sr-only"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              </div>
              {errors.image_url && touched.image_url && (
                <p className="text-red-500 text-sm">{errors.image_url}</p>
              )}
            </label>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {formData.productItems.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <h3 className="font-medium">Product Item #{index + 1}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-gray-700">SKU</span>
                    <input
                      type="text"
                      name="sku"
                      value={item.sku}
                      onChange={(e) => handleInputChange(e, index)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`sku_${index}`] ? "border-red-500" : ""}`}
                    />
                    {errors[`sku_${index}`] && (
                      <p className="text-red-500 text-sm">{errors[`sku_${index}`]}</p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-gray-700">Price</span>
                    <input
                      type="number"
                      name="price"
                      value={item.price}
                      onChange={(e) => handleInputChange(e, index)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`price_${index}`] ? "border-red-500" : ""}`}
                    />
                    {errors[`price_${index}`] && (
                      <p className="text-red-500 text-sm">{errors[`price_${index}`]}</p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-gray-700">Color</span>
                    <input
                      type="text"
                      name="color"
                      value={item.color}
                      onChange={(e) => handleInputChange(e, index)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`color_${index}`] ? "border-red-500" : ""}`}
                    />
                    {errors[`color_${index}`] && (
                      <p className="text-red-500 text-sm">{errors[`color_${index}`]}</p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-gray-700">Size</span>
                    <input
                      type="text"
                      name="size"
                      value={item.size}
                      onChange={(e) => handleInputChange(e, index)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`size_${index}`] ? "border-red-500" : ""}`}
                    />
                    {errors[`size_${index}`] && (
                      <p className="text-red-500 text-sm">{errors[`size_${index}`]}</p>
                    )}
                  </label>
                </div>

                <label className="block">
                  <span className="text-gray-700">Item Image</span>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            name="item_image"
                            className="sr-only"
                            onChange={(e) => handleImageUpload(e, index)}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors[`item_image_${index}`] && (
                    <p className="text-red-500 text-sm">{errors[`item_image_${index}`]}</p>
                  )}
                </label>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addProductItem}
              className="w-full px-4 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Another Product Item
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex items-center ${step !== 4 ? "flex-1" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? "bg-blue-600" : "bg-gray-300"} transition-colors duration-200`}
              >
                {currentStep > step ? (
                  <FiCheck className="text-white" />
                ) : (
                  <span className="text-white text-sm">{step}</span>
                )}
              </div>
              {step !== 4 && (
                <div
                  className={`h-1 flex-1 ${currentStep > step ? "bg-blue-600" : "bg-gray-300"} transition-colors duration-200`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          {renderStep()}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {currentStep === 4 ? (
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductCreationStepper;
