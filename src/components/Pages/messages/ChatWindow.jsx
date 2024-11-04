import { useState, useRef, useEffect, useCallback } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import { AiOutlineClose, AiOutlinePicture } from "react-icons/ai";
import { MdInsertEmoticon } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { FiPhone, FiVideo } from "react-icons/fi";
import { BsThreeDots } from 'react-icons/bs';
import sampleMessages from './fakeData';
import { dateformater } from '../../../dateformater';

const ChatWindow = ({ friend, onClose }) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState(sampleMessages);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const messagesEndRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
                setIsInputFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSendMessage = useCallback(() => {
        if (message.trim()) {
            const newMessage = {
                text: message,
                sender: 'me',
                timestamp: new Date().toISOString(),
                type: 'text'
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    }, [message]);

    const handleEmojiClick = useCallback((emojiData) => {
        setMessage((prevMessage) => prevMessage + emojiData.emoji);
        setShowEmojiPicker(false);
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newMessage = {
                text: URL.createObjectURL(file),
                sender: 'me',
                timestamp: new Date().toISOString(),
                type: 'image'
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    };

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div
            ref={chatWindowRef}
            className="fixed bottom-0 right-12 w-80 h-128 bg-white shadow-lg rounded-lg z-10 flex flex-col border border-gray-300"
            onClick={() => setIsInputFocused(true)} 
        >
            <div className="flex items-center p-2 bg-white">
                <img src={friend?.avatar} alt="Avatar" className="w-9 h-9 mr-2 rounded-full" />
                <div className="flex-1">
                    <div className="font-bold">{friend?.name}</div>
                    <div className="text-gray-500 text-sm">Hoạt động 1 giờ trước</div>
                </div>
                <button className={`text-sm ${isInputFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                    <FiPhone />
                </button>
                <button className={`text-sm ${isInputFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                    <FiVideo />
                </button>
                <button onClick={onClose} className={`ml-auto text-sm ${isInputFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                    <AiOutlineClose />
                </button>
            </div>

            <div className="border-b"></div>
            <div className="flex-1 p-2 space-y-2 bg-white overflow-y-auto max-h-[calc(100%-100px)]">
                {messages?.map((msg, index) => (
                    <div key={index} title={dateformater(msg.timestamp)} className={`flex ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                        {msg.sender !== 'me' && (
                            <div className="flex items-center mr-2">
                                <img src={friend?.avatar} alt="Avatar" className="w-3 h-3 rounded-full" />
                            </div>
                        )}
                        <div className={`rounded-full p-2 ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} max-w-[75%]`}>
                            {msg.type === 'text' ? (
                                <div>{msg.text}</div>
                            ) : (
                                <img
                                    src={msg.text}
                                    alt="Sent"
                                    className="max-w-[200px] h-auto rounded-full block"
                                />
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {showEmojiPicker && (
                <div className="absolute bottom-16 left-0 right-0">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}

            <div className="flex items-center p-2 bg-white border-t border-gray-300 h-16">
                {(!message.trim()) ? (
                    <>
                        <button onClick={() => setShowEmojiPicker(prev => !prev)} className={`text-sm ${isInputFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                            <MdInsertEmoticon />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            id="image-upload"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <button onClick={() => document.getElementById('image-upload').click()} className={`text-sm ${isInputFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                            <AiOutlinePicture />
                        </button>
                    </>
                ) : (
                    <button onClick={handleMoreClick} className={`text-sm ${isInputFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                        <BsThreeDots />
                    </button>
                )}

                <div className={`absolute ${anchorEl ? 'block' : 'hidden'}`}>
                    <div onClick={() => setShowEmojiPicker(prev => !prev)} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
                        <MdInsertEmoticon /> Chọn emoji
                    </div>
                    <div onClick={() => document.getElementById('image-upload').click()} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
                        <AiOutlinePicture /> Chọn ảnh
                    </div>
                </div>

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className={`flex-1 bg-${isInputFocused ? 'gray-200' : 'gray-300'} rounded-full ml-2 p-2`}
                />

                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="ml-2 text-sm"
                >
                    <RiSendPlaneFill color="#0084ff" />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
