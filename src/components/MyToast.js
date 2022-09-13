import React from "react";
import Alert from "react-bootstrap/Alert";

export default function MyToast(props) {
  return (
    <div>
      <>
        {props.alert && (
          <Alert variant={props.alert.type}>{props.alert.message}</Alert>
        )}
      </>
    </div>
  );
}
