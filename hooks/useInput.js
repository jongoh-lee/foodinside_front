import * as React from "react";

const useInput = intialValue => {
  const [value, setValue] = React.useState(intialValue);
  const onChange = text => {
    setValue(text);
  };
  return { value, onChange };
};

export default useInput;