import { ReactNode } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "8px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0b1018",
    width: "800px",
    height: "500px",
    border: "none",
  },
};

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
function CustomModal({ isOpen, onClose, children }: CustomModalProps) {
  function handleOnClose() {
    onClose();
  }

  return (
    <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      <div className="modalHeader">
        <button className="closeBtn" onClick={() => handleOnClose()}>
          x
        </button>
      </div>
      <div className="modalContent">{children}</div>
    </Modal>
  );
}

export default CustomModal;
