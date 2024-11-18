import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { addReviewToProduct, fetchReviewsByProductId } from "../../../services/reviewsApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviewsByProductId(productId);
        setReviews(data);
      } catch (error) {
        toast.error("Không thể tải đánh giá. Vui lòng thử lại!");
      }
    };

    loadReviews();
  }, [productId]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }

    const review = {
      rating: newReview.rating,
      comment: newReview.comment,
      user_id: userInfo.id
    };

    try {
      await addReviewToProduct(productId, review); 
      const data = await fetchReviewsByProductId(productId)
      setReviews(data); 
      setNewReview({ rating: 5, comment: "" });
      toast.success("Đánh giá đã được thêm thành công!");
    } catch (error) {
      toast.error("Không thể thêm đánh giá. Vui lòng thử lại!");
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Đánh giá của khách hàng</h2>
      <form onSubmit={handleAddReview} className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Đánh giá</label>
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
          <label className="block text-gray-700 mb-2">Đánh giá của bạn</label>
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
          Gửi Đánh Giá
        </button>
      </form>
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Chưa có đánh giá nào, hãy là người đầu tiên đánh giá!</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div
              key={review.id || index}
              className="relative bg-white p-6 rounded-lg shadow-sm group hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.user.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36"} 
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{review.user.username || "Người dùng"}</h4> 
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>

              {review.user === userInfo.id && (
                <button
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-800 transition-opacity"
                  title="Chỉnh sửa đánh giá"
                  onClick={() => {
                    console.log(`Edit review ${review.id}`);
                  }}
                >
                  ✏️
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReview;
