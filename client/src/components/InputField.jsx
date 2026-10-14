function InputField({ label, type, id, value, onChange, required = false }) {
  return (
    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        style={{ padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );
}

export default InputField;