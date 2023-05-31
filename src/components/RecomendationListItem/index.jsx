import "./style.css";

const RecomendationListItem = (props) => {
  return (
    <li className="w-full sm:w-1/2 md:w-1/4 xl:w-1/5 2xl:w-1/6 p-4">
      <div className="card_reco p-2">
        <img src={props.img} />
        <div className="content">
          <p className="title">{props.name}</p>
          <strong className="pos">{props.position}</strong>
        </div>
      </div>
      <div className="mt-4 more_data pb-4">
        <div className="px-4">
          <h4 className="text-md font-bold">Genres:</h4>
          <ul className="genres_list flex flex-wrap mb-2 justify-between">
            {props.genres.map((e) => {
              return (
                <li className="text-sm font-medium" key={e}>
                  {e}
                </li>
              );
            })}
          </ul>
          <h5 className="text-md font-bold">
            <span className="font-normal">Released:</span> {props.year}
          </h5>
          <h5 className="text-md font-bold">
            <span className="font-normal">Episodes:</span> {props.episodes}
          </h5>
          {props.trailer ? (
            <div
              className="mt-4"
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${props.trailer}`}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  overflow: "hidden",
                }}
                title={props.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <h5 className="text-md font-bold mt-4">
              <span className="font-normal ">
                Unfortunately this anime does not have an official trailer
              </span>
            </h5>
          )}
        </div>
      </div>
    </li>
  );
};

export default RecomendationListItem;
