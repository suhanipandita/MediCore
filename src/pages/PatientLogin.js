import React, { useState, useEffect } from "react";

// --- PROGRESS BAR COMPONENT ---
const ProgressBar = ({ currentStep, totalSteps }) => {
    const percentage = (currentStep / totalSteps) * 100;
    return (
        <div style={styles.progressContainer}>
            <p style={styles.progressText}>Step {currentStep} of {totalSteps}</p>
            <div style={styles.progressBarBackground}>
                <div style={{ ...styles.progressBarFill, width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

// --- SOCIAL LOGIN ICONS ---
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
        <path fill="white" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.28,5 12.15,5C14.73,5 16.71,6.7 17.35,7.39L19.41,5.34C17.43,3.46 15,2 12.15,2C6.92,2 2.72,6.56 2.72,12C2.72,17.44 6.92,22 12.15,22C17.6,22 21.54,18.22 21.54,12.81C21.54,12.13 21.48,11.57 21.35,11.1Z"/>
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
        <path fill="white" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17,7H15A1,1 0 0,0 14,8V10H16L15.5,12H14V17H11V12H9V10H11V7.5C11,5.56 12.57,4 14.5,4H17V7Z"/>
    </svg>
);

const AppleIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
        <path fill="white" d="M19.2,12.39C19.2,10.86 20.37,9.91 20.5,9.85C19.33,8.32 17.69,8.03 17.15,8C15.5,7.76 14.06,8.78 13.44,8.78C12.82,8.78 11.25,7.79 9.88,8.06C8.31,8.36 6.87,9.32 6,10.93C4.1,14.2 5.46,18.5 7.41,20.42C8.32,21.33 9.42,22.04 10.73,21.95C12.04,21.86 12.59,21.08 14.23,21.08C15.86,21.08 16.38,21.83 17.74,21.95C19.05,22.07 20.08,21.36 20.93,20.42C21.28,20.04 21.6,19.58 21.85,19.06C19.93,17.89 19.31,15.22 19.2,12.39M12.09,4.45C12.91,3.54 13.92,3 15,3C15.15,3.61 14.96,4.28 14.5,4.82C13.82,5.6 12.84,6.04 11.85,6C11.72,5.33 11.89,4.68 12.09,4.45Z" />
    </svg>
);

const MicrosoftIcon = () => (
    <svg viewBox="0 0 21 21" style={{ width: '18px', height: '18px' }}>
        <path fill="#F25022" d="M1 1H10V10H1V1z"/>
        <path fill="#7FBA00" d="M11 1H20V10H11V1z"/>
        <path fill="#00A4EF" d="M1 11H10V20H1V11z"/>
        <path fill="#FFB900" d="M11 11H20V20H11V11z"/>
    </svg>
);

// Helper component for the checkmark SVG icon
const CheckmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="12px" height="12px">
    <path d="M9.55 18l-5-5 1.45-1.45L9.55 15.1l7.05-7.05L18 9.55z" />
  </svg>
);

// Helper component for the "Email Sent" SVG icon
const EmailSentIcon = () => (
  <div style={styles.iconContainer}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.25 12C21.25 17.108 17.108 21.25 12 21.25C6.892 21.25 2.75 17.108 2.75 12C2.75 6.892 6.892 2.75 12 2.75C17.108 2.75 21.25 6.892 21.25 12Z" stroke="#2D706E" strokeWidth="1.5" />
      <path d="M16 9.5L13.25 11.625C12.558 12.158 11.442 12.158 10.75 11.625L8 9.5M16.5 14.5H7.5C7.224 14.5 7 14.276 7 14V8.5C7 8.224 7.224 8 7.5 8H16.5C16.776 8 17 8.224 17 8.5V14C17 14.276 16.776 14.5 16.5 14.5Z" stroke="#2D706E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Helper component for the "Password Reset Successful" SVG icon
const PasswordSuccessIcon = () => (
    <div style={styles.iconContainer}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.6C12 21.6 19.2 18 19.2 12V6L12 3.6L4.8 6V12C4.8 18 12 21.6 12 21.6Z" fill="#2D706E"/>
            <path d="M10.875 14.313L8.562 12L7.5 13.062L10.875 16.437L16.5 10.812L15.438 9.75L10.875 14.313Z" fill="white"/>
        </svg>
    </div>
);

// Helper component for the error icon
const ErrorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#D94C4C"/>
    </svg>
);

// Mock user database
const MOCK_USERS = {
    'patient@medicore.com': { password: 'Password123#' },
    'user@example.com': { password: 'password123' },
};


function AuthScreen() {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResent, setIsResent] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_SECONDS = 15;

  useEffect(() => {
    let timer;
    if (lockoutTime > 0) {
      timer = setTimeout(() => setLockoutTime(lockoutTime - 1), 1000);
    } else if (lockoutTime === 0 && loginAttempts >= MAX_ATTEMPTS) {
      setLoginAttempts(0); // Reset attempts after lockout
    }
    return () => clearTimeout(timer);
  }, [lockoutTime, loginAttempts]);

  // Password validation checks
  const hasLetter = /[A-Za-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const has8Chars = newPassword.length >= 8;
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (lockoutTime > 0) return;

    setEmailError("");
    setPasswordError("");
    
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail === "") {
        setEmailError("Email address is required.");
        isValid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
        setEmailError("Invalid email format.");
        isValid = false;
    }

    if (password.trim() === "") {
        setPasswordError("Password is required.");
        isValid = false;
    }
    
    if (isValid) {
        const user = MOCK_USERS[trimmedEmail];
        if (!user || user.password !== password) {
            setPasswordError("Incorrect password.");
            const newAttempts = loginAttempts + 1;
            setLoginAttempts(newAttempts);
            if (newAttempts >= MAX_ATTEMPTS) {
                setLockoutTime(LOCKOUT_SECONDS);
            }
        } else {
            alert(`Login Successful! Welcome, ${email}`);
            setLoginAttempts(0);
        }
    }
  };

  const handleSendLink = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim();

    if (trimmedEmail === "") {
        setEmailError("Email address is required.");
    } else if (!emailRegex.test(trimmedEmail)) {
        setEmailError("Invalid email format.");
    } else {
        setEmailError("");
        setStep("linkSent");
    }
  };

  const handleResend = () => {
    setIsResent(true);
    setTimeout(() => setIsResent(false), 2000);
  };
  
  const handleSignupContinue = (e) => {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const trimmedEmail = email.trim().toLowerCase();
      
      if (trimmedEmail === "") {
          setEmailError("Email is required.");
      } else if (!emailRegex.test(trimmedEmail)) {
          setEmailError("Invalid email format.");
      } else if (MOCK_USERS[trimmedEmail]) {
          setEmailError("This email is already registered.");
      } else {
          setEmailError("");
          setStep("signupPassword"); // --- UPDATED ---
      }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setNewPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (newPassword.trim() === "") {
        setNewPasswordError("New Password is required.");
        isValid = false;
    }
    if (confirmPassword.trim() === "") {
        setConfirmPasswordError("Confirming New Password is required.");
        isValid = false;
    }
    
    if (isValid && newPassword.trim() !== "") {
        if (!hasLetter || !hasNumber || !hasSpecial || !has8Chars) {
            setNewPasswordError("Password does not meet all requirements.");
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        }
    }

    if (isValid) {
        alert(`Account created for ${email}!`);
        // Here you would typically add the user to your database
        // For this demo, we'll just navigate to the login page
        clearAllErrors();
        setStep("login");
    }
  };
  
  const clearAllErrors = () => {
      setEmailError("");
      setPasswordError("");
      setNewPasswordError("");
      setConfirmPasswordError("");
  };

  const renderRightPanelContent = () => {
    const isLocked = lockoutTime > 0;
    const lockoutMessage = `Too many failed attempts. Try again in 00:${lockoutTime.toString().padStart(2, '0')}`;

    switch (step) {
      case "login":
        return (
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Log in to Patient Portal</h2>
            <p style={styles.subheading}>One portal for all your healthcare needs.</p>
            <form style={styles.form} onSubmit={handleLogin}>
              <div>
                <input type="email" placeholder="Email" style={{ ...styles.input, ...(emailError && styles.inputError) }} onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError(""); }} disabled={isLocked} />
                {emailError && (
                    <div style={{...styles.errorContainer, marginTop: '8px'}}>
                        <ErrorIcon />
                        <p style={styles.errorText}>{emailError}</p>
                    </div>
                )}
              </div>
               <div>
                <div style={{ position: 'relative' }}>
                    <input type={showPassword ? "text" : "password"} placeholder="Password" style={{ ...styles.input, ...(passwordError && styles.inputError) }} onChange={(e) => { setPassword(e.target.value); if(passwordError) setPasswordError(""); }} disabled={isLocked} />
                    {!isLocked && <span style={styles.show} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>}
                </div>
                {passwordError && !isLocked && (
                    <div style={{...styles.errorContainer, marginTop: '8px'}}>
                        <ErrorIcon />
                        <p style={styles.errorText}>{passwordError}</p>
                    </div>
                )}
              </div>

              {isLocked && (
                  <div style={{...styles.errorContainer, justifyContent: 'center', marginTop: '8px'}}>
                      <ErrorIcon />
                      <p style={styles.errorText}>{lockoutMessage}</p>
                  </div>
              )}
              
              <button style={{...styles.button, ...(isLocked && styles.buttonDisabled)}} type="submit" disabled={isLocked}>Log in</button>
            </form>
             <div style={styles.separator}>
                <span style={{ color: '#aaa' }}>Log in with</span>
            </div>
            <div style={styles.socialLoginContainer}>
                <button style={styles.socialButton}><GoogleIcon /></button>
                <button style={styles.socialButton}><FacebookIcon /></button>
                <button style={styles.socialButton}><AppleIcon /></button>
                <button style={styles.socialButton}><MicrosoftIcon /></button>
            </div>
            <p style={styles.link} onClick={() => { if (!isLocked) { clearAllErrors(); setStep("forgot"); } }}>Forgot Password?</p>
            <p style={{ fontSize: "13px", color: '#6c757d' }}>Don’t have an account?{" "}
              <span style={styles.link} onClick={() => { if (!isLocked) { clearAllErrors(); setStep("signup"); } }}>Create one now</span>
            </p>
          </div>
        );
      case "signup":
        return (
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Create an account</h2>
                <p style={styles.subheading}>Enter your email address to create your account and start your journey with MediCore.</p>
                <form style={styles.form} onSubmit={handleSignupContinue}>
                    <input type="email" placeholder="Email" style={{ ...styles.input, ...(emailError && styles.inputError) }} onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError(""); }} />
                    {emailError && (
                        <div style={{...styles.errorContainer, marginTop: '8px'}}>
                            <ErrorIcon />
                            <p style={styles.errorText}>{emailError}</p>
                        </div>
                    )}
                    <button style={{...styles.button, marginTop: emailError ? '0px' : '20px'}} type="submit">Continue</button>
                </form>
                <div style={styles.separator}>
                    <div style={styles.line}></div>
                    <span style={{ padding: '0 10px', color: '#aaa' }}>Continue with</span>
                    <div style={styles.line}></div>
                </div>
                <div style={styles.socialLoginContainer}>
                    <button style={styles.socialButton}><GoogleIcon /></button>
                    <button style={styles.socialButton}><FacebookIcon /></button>
                    <button style={styles.socialButton}><AppleIcon /></button>
                    <button style={styles.socialButton}><MicrosoftIcon /></button>
                </div>
                <p style={styles.termsText}>By continuing you agree to Medicore's <span style={{...styles.link, marginTop: 0}}>Terms of Service</span> and acknowledge you've read our <span style={{...styles.link, marginTop: 0}}>Privacy Policy</span>.</p>
                <p style={{ fontSize: "13px", color: '#6c757d' }}>Already have an account?{" "}
                  <span style={styles.link} onClick={() => { clearAllErrors(); setStep("login"); }}>Log in</span>
                </p>
            </div>
        );
    case "signupPassword":
        return (
          <div style={styles.formContainer}>
            <ProgressBar currentStep={2} totalSteps={2} />
            <h2 style={styles.title}>Create an account</h2>
            <p style={styles.subheading}>Set a secure password for your patient portal.</p>
            <form style={styles.form} onSubmit={handleCreateAccount}>
              <div>
                <div style={{ position: "relative" }}>
                  <input type={showNewPassword ? "text" : "password"} placeholder="New Password" style={{ ...styles.input, ...(newPasswordError && styles.inputError) }} value={newPassword} onChange={(e) => { setNewPassword(e.target.value); if (newPasswordError) setNewPasswordError(""); }} onFocus={() => setIsPasswordFocused(true)} />
                  <span style={styles.show} onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? "Hide" : "Show"}</span>
                </div>
                {newPasswordError && (
                    <div style={{...styles.errorContainer, marginTop: '8px'}}>
                        <ErrorIcon />
                        <p style={styles.errorText}>{newPasswordError}</p>
                    </div>
                )}
              </div>

              {isPasswordFocused && !newPasswordError && (
                <div style={styles.passwordRulesContainer}>
                  <p style={styles.rulesTitle}>Your password must contain atleast</p>
                  <ul style={styles.passwordRules}>
                    <li style={styles.ruleItem}><span style={{...styles.bullet, ...(hasLetter ? styles.bulletMet : styles.bulletNotMet)}}>{hasLetter && <CheckmarkIcon />}</span><span style={{color: hasLetter ? '#2D706E' : '#555'}}>1 letter</span></li>
                    <li style={styles.ruleItem}><span style={{...styles.bullet, ...(hasNumber ? styles.bulletMet : styles.bulletNotMet)}}>{hasNumber && <CheckmarkIcon />}</span><span style={{color: hasNumber ? '#2D706E' : '#555'}}>1 number</span></li>
                    <li style={styles.ruleItem}><span style={{...styles.bullet, ...(hasSpecial ? styles.bulletMet : styles.bulletNotMet)}}>{hasSpecial && <CheckmarkIcon />}</span><span style={{color: hasSpecial ? '#2D706E' : '#555'}}>1 Special character</span></li>
                    <li style={styles.ruleItem}><span style={{...styles.bullet, ...(has8Chars ? styles.bulletMet : styles.bulletNotMet)}}>{has8Chars && <CheckmarkIcon />}</span><span style={{color: has8Chars ? '#2D706E' : '#555'}}>8 characters</span></li>
                  </ul>
                </div>
              )}

              <div>
                <div style={{ position: "relative" }}>
                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm New Password" style={{ ...styles.input, ...(confirmPasswordError && styles.inputError) }} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); if (confirmPasswordError) setConfirmPasswordError(""); }} />
                    <span style={styles.show} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "Hide" : "Show"}</span>
                </div>
                 {confirmPasswordError && (
                    <div style={{...styles.errorContainer, marginTop: '8px'}}>
                        <ErrorIcon />
                        <p style={styles.errorText}>{confirmPasswordError}</p>
                    </div>
                )}
              </div>
              <button style={styles.button} type="submit">Create Account</button>
            </form>
          </div>
        );
      case "forgot":
        return (
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Reset Password</h2>
            <p style={styles.subheading}>Enter your email to receive a password reset link.</p>
            <form style={styles.form} onSubmit={handleSendLink}>
              <input type="email" placeholder="Email" style={{ ...styles.input, ...(emailError && styles.inputError) }} value={email} onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError(""); }} />
              {emailError && (
                  <div style={{...styles.errorContainer, marginTop: '8px'}}>
                      <ErrorIcon />
                      <p style={styles.errorText}>{emailError}</p>
                  </div>
              )}
              <button style={{...styles.button, marginTop: emailError ? '0px' : '20px'}} type="submit">Send Link</button>
            </form>
            <p style={styles.link} onClick={() => { clearAllErrors(); setStep("login"); }}>Back to Login</p>
          </div>
        );
      case "linkSent":
        return (
          <div style={styles.emailSentBox}>
            <EmailSentIcon />
            <h2 style={styles.emailSentTitle}>Email Sent</h2>
            <p style={styles.description}>An email with password reset link has been sent to <b>{email}</b>. Open it to reset your password.</p>
            <button style={styles.openButton} onClick={() => { setStep("reset"); setIsPasswordFocused(false); }}>Open Email</button>
            <p style={styles.resendText}>Didn’t receive email?{" "}
              <span style={styles.resendLink} onClick={handleResend}>Resend Email</span>
            </p>
            {isResent && <p style={styles.feedback}>Email resent successfully!</p>}
          </div>
        );
      case "reset":
        return (
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Create a New Password</h2>
            <p style={styles.subheading}>Enter and confirm your new password to regain access to your Patient Portal.</p>
            <form style={styles.form} onSubmit={handleResetPassword}>
              <div>
                <div style={{ position: "relative" }}>
                  <input type={showNewPassword ? "text" : "password"} placeholder="New Password" style={{ ...styles.input, ...(newPasswordError && styles.inputError) }} value={newPassword} onChange={(e) => { setNewPassword(e.target.value); if (newPasswordError) setNewPasswordError(""); }} onFocus={() => setIsPasswordFocused(true)} />
                  <span style={styles.show} onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? "Hide" : "Show"}</span>
                </div>
                {newPasswordError && (
                    <div style={{...styles.errorContainer, marginTop: '8px'}}>
                        <ErrorIcon />
                        <p style={styles.errorText}>{newPasswordError}</p>
                    </div>
                )}
              </div>

              {isPasswordFocused && !newPasswordError && (
                <div style={styles.passwordRulesContainer}>
                  <p style={styles.rulesTitle}>Your password must contain atleast</p>
                  <ul style={styles.passwordRules}>
                    <li style={styles.ruleItem}><span style={{...styles.bullet, ...(hasLetter ? styles.bulletMet : styles.bulletNotMet)}}>{hasLetter && <CheckmarkIcon />}</span><span style={{color: hasLetter ? '#2D706E' : '#555'}}>1 letter</span></li>
                    <li style={styles.ruleItem}><span style={{...styles.bullet, ...(hasNumber ? styles.bulletMet : styles.bulletNotMet)}}>{hasNumber && <CheckmarkIcon />}</span><span style={{color: hasNumber ? '#2D706E' : '#555'}}>1 number</span></li>
                    <li style={styles.ruleItem}><span style={{...styles.bullet, ...(hasSpecial ? styles.bulletMet : styles.bulletNotMet)}}>{hasSpecial && <CheckmarkIcon />}</span><span style={{color: hasSpecial ? '#2D706E' : '#555'}}>1 Special character</span></li>
                    <li style={styles.ruleItem}><span style={{...styles.bullet, ...(has8Chars ? styles.bulletMet : styles.bulletNotMet)}}>{has8Chars && <CheckmarkIcon />}</span><span style={{color: has8Chars ? '#2D706E' : '#555'}}>8 characters</span></li>
                  </ul>
                </div>
              )}

              <div>
                <div style={{ position: "relative" }}>
                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm New Password" style={{ ...styles.input, ...(confirmPasswordError && styles.inputError) }} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); if (confirmPasswordError) setConfirmPasswordError(""); }} />
                    <span style={styles.show} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "Hide" : "Show"}</span>
                </div>
                 {confirmPasswordError && (
                    <div style={{...styles.errorContainer, marginTop: '8px'}}>
                        <ErrorIcon />
                        <p style={styles.errorText}>{confirmPasswordError}</p>
                    </div>
                )}
              </div>
              <button style={styles.button} type="submit">Reset Password</button>
            </form>
            <p style={styles.link} onClick={() => { clearAllErrors(); setStep("login"); }}>Cancel and go back to Login</p>
          </div>
        );
      case "resetSuccess":
          return (
            <div style={styles.emailSentBox}>
              <PasswordSuccessIcon />
              <h2 style={styles.emailSentTitle}>Password Reset Successful</h2>
              <p style={styles.description}>Your password has been updated. You can now log in with your new credentials.</p>
              <button style={styles.openButton} onClick={() => setStep("login")}>
                Go to Login
              </button>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h2 style={{ color: "white", fontSize: '24px', fontWeight: '600', width: '100%', textAlign: 'left' }}>Medicore</h2>
        <img src="https://i.imgur.com/gYf24bY.png" alt="stethoscope" style={{ width: "90%", margin: "20px 0", maxWidth: '400px' }} />
        <div style={{width: '100%', textAlign: 'left'}}>
            <h3 style={{ color: "white", fontSize: '36px', fontWeight: '600' }}>Smarter Care Starts Here</h3>
            <p style={{ color: "#cfe8e4", maxWidth: '320px', margin: '15px 0', lineHeight: '1.6' }}>MediCore unites patients and professionals — simplifying care, records, and billing.</p>
        </div>
        <div style={{...styles.carouselDots, width: '100%', justifyContent: 'flex-start'}}>
          <span style={{ ...styles.dot, ...styles.dotActive }}></span>
          <span style={styles.dot}></span>
          <span style={styles.dot}></span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        {renderRightPanelContent()}
      </div>
    </div>
  );
}

const styles = {
  // --- LAYOUT & MAIN STYLES ---
  container: { display: "flex", height: "100vh", fontFamily: "'Poppins', sans-serif", backgroundColor: '#f4f7f6', minWidth: '900px' },
  left: { width: "45%", background: "#2D706E", padding: "40px", color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center" },
  right: { width: "55%", background: "white", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" },
  formContainer: { width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  title: { fontSize: "28px", fontWeight: "600", color: "#333", marginBottom: "10px" },
  subheading: { fontSize: "16px", color: "#6c757d", marginBottom: "30px", maxWidth: '350px', lineHeight: '1.6' },

  // --- FORM & BUTTONS ---
  form: { display: "flex", flexDirection: "column", gap: "20px", width: "100%" },
  input: { width: '100%', padding: "15px 20px", border: "1px solid #B2D8D6", borderRadius: "25px", fontSize: "14px", outline: "none", boxSizing: 'border-box' },
  button: { padding: "15px", background: "#2D706E", color: "white", border: "none", borderRadius: "25px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", transition: 'background-color 0.3s' },
  buttonDisabled: { backgroundColor: '#a6c3c2', cursor: 'not-allowed' },
  link: { color: "#2D706E", cursor: "pointer", marginTop: "15px", fontSize: "13px", fontWeight: "bold", textDecoration: 'none' },
  show: { position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#2D706E", cursor: "pointer", fontWeight: "bold" },
  
  // --- VALIDATION ERROR ---
  inputError: { borderColor: '#D94C4C' },
  errorContainer: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-10px', alignSelf: 'flex-start', paddingLeft: '10px' },
  errorText: { color: '#D94C4C', fontSize: '12px', margin: 0 },

  // --- SIGN UP & SOCIAL LOGIN ---
  separator: { display: 'flex', alignItems: 'center', margin: '20px 0', width: '100%' },
  line: { flex: 1, height: '1px', backgroundColor: '#e0e0e0' },
  socialLoginContainer: { display: 'flex', justifyContent: 'center', gap: '20px', width: '100%', marginBottom: '20px' },
  socialButton: { backgroundColor: '#2D706E', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' },
  termsText: { fontSize: '12px', color: '#888', maxWidth: '320px', lineHeight: '1.6', marginBottom: '20px' },
  
  // --- EMAIL SENT & SUCCESS SCREENS ---
  emailSentBox: { maxWidth: "400px", display: "flex", flexDirection: "column", alignItems: "center", },
  iconContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#EAF3F3', marginBottom: '25px' },
  emailSentTitle: { fontSize: "28px", fontWeight: "600", color: "#333", marginBottom: "15px" },
  description: { fontSize: "14px", color: "#6c757d", marginBottom: "30px", lineHeight: '1.7' },
  openButton: { padding: "15px 40px", background: "#2D706E", color: "white", border: "none", borderRadius: "25px", cursor: "pointer", fontSize: "16px", marginBottom: "20px", fontWeight: '500' },
  resendText: { fontSize: "13px", color: "#6c757d" },
  resendLink: { color: "#2D706E", cursor: "pointer", fontWeight: 'bold' },
  feedback: { marginTop: "10px", fontSize: "13px", color: "green" },

  // --- PASSWORD RESET RULES & PROGRESS BAR ---
  progressContainer: { width: '100%', marginBottom: '30px' },
  progressText: { fontSize: '12px', color: '#6c757d', textAlign: 'left', marginBottom: '8px', paddingLeft: '5px' },
  progressBarBackground: { height: '8px', width: '100%', backgroundColor: '#EAF3F3', borderRadius: '4px', overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#2D706E', borderRadius: '4px', transition: 'width 0.5s ease-in-out' },
  passwordRulesContainer: { textAlign: "left", width: "100%", padding: '0 10px', marginTop: '-10px', marginBottom: '10px' },
  rulesTitle: { fontSize: '13px', color: '#333', marginBottom: '8px', fontWeight: 'normal' },
  passwordRules: { padding: "0", listStyleType: "none", display: 'flex', flexDirection: 'column', gap: '4px' },
  ruleItem: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' },
  bullet: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px', borderRadius: '50%', boxSizing: 'border-box', transition: 'all 0.2s ease-in-out' },
  bulletNotMet: { border: '1px solid #B2D8D6', backgroundColor: 'white' },
  bulletMet: { border: '1px solid #2D706E', backgroundColor: '#2D706E' },
  
  // --- CAROUSEL DOTS ---
  carouselDots: { display: 'flex', gap: '10px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.4)', transition: 'all 0.3s ease' },
  dotActive: { backgroundColor: 'white', width: '24px', borderRadius: '4px', },
};

export default AuthScreen;