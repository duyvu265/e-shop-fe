import React from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";

const InputArea = ({
  newMessage,
  onMessageChange,
  onKeyPress,
  onFileSelect,
  onSend,
  fileInputRef,
  setAttachment,
}) => {

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `attachments/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Error uploading file", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setAttachment({ name: file.name, url: downloadURL, type: file.type });
              console.log("File available at", downloadURL);
            });
          }
        );
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  return (
    <div className="border-t">
      <div className="flex items-center space-x-4 pt-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-gray-500 hover:text-gray-700" 
          aria-label="Attach file"
        >
          <FiPaperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={onMessageChange}
          onKeyPress={onKeyPress}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          aria-label="Message input"
        />
        <button
          onClick={onSend}
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Send message"
        >
          <FiSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
