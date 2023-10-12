import { useContext } from "react";
import { ModalContext } from "../../contextApi/ModalContextApi";
import { RxCross2 } from "react-icons/rx";

const Modal = () => {
  const { setShowModal, title, btn } = useContext(ModalContext);

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
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolorem explicabo molestias distinctio est provident. Illum quas
                rerum soluta culpa quaerat eos. Amet sit eos ipsa mollitia
                eveniet repellendus, consequatur accusantium.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
              <button
                className="text-red-600 font-semibold px-6"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-[#1C2434] text-[#C6CCD7] py-3 px-4 rounded-md"
                type="button"
                onClick={() => setShowModal(false)}
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
