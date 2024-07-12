import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";

function EditBox({ title, open, setOpen, onSubmit, formData, setFormData }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    // Validate name
    if (!formData.name || formData.name.length < 2) {
      tempErrors.name = "Name must have more than 2 words.";
    }

    // Validate image URL
    const isValidURL = (str) => {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" +
          "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" +
          "(\\#[-a-zA-Z\\d_]*)?$"
      );
      return pattern.test(str);
    };
    if (!formData.image || !isValidURL(formData.image)) {
      tempErrors.image = "Image must be a valid URL.";
    }

    // Validate date of birth
    if (!moment(formData.dateofbirth, "DD/MM/YYYY", true).isValid()) {
      tempErrors.dateofbirth =
        "Date of Birth must be a valid date in DD/MM/YYYY format.";
    }

    // Validate gender
    if (formData.gender !== true && formData.gender !== false) {
      tempErrors.gender = "Gender must be True (Male) or False (Female).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(e);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        <span className="font-bold underline">{title}</span>
        <IconButton style={{ float: "right" }} onClick={() => setOpen(false)}>
          <Close color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} margin={2}>
            <TextField
              required
              name="image"
              value={formData.image || ""}
              variant="outlined"
              onChange={handleChange}
              label="Avatar"
              error={!!errors.image}
              helperText={errors.image}
            />
            <TextField
              required
              name="name"
              value={formData.name || ""}
              variant="outlined"
              onChange={handleChange}
              label="Name"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              required
              name="dateofbirth"
              value={formData.dateofbirth || ""}
              variant="outlined"
              onChange={handleChange}
              label="Date of Birth"
              error={!!errors.dateofbirth}
              helperText={errors.dateofbirth}
            />
            <TextField
              required
              name="class"
              value={formData.class || ""}
              variant="outlined"
              onChange={handleChange}
              label="Class"
            />
            <TextField
              required
              name="feedback"
              value={formData.feedback || ""}
              variant="outlined"
              onChange={handleChange}
              label="Feedback"
            />
            <FormControl required variant="outlined" fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
                error={!!errors.gender}
              >
                <MenuItem value={true}>Male - True</MenuItem>
                <MenuItem value={false}>Female - False</MenuItem>
              </Select>
              {errors.gender && (
                <Typography color="error" variant="body2">
                  {errors.gender}
                </Typography>
              )}
            </FormControl>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditBox;
