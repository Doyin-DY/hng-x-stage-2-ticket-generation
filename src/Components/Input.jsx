import React, { useState } from 'react'

export default function Input({ label, type, ...props }) {
    const [error, setError] = useState("");

    const validateInput = (e) => {
        const value = e.target.value;
        if (type === "email") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                setError("Invalid email address");
            } else {
                setError("");
            }
        }
        onChange(e); // Ensure value updates in the parent component
    };

    return (
        <fieldset className='flex flex-col gap-1'>
            <label className='text-white text-[10px]' htmlFor={props.id}>
                {label}
            </label>
            <input
                className='w-full p-2 rounded-lg border bg-transparent border-img text-white text-[10px]'
                {...props}
            />
            {error && <p className='text-red-500 text-xs'>{error}</p>}
        </fieldset>
    );
}
