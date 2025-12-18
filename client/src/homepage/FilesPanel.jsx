import React, { useState } from "react";

export default function FilesPanel({ files }) {
  const [selectedFile, setSelectedFile] = useState(files[0]);

  return (
    <aside className="col-span-12 lg:col-span-3 bg-white dark:bg-gray-900 border rounded flex flex-col overflow-hidden">
      {/* Navbar with file names */}
      <div className="flex border-b dark:border-gray-800 overflow-x-auto">
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => setSelectedFile(file)}
            className={`
              px-4 py-2 text-sm whitespace-nowrap
              ${
                selectedFile.id === file.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Display file content */}
      <div className="p-4 flex-1 overflow-auto text-sm text-gray-800 dark:text-gray-200">
        <h4 className="font-semibold mb-2">{selectedFile.name}</h4>
        <p className="opacity-70">
          This is dummy content for: <strong>{selectedFile.name}</strong>.
          <br />
          Later you can replace this with real file previews.
        </p>
      </div>
    </aside>
  );
}
