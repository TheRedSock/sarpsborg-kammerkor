import React from 'react';
import {} from 'reactstrap';

export default () => {
  return (
    <footer className="footer page-footer font-small">
      <div className="py-3 text-center bg-dark text-white">
        Copyright &copy; {new Date().getFullYear()} Sarpsborg Kammerkor
      </div>
    </footer>
  );
};
