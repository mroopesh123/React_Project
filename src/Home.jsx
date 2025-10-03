import { useReducer, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./style.module.css";
import IncidentList from "./IncidentList";
import Welcome from "./Welcome";
import data from "./IncidentList/incidents.json";
import { DarkModeContext } from "./DarkModeContext";

// Reducer for incidents
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(i => i.incident_id !== action.payload);
    default:
      return state;
  }
}

function Home() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [incidents, dispatch] = useReducer(reducer, data);

  const user = { prefix: "Mr.", firstName: "Roopesh", lastName: "Moopuri" };
  const date = new Date();

  return (
    <div className={`${styles.app} ${darkMode ? styles.dark : ""}`}>
      <header className={styles.header}>
        <span>
          Welcome {user.prefix} {user.firstName} {user.lastName}
        </span>
        <span>
          Time: {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </span>
        <nav>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link to="/" className={styles.link}>Home</Link>
            </li>
            <li className={styles.listItem}>
              <Link to="/incidents" className={styles.link}>Incidents</Link>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link} onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/incidents"
            element={
              <IncidentList
                incidents={incidents}
                onDelete={id => dispatch({ type: "DELETE", payload: id })}
                onAdd={incident => dispatch({ type: "ADD", payload: incident })}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
