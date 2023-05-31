import { useEffect, useState } from "react";
import CardList from "../CardList";
import { errorFy, successFy } from "../../utils/functions";
import { ToastContainer } from "react-toastify";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import ModalLoader from "../ModalLoader";
const List = () => {
  const [animeList, setAnimeList] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);
  const [showModalLoader, setShowModalLoader] = useState(false);
  const [sended, setSended] = useState(false);

  const navigate = useNavigate();

  const get_top_anime = async (first_time = true) => {
    let animeResponse = [];

    if (first_time) {
      const response = await (
        await fetch("https://api.jikan.moe/v4/top/anime?limit=25")
      ).json();
      setAnimeList(response.data);
      return;
    }

    for (let i = 1; i <= 8; i++) {
      if (i < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1400 + i * 200));
      }

      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?limit=25&page=${i}`
      );
      const top_anime = await response.json();

      top_anime.data.forEach((e) => {
        animeResponse.push(e);
      });
      setAnimeList(animeResponse);
    }
  };

  const send_form = async (event) => {
    event.preventDefault();

    if (sended) {
      return;
    }
    setSended(true);
    const checkboxes = event.target.querySelectorAll('input[type="checkbox"]');

    const checkedAnimes = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);

    const commonAnimeMap = {};

    for (const animeId of checkedAnimes) {
      const recommendations = await calculate_anime_recomendations(animeId);
      for (const recommendation of recommendations) {
        const malId = recommendation.entry.mal_id;
        if (commonAnimeMap[malId]) {
          commonAnimeMap[malId]++;
        } else {
          commonAnimeMap[malId] = 1;
        }
      }
      successFy("Calculating recommendations!");
      await delay(2000);
    }

    setShowModalLoader(true);

    get_anime_data(
      Object.entries(commonAnimeMap)
        .filter(([malId, count]) => count > 1)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([malId, count]) => ({
          mal_id: parseInt(malId),
          votes: count,
        }))
    );
  };

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const calculate_anime_recomendations = async (animeId) => {
    const req = await (
      await fetch(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`)
    ).json();
    return req.data;
  };

  const handleCheckboxChange = (e) => {
    const newCount = checkedCount + (e.target.checked ? 1 : -1);
    if (newCount <= 5) {
      setCheckedCount(newCount);
    } else {
      e.preventDefault();
      errorFy("You have already selected 5 animes!");
      document.querySelector("#safe_click").click();
    }
  };

  const get_anime_data = async (common_animes) => {
    let sup = [];

    for (const anime of common_animes) {
      const req = await (
        await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}`)
      ).json();

      const data = req.data;
      await delay(2000);
      const obj = new Object();
      obj.mal_id = data.mal_id;
      obj.episodes = data.episodes;
      obj.title = data.title;
      const genre_arr = [];
      data.genres.forEach((e) => {
        genre_arr.push(e.name);
      });
      obj.genres = genre_arr;
      obj.img = data.images.webp.image_url;
      obj.year = data.year;
      obj.trailer = data.trailer.youtube_id;
      sup[anime.mal_id] = obj;
    }

    navigate("/recomendation", {
      state: {
        data: sup,
      },
    });
  };

  useEffect(() => {
    get_top_anime(true);
    get_top_anime(false);
  }, []);

  return (
    <>
      <form onSubmit={send_form} className="flex flex-wrap p-4">
        <p id="safe_click"></p>
        {animeList &&
          animeList.map((anime, i) => {
            return (
              <CardList
                key={anime.mal_id}
                id={anime.mal_id}
                name={anime.titles[0].title}
                img={anime.images.jpg.image_url}
                position={i + 1}
                handleCheckboxChange={handleCheckboxChange}
              ></CardList>
            );
          })}
        <div
          className={`${checkedCount > 1 ? styles.calculate_button_show : ""} ${
            styles.calculate_button
          }`}
        >
          <button
            type="submit"
            className="p-4 bg-gradient-to-tr from-f-red to-f-orange hover:bg-gradient-to-tl rounded-lg text-white text-lg font-bold uppercase"
          >
            Calculate
          </button>
        </div>
      </form>
      {showModalLoader && <ModalLoader />}

      <ToastContainer />
    </>
  );
};

export default List;
