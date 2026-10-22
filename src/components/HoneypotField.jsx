export default function HoneypotField({ inputRef }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label>
        Leave this field empty
        <input ref={inputRef} type="text" name="_honey" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
