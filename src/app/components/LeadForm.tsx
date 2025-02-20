"use client";

import Section from "./Section";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import FileUploadRenderer from "./FileUploadRenderer";
import { useState, useEffect } from "react";
import { Button, Alert, TextField } from "@mui/material";

export default function LeadForm() {
  const [mounted, setMounted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const [personalData, setPersonalData] = useState({});
  const [personalErrors, setPersonalErrors] = useState([]);

  const [interestData, setInterestData] = useState({});
  const [interestErrors, setInterestErrors] = useState([]);

  const [helpData, setHelpData] = useState({});
  const [helpErrors, setHelpErrors] = useState(["Description is required"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const personalSchema = {
    type: "object",
    properties: {
      firstname: { type: "string", minLength: 3 },
      lastname: { type: "string", minLength: 3 },
      email: { type: "string", format: "email" },
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
      website: { type: "string", format: "url" },
      resume: {
        type: "object",
        properties: {},
      },
    },
    required: [
      "firstname",
      "lastname",
      "email",
      "citizenship",
      "website",
      "resume",
    ],
  };

  const personalUiSchema = {
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
      {
        type: "Control",
        scope: "#/properties/resume",
        label: "Resume",
      },
    ],
  };

  const customRenderers = [
    ...materialRenderers,
    {
      tester: (uischema, schema) => {
        if (uischema.scope === "#/properties/resume") {
          return 10;
        }
        return -1;
      },
      renderer: FileUploadRenderer,
    },
  ];

  const interestSchema = {
    type: "object",
    properties: {
      interest: {
        type: "array",
        uniqueItems: true,
        items: {
          type: "string",
          enum: ["O-1", "EB-1A", "EB-2 NIW", "I don't know"],
        },
      },
    },
    required: ["interest"],
  };

  const interestUiSchema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/interest",
        label: false,
        classNames: ["hide-required"],
      },
    ],
  };

  const handleSubmit = async () => {
    setShowValidation(true);
    setApiError("");

    if (
      personalErrors.length > 0 ||
      interestErrors.length > 0 ||
      helpErrors.length > 0
    ) {
      console.log("Validation failed", {
        personalErrors,
        interestErrors,
        helpErrors,
      });
      return;
    }

    const combinedData = {
      ...personalData,
      ...interestData,
      ...helpData,
    };

    setLoading(true);

    try {
      // Create a new FormData instance
      const formData = new FormData();

      // Add the resume file if it exists
      if (personalData.resume?.file) {
        formData.append("resume", personalData.resume.file);
      }

      // Add all other data as JSON, excluding the file object
      const dataWithoutFile = {
        ...combinedData,
        resume: undefined, // Remove the file object from JSON data
      };
      formData.append("data", JSON.stringify(dataWithoutFile));

      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData,
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
        <div>
          <Section
            title="Want to understand your visa options?"
            imageUrl="/info.png"
            description="Submit the form below and our team of experience attorneys will review your information and send a preliminary assessment of your case based on your goals."
          >
            <JsonForms
              schema={personalSchema}
              uischema={personalUiSchema}
              data={personalData}
              renderers={customRenderers}
              cells={materialCells}
              onChange={({ data, errors }) => {
                setPersonalData(data);
                setPersonalErrors(errors);
              }}
              validationMode={
                showValidation ? "ValidateAndShow" : "ValidateAndHide"
              }
              options={{
                showValidation: showValidation,
                validationMode: showValidation
                  ? "ValidateAndShow"
                  : "ValidateAndHide",
              }}
            />
          </Section>

          <Section title="Visa categories of interest?" imageUrl="/dice.png">
            <JsonForms
              schema={interestSchema}
              uischema={interestUiSchema}
              data={interestData}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data, errors }) => {
                setInterestData(data);
                setInterestErrors(errors);
              }}
              validationMode={
                showValidation ? "ValidateAndShow" : "ValidateAndHide"
              }
            />
          </Section>

          <Section title="How can we help you?" imageUrl="/heart.png">
            <TextField
              fullWidth
              multiline
              rows={5}
              label=""
              required
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permament residency or short-term employment visa or both? Are there any timeline considerations?"
              value={helpData.description || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                const trimmedValue = newValue.trim();
                setHelpData({ description: newValue });
                setHelpErrors(
                  trimmedValue.length === 0 ? ["Description is required"] : []
                );
              }}
              error={showValidation && helpErrors.length > 0}
              helperText={
                showValidation && helpErrors.length > 0
                  ? "This field is required"
                  : ""
              }
            />
          </Section>

          <div style={{ maxWidth: "25rem", margin: "3rem auto" }}>
            {apiError && (
              <Alert severity="error" className="mb-4">
                {apiError}
              </Alert>
            )}

            <Button
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ p: 2, mb: 4 }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      )}

      {success && (
        <>
          <Section
            title="Thank You"
            imageUrl="/info.png"
            description="Your information was submitted to our team of immigration attorneys.
            Expect an email from hello@tryalam.ai."
          >
            <Button
              fullWidth
              onClick={() => (window.location.href = "/")}
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
          </Section>
        </>
      )}
    </>
  );
}
