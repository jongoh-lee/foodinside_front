import * as React from "react";

const priceInput = intialValue => {
  const [value, setValue] = React.useState(intialValue);
  const onChange = text => {
    let _text = text.replace(/[^0-9]/g,"")
    setValue(_text);
  };
  return { value, onChange };
};

export default priceInput;