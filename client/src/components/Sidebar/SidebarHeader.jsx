export default function SidebarHeader({ onClose }) {
  return (
    <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
      <div className="h-10 w-10 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold">
        S
      </div>

      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Socratia
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Let's Learn Together
        </p>
      </div>

      <button
        className="ml-auto md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}
