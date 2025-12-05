export default function InputField({ label, children }) {
  return (
    <div className="form_group">
      <label>{label}</label>
      {children}
    </div>
  );
}
