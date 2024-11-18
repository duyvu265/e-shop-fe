import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  addReviewToProduct,
  fetchReviewsByProductId,
  updateReview,
  deleteReview,
} from "../../../services/reviewsApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [editingReview, setEditingReview] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
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
      user_id: userInfo.id,
    };

    try {
      if (editingReview) {
        await updateReview(editingReview.id, review);
        toast.success("Đánh giá đã được cập nhật!");
      } else {
        await addReviewToProduct(productId, review);
        toast.success("Đánh giá đã được thêm thành công!");
      }
      const data = await fetchReviewsByProductId(productId);
      setReviews(data);
      setNewReview({ rating: 5, comment: "" });
      setEditingReview(null);
    } catch (error) {
      toast.error("Không thể thêm hoặc cập nhật đánh giá. Vui lòng thử lại!");
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({ rating: review.rating, comment: review.comment });
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setNewReview({ rating: 5, comment: "" });
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      await deleteReview(reviewToDelete.id);
      const updatedReviews = reviews.filter(
        (review) => review.id !== reviewToDelete.id
      );
      setReviews(updatedReviews);
      setIsDeleteDialogOpen(false);
      toast.success("Đánh giá đã được xóa!");
    } catch (error) {
      toast.error("Không thể xóa đánh giá. Vui lòng thử lại!");
    }
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Đánh giá của khách hàng
      </h2>
      <form
        onSubmit={handleAddReview}
        className="mb-8 bg-gray-50 p-6 rounded-lg"
      >
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
                  className={
                    star <= newReview.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Đánh giá của bạn</label>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            rows="4"
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {editingReview ? "Cập nhật đánh giá" : "Gửi đánh giá"}
          </button>
          {editingReview && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Hủy
            </button>
          )}
        </div>
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
                  src={review?.user?.avatar || "https://via.placeholder.com/48"}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {review.user.username || "Người dùng"}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>

              {review.user.id === userInfo.id && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2">
                  <button
                    className="text-gray-500 hover:text-gray-800 transition-opacity"
                    title="Chỉnh sửa đánh giá"
                    onClick={() => handleEditReview(review)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-800 transition-opacity"
                    title="Xóa đánh giá"
                    onClick={() => {
                      setReviewToDelete(review);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isDeleteDialogOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto"
              variants={dialogVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold text-gray-800">Xác nhận xóa</h2>
              <p className="text-gray-600 mt-2">
                Bạn có chắc chắn muốn xóa đánh giá này không?
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                  onClick={handleDeleteReview}
                >
                  Xóa
                </button>
                <button
                  className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Hủy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductReview;
