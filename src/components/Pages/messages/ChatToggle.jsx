import { RiMessengerFill, RiMessengerLine } from 'react-icons/ri';

const ChatToggle = ({ showChatComponents, handleMessagesClick }) => {
    return (
        <button
            aria-label='Messages'
            onClick={handleMessagesClick}
            className="mr-1 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        >
            {showChatComponents ? (
                <RiMessengerFill className="text-[#75abff]" size={24} />
            ) : (
                <RiMessengerLine size={24} />
            )}
        </button>
    );
};

export default ChatToggle;
