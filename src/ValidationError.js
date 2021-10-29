import React from "react";

// Standard Error displayed on validation fail
export default function ValidationError(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }

  return <></>;
}
