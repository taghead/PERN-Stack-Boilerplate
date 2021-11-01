import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      This message and the component below is loaded from the index file /components/Layout/index
      <Header />
      This message and the page below is loaded from the index file /components/Layout/index
      {children}
    </div>
  );
};

export default Layout;