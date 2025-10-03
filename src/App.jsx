import Home from "./Home.jsx";
import { DarkModeProvider } from "./DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <Home />
    </DarkModeProvider>
  );
}

export default App;
