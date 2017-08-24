import React from 'react'

export default ({ children }) =>
  <button
    type="submit"
  >
    {children}
    <style jsx>{`
      button {
        background: #cf4647;
        padding: 23px 0;
        text-align: center;
        min-width: 233px;
        display: inline-block;
        cursor: pointer;
        border-radius: 4px;
        font-size: 1.8rem;
        color: white;
        text-decoration: none;
        transition: .2s ease;
        border: 1px solid #cf4647;
        outline: none;
        line-height: 1;
      }

      button:hover {
        color: #cf4647;
        background: #fff;
      }
    `}</style>
  </button>
