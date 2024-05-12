import React from "react";

const RegistrationWizardHeader = ({ current }) => {
  return (
    <div className="kt-wizard-v3__nav">
      <div className="kt-wizard-v3__nav-items">
        <div
          className="kt-wizard-v3__nav-item"
          data-ktwizard-type="step"
          data-ktwizard-state={current === 0 && "current"}
        >
          <div className="kt-wizard-v3__nav-body">
            <div className="kt-wizard-v3__nav-label">
              <span>1</span> Хувийн мэдээлэл
            </div>
            <div className="kt-wizard-v3__nav-bar" />
          </div>
        </div>
        <div
          className="kt-wizard-v3__nav-item"
          data-ktwizard-type="step"
          data-ktwizard-state={current === 1 && "current"}
        >
          <div className="kt-wizard-v3__nav-body">
            <div className="kt-wizard-v3__nav-label">
              <span>2</span> Нууц үг
            </div>
            <div className="kt-wizard-v3__nav-bar" />
          </div>
        </div>
        <div
          className="kt-wizard-v3__nav-item"
          data-ktwizard-type="step"
          data-ktwizard-state={current === 2 && "current"}
        >
          <div className="kt-wizard-v3__nav-body">
            <div className="kt-wizard-v3__nav-label">
              <span>3</span> Хаяг
            </div>
            <div className="kt-wizard-v3__nav-bar" />
          </div>
        </div>
        <div
          className="kt-wizard-v3__nav-item"
          data-ktwizard-type="step"
          data-ktwizard-state={current === 3 && "current"}
        >
          <div className="kt-wizard-v3__nav-body">
            <div className="kt-wizard-v3__nav-label">
              <span>4</span> Баталгаажуулах
            </div>
            <div className="kt-wizard-v3__nav-bar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizardHeader;
