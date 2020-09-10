import * as React from "react";

const strickInput = intialValue => {
  const [value, setValue] = React.useState(intialValue);
  const exp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/
  const onChange = text => {
    if(text === '' || exp.test(text)){
    setValue(text);
    }
  };
  return { value, onChange };
};

export default strickInput;