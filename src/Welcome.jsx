import { useEffect, useState } from "react";
import axios from "axios";

function Welcome() {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal=controller.signal;

    async function getJoke() {
      try {
        const res = await axios.get(
          "https://official-joke-api.appspot.com/random_joke",
          { signal}
        );
        setJoke(`${res.data.setup} - ${res.data.punchline}`);
      } catch (error) {

          console.log(error);
      }
    }

    getJoke();

    return () => controller.abort(); // cleanup on unmount
  }, []);

  return (
    <>
      <h2>Welcome!</h2>
      <h5>{joke}</h5>
    </>
  );
}

export default Welcome;
