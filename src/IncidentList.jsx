import { useState, useContext } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Paper, Typography, Grid } from "@mui/material";
import Incident from "./Incident";
import { DarkModeContext } from "./DarkModeContext";

function IncidentList({ incidents, onDelete, onAdd, onEdit }) {
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
    <Box sx={{ p: 3, minHeight: "100vh" }}>

      {/* Add Incident Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,     // medium width
          margin: "0 auto",  // center horizontally
          display: "grid",
          gap: 2,
          mb: 4
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Incident
        </Typography>

        <TextField
          label="Incident ID"
          name="incident_id"
          value={newIncident.incident_id}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />

        <TextField
          label="Title"
          name="title"
          value={newIncident.title}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={newIncident.priority}
            onChange={handleChange}
            label="Priority"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={newIncident.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>

      {/* Incident List */}
      <Grid container spacing={2}>
        {incidents.map(incident => (
          <Grid item xs={12} sm={6} md={4} key={incident.incident_id}>
            <Incident
              incident={incident}
              onDelete={() => onDelete(incident.incident_id)}
              onEdit={onEdit}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default IncidentList;
