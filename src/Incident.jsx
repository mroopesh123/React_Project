import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import styles from "./Incident.module.css";

function Incident({ incident, onDelete }) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`${styles.box} ${darkMode ? "dark" : ""}`}>
      <ul>
        <li>ID: {incident.incident_id}</li>
        <li>Title: {incident.title}</li>
        <li>Status: {incident.status}</li>
        <li>Priority: {incident.priority}</li>
        <button onClick={onDelete}>Delete</button>
      </ul>
    </div>
  );
}

export default Incident;
