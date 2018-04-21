import React from 'react';
import {} from 'reactstrap';

export default () => {
  return (
    <footer className="page-footer font-small">
      <div className="py-3 text-center bg-secondary text-white">
        Copyright &copy; {new Date().getFullYear()} Sarpsborg Kammerkor
      </div>
    </footer>
  );
};
