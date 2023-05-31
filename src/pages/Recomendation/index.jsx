import { Link, useLocation } from "react-router-dom";
import RecomendationListItem from "../../components/RecomendationListItem";
import "./style.css";
const Recomendation = () => {
  const { state } = useLocation();
  let cont = 0;
  console.log(state);

  return (
    <section className="text-center">
      <h1 className="font-bold text-4xl text-white text-center mt-8 mb-4">
        Here your recomendation:
      </h1>
      <ul className="flex flex-wrap p-4 text-white justify-around text-left">
        {state.data &&
          state.data.map((e, i) => {
            cont++;
            return (
              <RecomendationListItem
                key={e.mal_id}
                id={e.mal_id}
                episodes={e.episodes}
                name={e.title}
                img={e.img}
                position={cont}
                genres={e.genres}
                year={e.year}
                trailer={e.trailer ? e.trailer : false}
              />
            );
          })}
      </ul>
      <button className="bg-f-red rounded-md text-white mx-auto m-4">
        <Link className="p-4 block" to={"/"}>
          Choose again!
        </Link>
      </button>
    </section>
  );
};

export default Recomendation;
