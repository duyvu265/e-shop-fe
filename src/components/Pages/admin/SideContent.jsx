import ContentSideBar from './ContentSideBar';
import Activity from './Activity';

function SideContent() {
  return (
    <div className="flex flex-col gap-8" style={{ width: '350px' }}>
      <ContentSideBar />
      <Activity />
    </div>
  );
}

export default SideContent;
