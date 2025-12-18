export default function SidebarChatItem({ chat, onSelect, onClose }) {
  return (
    <button
      onClick={() => {
        onSelect(chat);
        onClose();
      }}
      className="
        w-full text-left px-3 py-2 text-sm rounded-md 
        hover:bg-gray-200 dark:hover:bg-gray-800 
        text-gray-700 dark:text-gray-300
      "
    >
      <div className="font-medium">{chat.title || "Untitled Chat"}</div>
      <div className="text-xs opacity-60">Chat #{chat.chatNumber}</div>
    </button>
  );
}
