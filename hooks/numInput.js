import * as React from "react";

const numInput = intialValue => {
  const [value, setValue] = React.useState(intialValue);
  console.log("sdf",value)
  const exp = /^[/0-9|]+$/
  const onChange = text => {
    if(text === '' || exp.test(text)){
      setValue(text);
    }
  };
  return { value, onChange };
};

export default numInput;