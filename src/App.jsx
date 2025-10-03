import Home from "./Home.jsx";
import { BrowserRouter} from "react-router-dom";
import { DarkModeProvider } from "./DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
