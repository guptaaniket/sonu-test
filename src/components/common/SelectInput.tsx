import React from "react";

interface Option {
    text: string;
    value: string;
}
interface Props {
    name: string;
    onChange: any;
    placeholder: string;
    value: string;
    defaultOption: string;
    options: Array<Option>;
    className?:string;
    inputClass:string;
};

const SelectInput = ({
    name,
    onChange,
    defaultOption,
    value,
    options,
    className,
    inputClass
}: Props) => {
    return (
        <div className={className}>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={inputClass}
            >
                <option value="default">{defaultOption}</option>
                {options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    );
                })}
            </select>

        </div>
    );
};

export default SelectInput; 