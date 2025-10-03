import { useState, useContext } from "react";
import Incident from "./Incident";
import styles from "./style.module.css";
import { DarkModeContext } from "./DarkModeContext";

function IncidentList({ incidents, onDelete, onAdd }) {
  const { darkMode } = useContext(DarkModeContext);

  const [newIncident, setNewIncident] = useState({
    incident_id: "",
    title: "",
    priority: "Medium",
    status: "open",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewIncident(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(newIncident);
    setNewIncident({ incident_id: "", title: "", priority: "Medium", status: "open" });
  };

  return (
    
    <div className={darkMode ? styles.dark : ""}>
      <div className={styles.divv}>
        <h4>
  <form onSubmit={handleSubmit} className={styles.form}>
    
    <label>
      Incident Id&nbsp; &nbsp;
      <input
        type="text"
        name="incident_id"
        value={newIncident.incident_id}
        onChange={handleChange}
        className={styles.input}
        required
      />
    </label>

    <label>
      Title&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <input
        type="text"
        name="title"
        value={newIncident.title}
        onChange={handleChange}
        className={styles.input}
        required
      />
    </label>

    <label>
      Priority&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <select
        name="priority"
        value={newIncident.priority}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>
    </label>

    <label>
      Status&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
      <select
        name="status"
        value={newIncident.status}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </label>

    <button type="submit" id={styles.btn} className={styles.submitBtn}>
      Add
    </button>
  </form>
  </h4>
</div>


      <div className={styles.incidentList}>
        {incidents.map(incident => (
          <Incident
            key={incident.incident_id}
            incident={incident}
            onDelete={() => onDelete(incident.incident_id)}
          />
        ))}
      </div>
    </div>
    
  );
}

export default IncidentList;
