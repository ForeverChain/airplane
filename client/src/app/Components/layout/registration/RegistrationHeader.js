import React from 'react';
import {Link} from "react-router-dom";

const RegistrationHeader = () => {
  return (
    <div className="kt-container d-flex align-items-center justify-content-between pb-4">
      <h4 className="text-white">Бүртгүүлэх</h4>
      <Link to='/' className="btn btn-primary"> <i className='fa fa-arrow-left'/> Буцах</Link>
    </div>
  );
};

export default RegistrationHeader;