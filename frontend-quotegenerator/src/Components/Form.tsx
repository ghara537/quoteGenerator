import './Form.css'


interface FormProps {
    children: React.ReactNode;
    onSubmit: () => void;
}


export function Form({children, onSubmit}: FormProps) {

    return (
      <form className="form" onSubmit={onSubmit}>
        <label className="form-label"></label>
        {children}
      </form>
    );
}