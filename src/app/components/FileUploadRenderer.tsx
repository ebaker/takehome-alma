import { withJsonFormsControlProps } from "@jsonforms/react";
import { AttachFile as AttachFileIcon } from "@mui/icons-material";
import { useState } from "react";

const FileUploadRenderer = ({
  data,
  path,
  handleChange,
  schema,
  required,
  visible,
  id,
  uischema,
  errors,
}) => {
  const hasErrors = errors && errors.length > 0;
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      handleChange(path, { file });
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <input
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        id="resume-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="resume-file" style={{ width: "100%", display: "block" }}>
        <div
          style={{
            border: `1px solid ${hasErrors ? "#d32f2f" : "#c4c4c4"}`,
            borderRadius: "16px",
            padding: "16.5px 14px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "56px",
            backgroundColor: "transparent",
            transition: "border-color 0.2s",
            "&:hover": {
              borderColor: "#000000",
            },
          }}
        >
          <span
            style={{
              color: hasErrors ? "#d32f2f" : fileName ? "#000000" : "#666666",
              fontSize: "1rem",
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            }}
          >
            {fileName || "Click to upload resume (PDF, DOC, DOCX)"}
          </span>
          <AttachFileIcon
            style={{
              color: hasErrors ? "#d32f2f" : fileName ? "#1976d2" : "#666666",
              marginLeft: "8px",
            }}
          />
        </div>
      </label>
      {hasErrors && (
        <div
          style={{
            color: "#d32f2f",
            fontSize: "0.75rem",
            margin: "3px 14px",
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            textAlign: "left",
          }}
        >
          is a required property
        </div>
      )}
    </div>
  );
};

export default withJsonFormsControlProps(FileUploadRenderer);
