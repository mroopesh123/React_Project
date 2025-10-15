import { useReducer, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import IncidentList from "./IncidentList";
import Welcome from "./Welcome";
import Edit from "./Edit";
import data from "./IncidentList/incidents.json";
import { DarkModeContext } from "./DarkModeContext";

// Reducer for incidents
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(i => i.incident_id !== action.payload);
    case "UPDATE":
      return state.map(i =>
        i.incident_id === action.payload.incident_id ? action.payload : i
      );
    default:
      return state;
  }
}

function Home() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [incidents, dispatch] = useReducer(reducer, data);
  const navigate = useNavigate();

  const user = { prefix: "Mr.", firstName: "Roopesh", lastName: "Moopuri" };
  const date = new Date();

  const handleEditStart = incident => {
    navigate(`/incidents/edit/${incident.incident_id}`);
  };

  const handleSave = updatedIncident => {
    dispatch({ type: "UPDATE", payload: updatedIncident });
    navigate("/incidents");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: darkMode ? "#121212" : "#f5f5f5", color: darkMode ? "#fff" : "#000" }}>
      
      {/* Fixed Header */}
      <AppBar position="fixed" color={darkMode ? "default" : "primary"} sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">
              Welcome {user.prefix} {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle2">
              Time: {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
            </Typography>
          </Box>

          <Box>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/incidents" color="inherit">Incidents</Button>
            <Button onClick={toggleDarkMode} color="inherit">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content with padding-top for fixed header */}
      <Box sx={{ p: 3, pt: 12 }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/incidents"
            element={
              <IncidentList
                incidents={incidents}
                onDelete={id => dispatch({ type: "DELETE", payload: id })}
                onAdd={incident => dispatch({ type: "ADD", payload: incident })}
                onEdit={handleEditStart}
              />
            }
          />
          <Route
            path="/incidents/edit/:id"
            element={<Edit incidents={incidents} onSave={handleSave} />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default Home;
