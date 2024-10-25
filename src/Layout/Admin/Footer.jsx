import React, { memo } from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-100 mt-auto">
      <div className="container-fluid px-4">
        <div className="text-center">
          <div className="text-gray-500">This is Footer</div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
