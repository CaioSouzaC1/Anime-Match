import "./style.css";

const ModalLoader = () => {
  return (
    <div className="modal">
      <div>
        <h1 className="text-6xl mb-8 text-white font-bold">Redirecting!</h1>
        <div className="">
          <div className="loader mx-auto mt-4">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLoader;
