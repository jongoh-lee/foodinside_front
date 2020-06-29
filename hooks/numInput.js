import * as React from "react";

const useInput = intialValue => {
  const [value, setValue] = React.useState(intialValue);
  const exp = /^[/0-9|]+$/
  const onChange = text => {
    if(text === '' || exp.test(text)){
    setValue(text);
    }
  };
  return { value, onChange };
};

export default useInput;