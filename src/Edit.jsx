import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Paper } from "@mui/material";

function Edit({ incidents, onSave }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const incident = incidents.find(i => i.incident_id === id);
  const [newIncident, setNewIncident] = useState({ ...incident });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewIncident(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(newIncident);
  };

  if (!incident) {
    return <Typography>Incident not found</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: 400 }} elevation={3}>
        <Typography variant="h6" gutterBottom>Edit Incident</Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={newIncident.title}
            onChange={handleChange}
            required
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
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>

          <Button onClick={() => navigate("/incidents")} variant="outlined" fullWidth>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Edit;
