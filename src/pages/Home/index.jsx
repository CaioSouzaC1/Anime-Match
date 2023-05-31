import List from "../../components/List";

const Home = () => {
  return (
    <>
      <h1 className="font-bold text-4xl text-white text-center mt-8 mb-4">
        Discover Anime Match
      </h1>
      <h2 className="font-bold text-2xl text-white text-center mt-4 w-4/5 mx-auto">
        Find the best animes for you. Our system analyzes your past viewing
        history to suggest shows that you're likely to enjoy.
      </h2>
      <h3 className="font-bold text-xl text-white text-center my-4 w-4/5 mx-auto">
        Click on the cards to select and see the anime names!
      </h3>
      <List></List>
    </>
  );
};
export default Home;
