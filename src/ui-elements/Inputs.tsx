import { FC, ChangeEvent } from 'react';
import { createCSSClass } from '../utils/jsxHelpers';

type InputProps = {
    placeholder?: string,
    className?: string,
    type?: string,
    textarea?: boolean,
    value: string,
    name: string,
    label?: string,
    wrapperClassName?: string,
    labelClassName?: string,
    handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
}

const Inputs: FC<InputProps> = ({ placeholder, className, type, textarea, value, name, label, wrapperClassName, labelClassName, handleChange }: InputProps) => {
    const baseInputsStyle = "border rounded-md w-full p-2 border-[#ccc] focus:outline-none focus:border-gray-500";

    const baseLabelStyle = "text-main-green text-left font-bold";

    return (
        <div className={wrapperClassName}>
            {label && <p className={createCSSClass([baseLabelStyle, labelClassName])}><label>{label}</label></p>}
            {textarea ? (
                <textarea className={createCSSClass([baseInputsStyle, className])} value={value} name={name} placeholder={placeholder} onChange={handleChange}></textarea>
            ) : (
                <input className={createCSSClass([baseInputsStyle, className])} type={type} value={value} name={name} placeholder={placeholder} onChange={handleChange} />
            )}
        </div>
    );
};

export default Inputs;