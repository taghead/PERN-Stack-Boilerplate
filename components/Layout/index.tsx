import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      This and all content is loaded from the index file /components/Layout/index
      <Header />
      {children}
    </div>
  );
};

export default Layout;