import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { addToLikedList, removeFromLikedList, updateUserInfo } from "../../features/user/userSlice/UserSlice";
import { BiLoader } from "react-icons/bi";

const ProductLikeButton = ({ productId }) => {
  const { isLoggedIn, likedList, userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    setLiked(likedList.some((product) => product.id === productId));
  }, [likedList, productId]);

  // Cập nhật likedList trong localStorage khi nó thay đổi
  useEffect(() => {
    if (likedList.length > 0) {
      localStorage.setItem("likedList", JSON.stringify(likedList));
    }
  }, [likedList]); // Chạy khi likedList thay đổi

  const toggleLike = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setIsLiking(true);

    const loadingTimeout = setTimeout(async () => {
      try {
        const response = await apiClient.post("user/like-product/", {
          product_id: productId,
          userId: userInfo.id,
        });

        if (response.status === 200) {
          // Cập nhật Redux sau khi thành công
          if (liked) {
            dispatch(removeFromLikedList(productId));
          } else {
            dispatch(addToLikedList({ id: productId }));
          }

          // Cập nhật lại userInfo trong Redux
          dispatch(updateUserInfo({ liked_products: likedList }));

          setLiked(!liked);
        }
      } catch (error) {
        console.error("Error liking product:", error);
      } finally {
        setIsLiking(false);
      }
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  };

  return (
    <button
      className={`flex items-center max-w-15 gap-1 text-red-500 hover:text-red-600 transition-all duration-300 ease-in-out ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={toggleLike}
      disabled={isLiking}
    >
      {isLiking ? (
        <BiLoader className="animate-spin w-5 h-5 mr-2 text-red-500" />
      ) : liked ? (
        <FaHeart className="text-red-500 transform scale-90 transition-all duration-300 ease-in-out" />
      ) : (
        <FaRegHeart className="text-gray-500 transform scale-90 transition-all duration-300 ease-in-out" />
      )}
      <span className="text-sm">{isLiking ? "..." : liked ? "Đã thích" : "Thích"}</span>
    </button>
  );
};

export default ProductLikeButton;
