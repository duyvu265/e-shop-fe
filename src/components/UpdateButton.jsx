import { useState } from "react";
const UpdateButton = () => {
  const [pending, setPending] = useState(false);
  return (
    <button
      disabled={pending}
      className="bg-lama text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
