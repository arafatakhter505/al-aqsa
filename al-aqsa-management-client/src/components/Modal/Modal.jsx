import { useContext } from "react";
import { ModalContext } from "../../contextApi/ModalContextApi";
import { RxCross2 } from "react-icons/rx";

const Modal = () => {
  const { setShowModal, title, btn, modalContent, btnAction } =
    useContext(ModalContext);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none">
        <div className="w-auto my-6 mr-5 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="p-5 border-b border-solid border-blueGray-200 flex items-center justify-between">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button onClick={() => setShowModal(false)}>
                <RxCross2 />
              </button>
            </div>
            {/*body*/}
            <div className="p-6">
              <p>{modalContent}</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 gap-4">
              <button
                className="border-2 font-semibold py-2 px-4 rounded-md"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-700 border-2 border-red-700 text-white py-2 px-4 rounded-md"
                type="button"
                onClick={btnAction}
              >
                {btn}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Modal;
