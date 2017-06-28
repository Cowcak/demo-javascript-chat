const ChannelItem = ({ name, lastMessage, onClick, active }) =>
  <li>
    <button onClick={onClick} className={active && 'active'}>
      <span>
        <span className="dash">#</span>
        {name}
      </span>
    </button>
    <style jsx>
      {`
        li {
        }
        button {
          border: none;
          background: none;
          cursor: pointer;
          padding: 5px 0;
          position: relative;
          transition: color .1s ease;
          font-size: 1.8rem;
          font-weight: 600;
          width: 100%;
          text-align: left;
        }
        button:hover {
          color: #CF4647;
        }
        button.active {
          color: #CF4647;
        }
        .dash {
          margin-right: 15px;
        }
      `}

    </style>
  </li>

export default ChannelItem
