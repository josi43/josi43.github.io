import HomeList from "./HomeList";
import './Home.css'
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <section>
      <h1>Meus filmes</h1>
      <Carousel />
    </section>
  )
}