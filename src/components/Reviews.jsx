import React from "react";

const Reviews = ({ reviews }) => {
  const reviewsData = [
    {
      id: "1",
      customer: {
        avatar_url: "https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/hinh-nen-anime-13.jpg",
        display_name: "User 1",
      },
      rating: 5,
      heading: "Great product!",
      body: "I really loved this product.",
      media: [
        { id: "media1", url: "https://cdn.xtmobile.vn/vnt_upload/news/06_2024/hinh-nen-anime-cho-may-tinh-1-xtmobile.jpg" },
      ],
    },
  ];
  return (
    <>
      {reviewsData?.map((review) => (
        <div className="flex flex-col gap-4" key={review.id}>        
          <div className="flex items-center gap-4 font-medium">
            <img
              src={review?.customer?.avatar_url}
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{review?.customer?.display_name}</span>
          </div>
         
          <div className="flex gap-2">
            {Array.from({ length: review?.rating }).map((_, index) => (
              <img src="/star.png" alt="" key={index} width={16} height={16} />
            ))}
          </div>
          {review?.heading && <p>{review?.heading}</p>}
          {review?.body && <p>{review?.body}</p>}
          <div>
            {review?.media?.map((media) => (
              <img
                src={media.url}
                key={media.id}
                alt=""
                width={100}
                height={50}
                className="object-cover"
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Reviews;
