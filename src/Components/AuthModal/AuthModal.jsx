import React, { useContext, useState, useEffect } from "react";
import { AuthModalContext } from "../../Context/AuthModalContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import ResetAccount from "../ForgetPassword/ResetAccount";
import ResetPassword from "../ForgetPassword/ResetPassword";

export default function AuthModal() {
  const { isOpen, closeModal } = useContext(AuthModalContext);
  const [currentView, setCurrentView] = useState("login"); // login, register, forgetPassword, resetAccount, resetPassword

  // Reset to login view when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView("login");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const resetToLogin = () => {
    setCurrentView("login");
  };

  const handleClose = () => {
    setCurrentView("login"); // Reset view before closing
    closeModal();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body p-4 pt-0">
            {currentView === "login" || currentView === "register" ? (
              <>
                <div className="text-center mb-4">
                  <h3 className="fw-bold mb-3">
                    {currentView === "login" ? "Welcome Back" : "Create Account"}
                  </h3>
                  <div className="d-flex justify-content-center bg-light p-1 rounded-pill">
                    <button
                      className={`btn rounded-pill px-4 flex-grow-1 ${
                        currentView === "login" ? "bg-green-color shadow-sm" : "text-muted"
                      }`}
                      onClick={() => setCurrentView("login")}
                    >
                      Login
                    </button>
                    <button
                      className={`btn rounded-pill px-4 flex-grow-1 ${
                        currentView === "register" ? "bg-green-color shadow-sm" : "text-muted"
                      }`}
                      onClick={() => setCurrentView("register")}
                    >
                      Register
                    </button>
                  </div>
                </div>

                {currentView === "login" ? (
                  <Login isModal={true} onForgetPassword={() => setCurrentView("forgetPassword")} />
                ) : (
                  <Register isModal={true} setIsLoginTab={() => setCurrentView("login")} />
                )}
              </>
            ) : currentView === "forgetPassword" ? (
              <ForgetPassword 
                isModal={true} 
                onSuccess={() => setCurrentView("resetAccount")}
                onBack={resetToLogin}
              />
            ) : currentView === "resetAccount" ? (
              <ResetAccount 
                isModal={true} 
                onSuccess={() => setCurrentView("resetPassword")}
                onBack={resetToLogin}
              />
            ) : (
              <ResetPassword 
                isModal={true} 
                onSuccess={handleClose}
                onBack={resetToLogin}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
