const Input = ({ placeholder, value, onChange, onPress, name, margin = 0 }) =>
  <div>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onKeyPress={onPress}
      style={{ margin }}
    />
    <style jsx>
      {`
        input {
          border: 1px solid #EEEBF3;
          border-left: none;
          padding: 25px 30px;
          font-size: 1.8rem;
          width: 100%;
          display: block;
          outline: none;
          transition: border .2s ease;
        }
         {
          /* input:focus, input:hover {
          border-color: #c4c3c9;
          border-left: 1px solid #c4c3c9;
        } */
        }
      `}
    </style>
  </div>

export default Input
