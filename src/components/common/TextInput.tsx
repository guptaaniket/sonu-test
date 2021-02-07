import React from "react";

interface Props {
  name: string;
  onChange: any;
  placeholder: string;
  value: string;
  className?:string;
  inputClass:string;
};

const TextInput = ({ name, onChange, placeholder, value, className,inputClass }: Props) => {
  return (
    <div className={className}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClass}
      />
    </div>
  );
};

export default TextInput; 