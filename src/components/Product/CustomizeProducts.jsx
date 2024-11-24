import { useEffect, useState } from "react";
import Add from "./Add";
import ProductImages from './ProductImages';
import ProductLikeButton from "./useLikeProduct";

const CustomizeProducts = ({ productId, product_items  }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState();

  useEffect(() => {
    const variant = product_items?.find((v) => {
      const variantChoices = {
        Color: v.color,
        Size: v.size,
      };
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, product_items]);

  const handleOptionSelect = (optionType, choice) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices) => {
    return product_items?.some((variant) => {
      const variantChoices = {
        Color: variant.color,
        Size: variant.size,
      };
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.qty_in_stock > 0
      );
    });
  };

  const productOptions = [
    {
      name: "Color",
      choices: [...new Set(product_items?.map(v => ({ description: v.color, value: v.product_images?.image1?.url })))],
    },
    {
      name: "Size",
      choices: [...new Set(product_items?.map(v => v.size))].map(size => ({ description: size })),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <ProductImages items={product_items} />

      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name]: choice.description,
              });

              const selected =
                selectedOptions[option.name] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name, choice.description);

              return option.name === "Color" ? (
                <li
                  className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                  key={choice.description}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </li>
              ) : (
                <li
                  className="ring-1 ring-pink-500 text-pink-500 rounded-md py-1 px-4 text-sm"
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#f35c7a"
                      : disabled
                        ? "#FBCFE8"
                        : "white",
                    color: selected || disabled ? "white" : "#f35c7a",
                    boxShadow: disabled ? "none" : "",
                  }}
                  key={choice.description}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>

        </div>
      ))}
      <div className="max-w-15">
        <ProductLikeButton productId={productId}  />
      </div>
      <Add
        productId={productId || ""}
        variantId={selectedVariant?._id}
        stockNumber={selectedVariant?.qty_in_stock || 0}
      />
    </div>
  );
};

export default CustomizeProducts;
