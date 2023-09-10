import {useCallback, useState} from "react";

export const useForm = (initialState) => {
    const [values, setValues] = useState(initialState);

    function handleChange(evt){
        const input = evt.target;
        const name = input.name;
        const value = input.value;
        setValues({...values, [name]: value})
    }

    const resetForm = useCallback(
        (newValues = {}) => {
            setValues(newValues);
        },
        [setValues]
    );

    return {
        values,
        handleChange,
        setValues,
        resetForm
    };
}
