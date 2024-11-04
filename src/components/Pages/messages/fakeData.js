const getRandomTime = (minutesOffset) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - minutesOffset);
    return now.toISOString(); 
};

const sampleMessages = [
  {
      text: 'Chào bạn, mình có thể giúp gì cho bạn hôm nay?',
      sender: 'other',
      timestamp: getRandomTime(15), 
      type: 'text'
  },
  {
      text: 'Tôi cần hỗ trợ về sản phẩm mới.',
      sender: 'me',
      timestamp: getRandomTime(10), 
      type: 'text'
  },
  {
      text: 'Đây là thông tin bạn cần:',
      sender: 'other',
      timestamp: getRandomTime(5), 
      type: 'text'
  },
  {
      text: 'https://via.placeholder.com/150', 
      sender: 'other',
      timestamp: getRandomTime(2), 
      type: 'image'
  },
  {
      text: 'Cảm ơn bạn rất nhiều!',
      sender: 'me',
      timestamp: getRandomTime(0), 
      type: 'text'
  }
];

export default sampleMessages;
