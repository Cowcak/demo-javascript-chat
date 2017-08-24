import React from 'react'

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
          font-family: 'Poppins', sans-serif;
          font-size: 1.8rem;
          border: 1px solid #EEEBF3;
          border-left: 0;
          padding: 25px 30px;
          width: 100%;
          display: block;
          outline: none;
          transition: border .2s ease;
          border-radius: 0;
          -webkit-appearance: none;
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
