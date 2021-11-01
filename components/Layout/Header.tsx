import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div>
        <Link href="/">
          <a> This content is loaded from the header file /components/Layout/Header </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;