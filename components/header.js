import NextLink from 'next/link'
import SortBy from './sortby'

export default ({ heading }) =>
  <header>
    <div className="link">
      <NextLink href="/">
        <a className="logo">
          Rapid.io chat
        </a>
      </NextLink>
    </div>
    <div className="heading">
      <h1>{heading}</h1>
    </div>
    <style jsx>
      {`
        header {
          height: 80px;
          display: flex;
          border-bottom: 1px solid #EEEBF3;
        }
        .link {
          flex: 1;
          max-width: 400px;
          border-right: 1px solid #EEEBF3;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 80px;
        }
        @media screen and (min-width: 800px) {
          .link {
            padding: 0 0 0 130px;
          }
        }
        a {
          font-size: 1.8rem;
          font-weight: 500;
          text-decoration: none;
          color: black;
        }
        .heading {
          flex: 2;
          display: flex;
          align-items: center;
        }
        h1 {
          margin: 0;
          font-size: 2.4rem;
          font-weight: 600;
          margin-left: 60px;
        }
      `}
    </style>
  </header>
