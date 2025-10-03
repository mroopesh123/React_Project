import { useEffect, useState } from "react";

function Welcome() {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getJoke() {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke", { signal });
      const data = await res.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    }

    getJoke();

    return () => controller.abort();
  }, []);

  return (
    <>
      <h2>Welcome!</h2>
      <h5>{joke}</h5>
    </>
  );
}

export default Welcome;
