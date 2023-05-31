import "./style.css";

const CardList = (props) => {
  const handleCheckboxChange = (e) => {
    props.handleCheckboxChange(e);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/4 xl:w-1/5 2xl:w-1/6 p-4">
      <input
        id={props.id}
        className="hidden"
        type="checkbox"
        name={props.name}
        value={props.id}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={props.id} className="card p-2 cursor-pointer">
        <img src={props.img} />
        <div className="content">
          <p className="title">{props.name}</p>
          <strong>{props.position}</strong>
        </div>
      </label>
    </div>
  );
};

export default CardList;
