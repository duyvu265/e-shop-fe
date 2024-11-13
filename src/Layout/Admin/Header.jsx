import { memo } from "react";

const Header = ({ activeTab }) => {
  return (
    <div className="flex justify-between items-center p-6 bg-white border-b">
      <div className="text-xl font-semibold text-gray-800">{activeTab}</div>
    </div>
  );
};

export default memo(Header);
