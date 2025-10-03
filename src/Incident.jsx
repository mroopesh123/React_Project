import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import styles from "./Incident.module.css";
import { Button } from '@mui/material';

function Incident({ incident, onDelete }) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`${styles.box} ${darkMode ? "dark" : ""}`}>
      <ul>
        <li>ID: {incident.incident_id}</li>
        <li>Title: {incident.title}</li>
        <li>Status: {incident.status}</li>
        <li>Priority: {incident.priority}</li>
        <Button  sx={{
          color: 'black',
          backgroundColor: 'purple',
          margin: '20px 5px 0px 50px',
          borderRadius:'20px',
          '&:hover': {
      backgroundColor: 'red', // color on hover
      color: 'white',               // text color on hover
    }
          
        }} varient="contained" color="error" onClick={onDelete}>Delete</Button>
      </ul>
    </div>
  );
}

export default Incident;
