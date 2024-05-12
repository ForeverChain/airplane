import React from "react";
import AccountContentHeader from "../AccountContentHeader";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
  return (
    <div className="kt-portlet kt-portlet--height-fluid">
      <AccountContentHeader title='Нууц үгээ өөрчлөх' subtitle='Акоунтын нууц үгээ өөрчлөх эсвэл шинэчлэх'/>
      <ChangePasswordForm/>
    </div>
  );
};

export default ChangePassword;
