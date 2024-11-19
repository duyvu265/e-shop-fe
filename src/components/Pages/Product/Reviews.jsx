import { useState, useEffect } from "react";
import { FaImage, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  addReviewToProduct,
  fetchReviewsByProductId,
  updateReview,
  deleteReview,
} from "../../../services/reviewsApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../firebase";  // Import firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { motion, AnimatePresence } from "framer-motion";

const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Tải các đánh giá sản phẩm khi component mount hoặc productId thay đổi
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

  // Thêm hoặc cập nhật đánh giá
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
      image: imageUrl,
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
      setImageFile(null);
      setImageUrl("");
      setEditingReview(null);
    } catch (error) {
      toast.error("Không thể thêm hoặc cập nhật đánh giá. Vui lòng thử lại!");
    }
  };

  // Chỉnh sửa đánh giá
  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({ rating: review.rating, comment: review.comment });
    setImageUrl(review.image || "");
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingReview(null);
    setNewReview({ rating: 5, comment: "" });
    setImageFile(null);
    setImageUrl("");
  };

  // Xóa đánh giá
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

  // Xử lý khi người dùng chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      uploadImage(file);
    }
  };

  // Tải ảnh lên Firebase
  const uploadImage = (file) => {
    const storageRef = ref(storage, `reviews/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Có thể hiển thị tiến trình tải lên ở đây
      },
      (error) => {
        toast.error("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  // Các biến động của hộp thoại xóa
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
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2"></label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="file-input"
              className="hidden"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer inline-flex items-center justify-center bg-black text-white p-3 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <FaImage className="text-white" size={20} />
            </label>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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
          reviews.map((review) => (
            <div
              key={review.id}
              className="relative bg-white p-6 rounded-lg shadow-sm group hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={review.user.avatar || "/default-avatar.jpg"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{review.user_name}</div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={star <= review.rating ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                      setReviewToDelete(review);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </div>
              </div>
              <div className="mt-4">{review.comment}</div>
              {review.image_url && (
                <div className="mt-4">
                  <img
                    src={review.image_url}
                    alt="Review Image"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              )}


            </div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isDeleteDialogOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dialogVariants}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <h3 className="text-lg font-semibold">Bạn có chắc chắn muốn xóa đánh giá này?</h3>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleDeleteReview}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Xóa
                </button>
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
