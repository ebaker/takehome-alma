"use client";

import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function LeadForm() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const schema = {
    type: "object",
    properties: {
      firstname: {
        type: "string",
        minLength: 3,
      },
      lastname: {
        type: "string",
        minLength: 3,
      },
      email: {
        type: "string",
        format: "email",
      },
    },
    required: ["firstname", "lastname", "email"],
  };

  const uischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/firstname",
        label: "First Name",
      },
      {
        type: "Control",
        scope: "#/properties/lastname",
        label: "Last Name",
      },
      {
        type: "Control",
        scope: "#/properties/email",
        label: "Email",
      },
    ],
  };

  const handleSubmit = () => {
    setShowValidation(true);
    if (errors.length === 0) {
      console.log("Form is valid, submitting:", data);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => {
          setData(data);
          setErrors(errors);
        }}
        validationMode={showValidation ? "ValidateAndShow" : "NoValidation"}
      />
      <Button
        fullWidth
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 2, p: 2 }}
      >
        Submit
      </Button>
    </>
  );
}
