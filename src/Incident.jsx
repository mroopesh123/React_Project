import { Card, CardContent, Typography, CardActions, Button, Chip } from "@mui/material";

function Incident({ incident, onDelete, onEdit }) {
  // Function to set priority color
  const getPriorityColor = priority => {
    switch (priority) {
      case "Critical":
        return "error";
      case "High":
        return "warning";
      case "Medium":
        return "info";
      default:
        return "success";
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        minHeight: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          transform: "scale(1.03)",
          transition: "0.2s",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {incident.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Incident ID: {incident.incident_id}
        </Typography>

        <Chip
          label={incident.priority}
          color={getPriorityColor(incident.priority)}
          size="small"
          sx={{ mt: 1 }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Status: {incident.status}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small" variant="outlined" onClick={() => onEdit(incident)}>
          Edit
        </Button>
        <Button size="small" variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Incident;
