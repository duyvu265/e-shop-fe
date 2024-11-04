import React, { useEffect, useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';

const ChatComponents = ({ onFriendClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [text, setText] = useState('');
    const [arr, setArr] = useState([]);
    const friendsList = [
        { id: 1, name: 'Nguyễn Văn A', avatar: 'https://via.placeholder.com/40' },
        { id: 2, name: 'Trần Thị B', avatar: 'https://via.placeholder.com/40' },
        { id: 3, name: 'Lê Văn C', avatar: 'https://via.placeholder.com/40' },
        { id: 4, name: 'Phạm Thị D', avatar: 'https://via.placeholder.com/40' },
        { id: 5, name: 'Hoàng Văn E', avatar: 'https://via.placeholder.com/40' },
        { id: 6, name: 'Ngô Thị F', avatar: 'https://via.placeholder.com/40' },
    ];

    const filteredFriends = friendsList?.filter(friend =>
        friend?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const searchUser = async (username) => {
        try {
            if (username.length < 3) return;
            // Giả lập gọi API
            // let res = await fetch(`${apiClient}/search/${username}`);
            // let data = await res.json();
            // setArr(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        searchUser(text);
    }, [text]);

    return (
        <div className="absolute top-12 right-8 w-80 h-[700px] bg-white shadow-lg rounded-lg z-10 p-4 overflow-auto">
            <h2 className="text-lg font-bold text-center mb-4">Đoạn Chat</h2>
            <div className="relative mb-4">
                <input
                    type="text"
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setText(e.target.value);
                    }}
                    value={text}
                    placeholder="Search Facebook"
                    className="w-full rounded-full bg-gray-200 p-2 pl-10 focus:outline-none"
                />
                <div className="absolute left-2 top-2">
                    <button disabled>
                        <IoSearchCircleOutline className="text-gray-500" />
                    </button>
                </div>
            </div>

            <ul className="list-none p-0">
                {filteredFriends?.map((friend) => (
                    <li key={friend?.id} className="mb-2 p-0">
                        <div
                            onClick={() => onFriendClick(friend)}
                            className="cursor-pointer border border-transparent rounded-md hover:bg-gray-300 p-2 flex items-center w-full"
                        >
                            <img src={friend?.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                            <div className="ml-2 flex flex-col justify-center">
                                <span className="font-bold text-sm">{friend?.name}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatComponents;
