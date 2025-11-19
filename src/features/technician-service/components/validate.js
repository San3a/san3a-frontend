export const validateFields = ({ title, desc, price, category, images }) => {
  const newErrors = {};

  if (!title.trim()) newErrors.title = "Service name is required!";
  else if (title.length < 3)
    newErrors.title = "Service name must be at least 3 characters";
  else if (title.length > 30)
    newErrors.title = "Service name must not exceed 30 characters";

  if (!desc.trim()) newErrors.description = "Service description is required!";
  else if (desc.length < 5)
    newErrors.description = "Description must be at least 5 characters";
  else if (desc.length > 300)
    newErrors.description = "Description must not exceed 300 characters";

  if (price === "" || price === null)
    newErrors.price = "Service price is required!";
  else if (isNaN(price)) newErrors.price = "Service price must be a number";
  else if (Number(price) < 0)
    newErrors.price = "Service price must be positive";

  if (!category) newErrors.category = "Service category is required";

  if (!images.length) newErrors.images = "At least one image is required";

  return newErrors;
};
