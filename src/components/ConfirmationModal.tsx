import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = React.memo(
  ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-5"
        role="dialog"
      >
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-lg font-semibold text-[#F2F2F2]">Delete Task</h2>
          <p className="mt-2 text-sm text-[#808080]">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-[#808080] rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#FF3B30] text-[#F2F2F2] rounded hover:bg-red-500  transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export { Modal };
