"use client";

import Section from "./Section";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useState, useEffect } from "react";
import { Button, Alert } from "@mui/material";

export default function LeadForm() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);
  const [showValidation, setShowValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

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
      citizenship: {
        type: "string",
        enum: [
          "United States",
          "Canada",
          "United Kingdom",
          "Australia",
          "Germany",
          "France",
          "Italy",
          "Spain",
          "China",
          "Japan",
          "South Korea",
          "India",
          "Brazil",
          "Mexico",
          "South Africa",
          "Other",
        ],
      },
      website: {
        type: "string",
        format: "url",
      },
    },
    required: ["firstname", "lastname", "email", "citizenship", "website"],
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
      {
        type: "Control",
        scope: "#/properties/citizenship",
        label: "Country of Citizenship",
      },
      {
        type: "Control",
        scope: "#/properties/website",
        label: "LinkedIn / Personal Website URL",
      },
    ],
  };

  const handleSubmit = async () => {
    setShowValidation(true);
    setApiError("");

    if (errors.length > 0) {
      console.log("Form validation failed", errors);
      return;
    }

    setLoading(true);

    try {
      console.log("Form is valid, submitting:", data);
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {!success && (
        <>
          <Section
            title="Want to understand your visa options?"
            imageUrl="/info.png"
          >
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based oon your goals.
          </Section>
          <div style={{ maxWidth: "25rem", margin: "2rem auto" }}>
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
              validationMode={
                showValidation ? "ValidateAndShow" : "ValidateAndHide"
              }
            />
            {apiError && (
              <Alert severity="error" sx={{ maxWidth: "25rem" }}>
                {apiError}
              </Alert>
            )}
            <Button
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 2, p: 2 }}
              loading={loading}
            >
              Submit
            </Button>
          </div>
        </>
      )}
      {success && (
        <>
          <Section title="Thank You" imageUrl="/info.png">
            Your information was submitted to our team of immigration attorneys.
            Expect an emai lfrom hello@tryalam.ai.
          </Section>
          <Button
            fullWidth
            onClick={() => (window.location = "/")}
            variant="contained"
            sx={{
              mt: 2,
              p: 2,
              maxWidth: "25rem",
              margin: "2rem auto",
              display: "block",
            }}
          >
            Go Back to Homepage
          </Button>
        </>
      )}
    </>
  );
}
