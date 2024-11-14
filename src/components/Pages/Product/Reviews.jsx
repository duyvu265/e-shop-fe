import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductReview = () => {
  // Mockup dữ liệu giả cho reviews
  const initialReviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 4,
      date: "2024-11-01",
      comment: "Great product, really enjoyed using it!",
      avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 5,
      date: "2024-11-03",
      comment: "Excellent quality, highly recommend!",
      avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    {
      id: 3,
      user: "Michael Brown",
      rating: 3,
      date: "2024-11-05",
      comment: "It’s good, but I expected a bit more for the price.",
      avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }
    const review = {
      id: reviews.length + 1,
      user: "Guest User",
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      comment: newReview.comment,
      avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36",
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    toast.success("Review added successfully!");
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
      <form onSubmit={handleAddReview} className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({ ...newReview, rating: star })}
                className="focus:outline-none"
              >
                <FaStar
                  className={star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Review</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Submit Review
        </button>
      </form>
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://${review.avatar}`}
                alt={review.user}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1599566150163-29194dcaad36";
                }}
              />
              <div>
                <h4 className="font-semibold text-gray-900">{review.user}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
