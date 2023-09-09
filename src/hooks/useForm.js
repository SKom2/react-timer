import {useState} from "react";

export const useForm = (initialState) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(evt){
        const input = evt.target;
        const name = input.name;
        const value = input.value;
        setValues({...values, [name]: value})
        setErrors({...errors, [name]: input.validationMessage});
        setIsValid(input.closest('form').checkValidity());
    }

    return {
        values,
        errors,
        isValid,
        handleChange,
        setValues,
        setIsValid,
        setErrors,
    };
}
