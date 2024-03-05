import { ChangeEvent, FormEvent } from "react";

interface TextInputProps {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export function TextInput({id, type, value, placeholder, onChange}: TextInputProps) {
    return (
      <>
        <label className="sign-in-label">Email</label>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        ></input>
      </>
    );
}