import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';

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


function PatientLogin() {
    const navigate = useNavigate();
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
    const [fullName, setFullName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [genderError, setGenderError] = useState("");

    useEffect(() => {
        // This handles the user session after they click the password reset link
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setStep('reset');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Password validation checks
    const hasLetter = /[A-Za-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
    const has8Chars = newPassword.length >= 8;
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        
        let isValid = true;
        if (email.trim() === "") {
            setEmailError("Email address is required.");
            isValid = false;
        }
        if (password.trim() === "") {
            setPasswordError("Password is required.");
            isValid = false;
        }

        if (isValid) {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });
                if (error) throw error;
                navigate('/dashboard');
            } catch (error) {
                setPasswordError(error.message);
            }
        }
    };

    const handleSendLink = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const trimmedEmail = email.trim();

        if (trimmedEmail === "") {
            setEmailError("Email address is required.");
        } else if (!emailRegex.test(trimmedEmail)) {
            setEmailError("Invalid email format.");
        } else {
            setEmailError("");
            try {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin, // Redirects back to your app
                });
                if (error) throw error;
                setStep("linkSent");
            } catch (error) {
                setEmailError(error.message);
            }
        }
    };

    const handleResend = () => {
        setIsResent(true);
        setTimeout(() => setIsResent(false), 2000);
    };
    
    const handleSignupContinue = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const trimmedEmail = email.trim();
        
        if (trimmedEmail === "") {
            setEmailError("Email is required.");
        } else if (!emailRegex.test(trimmedEmail)) {
            setEmailError("Invalid email format.");
        } else {
            setEmailError("");
            setStep("createPassword");
        }
    };

    const handleCreatePassword = (e) => {
        e.preventDefault();
        setNewPasswordError("");
        setConfirmPasswordError("");

        let isValid = true;

        if (newPassword.trim() === "") {
            setNewPasswordError("Password is required.");
            isValid = false;
        } else if (!hasLetter || !hasNumber || !hasSpecial || !has8Chars) {
            setNewPasswordError("Password does not meet all requirements.");
            isValid = false;
        }

        if (confirmPassword.trim() === "") {
            setConfirmPasswordError("Confirming password is required.");
            isValid = false;
        }

        else if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        }
        if (isValid) {
            setStep("profileDetails"); 
        }
    };

    const handleProfileContinue = async (e) => {
        e.preventDefault();
        setFullNameError("");
        setDateOfBirthError("");
        setGenderError("");

        let isValid = true;
        const nameRegex = /^[A-Za-z\s]+$/; 

        if (fullName.trim() === "") {
            setFullNameError("Full Name is required.");
            isValid = false;
        } 
        else if (!nameRegex.test(fullName)) { 
            setFullNameError("Name can only contain letters.");
            isValid = false;
        }
        
        if (dateOfBirth.trim() === "") {
            setDateOfBirthError("Date of Birth is required.");
            isValid = false;
        }
        if (gender.trim() === "") {
            setGenderError("Gender is required.");
            isValid = false;
        }

        if (isValid) {
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: newPassword, // Using newPassword from previous step
                    options: {
                        data: {
                            full_name: fullName,
                            date_of_birth: dateOfBirth,
                            gender: gender,
                            role: 'patient'
                        }
                    }
                });
                if (error) throw error;
                alert("Signup successful! Please check your email for a verification link.");
                setStep("login");
            } catch (error) {
                // If the error is about an existing user, we can guide them.
                if (error.message.includes("User already registered")) {
                    setFullNameError("A user with this email already exists. Please log in.");
                } else {
                    setFullNameError(error.message);
                }
            }
        }
    };

    const handleResetPassword = async (e) => {
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
            try {
                const { error } = await supabase.auth.updateUser({ password: newPassword });
                if (error) throw error;
                setStep("resetSuccess");
            } catch (error) {
                setNewPasswordError(error.message);
            } finally {
                setNewPassword("");
                setConfirmPassword("");
                setIsPasswordFocused(false);
            }
        }
    };
    
    const clearAllErrors = () => {
        setEmailError("");
        setPasswordError("");
        setNewPasswordError("");
        setConfirmPasswordError("");
    };

    const renderRightPanelContent = () => {
        switch (step) {
            case "login":
                return (
                    <div style={styles.formContainer}>
                        <h2 style={styles.title}>Log in to Patient Portal</h2>
                        <p style={styles.subheading}>One portal for all your healthcare needs.</p>
                        <form style={styles.form} onSubmit={handleLogin}>
                            <div>
                                <input type="email" placeholder="Email" value={email} style={{ ...styles.input, ...(emailError && styles.inputError) }} onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError(""); }} />
                                {emailError && (
                                    <div style={{...styles.errorContainer, marginTop: '8px'}}>
                                        <ErrorIcon />
                                        <p style={styles.errorText}>{emailError}</p>
                                    </div>
                                )}
                            </div>
                             <div>
                                <input type="password" placeholder="Password" value={password} style={{ ...styles.input, ...(passwordError && styles.inputError) }} onChange={(e) => { setPassword(e.target.value); if(passwordError) setPasswordError(""); }}/>
                                {passwordError && (
                                    <div style={{...styles.errorContainer, marginTop: '8px'}}>
                                        <ErrorIcon />
                                        <p style={styles.errorText}>{passwordError}</p>
                                    </div>
                                )}
                            </div>
                            <button style={styles.button} type="submit">Log in</button>
                        </form>
                        <p style={styles.link} onClick={() => { clearAllErrors(); setStep("forgot"); }}>Forgot Password?</p>
                        <p style={{ fontSize: "13px", color: '#6c757d' }}>Don’t have an account?{" "}
                            <span style={styles.link} onClick={() => { clearAllErrors(); setStep("signup"); }}>Create one now</span>
                        </p>
                    </div>
                );
            case "signup":
                return (
                    <div style={styles.formContainer}>
                        <h2 style={styles.title}>Create an account</h2>
                        <p style={styles.subheading}>Enter your email address to create your account and start your journey with MediCore.</p>
                        <form style={styles.form} onSubmit={handleSignupContinue}>
                            <input type="email" placeholder="Email" value={email} style={{ ...styles.input, ...(emailError && styles.inputError) }} onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError(""); }} />
                            {emailError && (
                                <div style={styles.errorContainer}>
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
                            <button style={styles.socialButton}><img src="https://www.google.com/favicon.ico" alt="Google" style={{width: '20px'}}/></button>
                            <button style={styles.socialButton}><img src="https://static.xx.fbcdn.net/rsrc.php/yv/r/B8VkVNaeNs-.ico" alt="Facebook" style={{width: '20px'}}/></button>
                            <button style={styles.socialButton}><img src="https://www.apple.com/favicon.ico" alt="Apple" style={{width: '20px'}}/></button>
                            <button style={styles.socialButton}><img src="https://www.microsoft.com/favicon.ico" alt="Microsoft" style={{width: '20px'}}/></button>
                        </div>
                        <p style={styles.termsText}>By continuing you agree to Medicore's <span style={{...styles.link, marginTop: 0}}>Terms of Service</span> and acknowledge you've read our <span style={{...styles.link, marginTop: 0}}>Privacy Policy</span>.</p>
                        <p style={{ fontSize: "13px", color: '#6c757d' }}>Already have an account?{" "}
                            <span style={styles.link} onClick={() => { clearAllErrors(); setStep("login"); }}>Log in</span>
                        </p>
                    </div>
                );
            case "createPassword":
                return (
                    <div style={styles.formContainer}>
                        <h2 style={styles.title}>Create an account</h2>
                        <p style={styles.subheading}>Set a secure password for your Patient Portal.</p>
                        <div style={styles.arrowProgressBarContainer}>
                            <div style={styles.backButtonContainer} onClick={() => setStep("signup")}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div style={styles.progressBar}>
                                <div style={styles.progressSegmentFilled}></div>
                                <div style={styles.progressSegmentEmpty}></div>
                                <div style={styles.progressSegmentEmpty}></div>
                            </div>
                        </div>
                        <form style={styles.form} onSubmit={handleCreatePassword}>
                            <div style={styles.inputGroup}>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Password"
                                        style={{ ...styles.input, ...(newPasswordError && styles.inputError) }}
                                        value={newPassword}
                                        onChange={(e) => { setNewPassword(e.target.value); if (newPasswordError) setNewPasswordError(""); }}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setTimeout(() => setIsPasswordFocused(false), 200)}
                                    />
                                    <span style={styles.show} onClick={() => setShowNewPassword(!showNewPassword)}>
                                        {showNewPassword ? "Hide" : "Show"}
                                    </span>
                                </div>
                                {isPasswordFocused && (
                                    <div style={styles.passwordRulesContainer}>
                                        <p style={styles.rulesTitle}>Your password must contain at least</p>
                                        <ul style={styles.passwordRules}>
                                            <li style={styles.ruleItem}>
                                                <span style={{...styles.bullet, ...(hasLetter ? styles.bulletMet : styles.bulletNotMet)}}>{hasLetter && <CheckmarkIcon />}</span>
                                                <span style={{color: hasLetter ? '#2D706E' : '#D94C4C'}}>1 letter</span>
                                            </li>
                                            <li style={styles.ruleItem}>
                                                <span style={{...styles.bullet, ...(hasNumber ? styles.bulletMet : styles.bulletNotMet)}}>{hasNumber && <CheckmarkIcon />}</span>
                                                <span style={{color: hasNumber ? '#2D706E' : '#D94C4C'}}>1 number</span>
                                            </li>
                                            <li style={styles.ruleItem}>
                                                <span style={{...styles.bullet, ...(hasSpecial ? styles.bulletMet : styles.bulletNotMet)}}>{hasSpecial && <CheckmarkIcon />}</span>
                                                <span style={{color: hasSpecial ? '#2D706E' : '#D94C4C'}}>1 Special character</span>
                                            </li>
                                            <li style={styles.ruleItem}>
                                                <span style={{...styles.bullet, ...(has8Chars ? styles.bulletMet : styles.bulletNotMet)}}>{has8Chars && <CheckmarkIcon />}</span>
                                                <span style={{color: has8Chars ? '#2D706E' : '#D94C4C'}}>8 characters</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                {newPasswordError && (
                                    <div style={styles.errorContainer}>
                                        <ErrorIcon />
                                        <p style={styles.errorText}>{newPasswordError}</p>
                                    </div>
                                )}
                            </div>
                            <div style={styles.inputGroup}>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        style={{ ...styles.input, ...(confirmPasswordError && styles.inputError) }}
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); if (confirmPasswordError) setConfirmPasswordError(""); }}
                                    />
                                    <span style={styles.show} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </span>
                                </div>
                                {confirmPasswordError && (
                                    <div style={styles.errorContainer}>
                                        <ErrorIcon />
                                        <p style={styles.errorText}>{confirmPasswordError}</p>
                                    </div>
                                )}
                            </div>
                            <button style={styles.button} type="submit">Continue</button>
                        </form>
                    </div>
                );
            case "profileDetails":
                return (
                    <div style={styles.formContainer}>
                        <h2 style={styles.title}>Create an account</h2>
                        <p style={styles.subheading}>Add your details to customize your Patient Portal.</p>
                        <div style={styles.arrowProgressBarContainer}>
                            <div style={styles.backButtonContainer} onClick={() => setStep("createPassword")}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div style={styles.progressBar}>
                                <div style={styles.progressSegmentFilled}></div>
                                <div style={styles.progressSegmentFilled}></div>
                                <div style={styles.progressSegmentEmpty}></div>
                            </div>
                        </div>
                        <form style={styles.form} onSubmit={handleProfileContinue}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    style={{ ...styles.input, ...(fullNameError && styles.inputError) }}
                                    value={fullName}
                                    onChange={(e) => { setFullName(e.target.value); if(fullNameError) setFullNameError(""); }}
                                />
                                {fullNameError && (
                                    <div style={{ ...styles.errorContainer, marginTop: '8px' }}>
                                        <ErrorIcon />
                                        <p style={styles.errorText}>{fullNameError}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    type="date"
                                    placeholder="Date of Birth"
                                    style={{ ...styles.input, ...(dateOfBirthError && styles.inputError) }}
                                    value={dateOfBirth}
                                    onChange={(e) => { setDateOfBirth(e.target.value); if(dateOfBirthError) setDateOfBirthError(""); }}
                                />
                                {dateOfBirthError && (
                                    <div style={{ ...styles.errorContainer, marginTop: '8px' }}>
                                        <ErrorIcon />
                                        <p style={styles.errorText}>{dateOfBirthError}</p>
                                    </div>
                                )}
                            </div>
                            <p style={styles.genderLabel}>Gender</p>
                            <div style={styles.genderGroup}>
                                <label style={{...styles.genderBox, ...(gender === "Male" && styles.genderBoxSelected), ...(genderError && styles.genderBoxError)}} onClick={() => { setGender("Male"); if(genderError) setGenderError(""); }}>
                                    <input type="radio" name="gender" value="Male" checked={gender === "Male"} style={styles.radioInput} readOnly /> Male
                                </label>
                                <label style={{...styles.genderBox, ...(gender === "Female" && styles.genderBoxSelected), ...(genderError && styles.genderBoxError)}} onClick={() => { setGender("Female"); if(genderError) setGenderError(""); }}>
                                    <input type="radio" name="gender" value="Female" checked={gender === "Female"} style={styles.radioInput} readOnly /> Female
                                </label>
                                <label style={{...styles.genderBox, ...(gender === "Other" && styles.genderBoxSelected), ...(genderError && styles.genderBoxError)}} onClick={() => { setGender("Other"); if(genderError) setGenderError(""); }}>
                                    <input type="radio" name="gender" value="Other" checked={gender === "Other"} style={styles.radioInput} readOnly /> Other
                                </label>
                            </div>
                            {genderError && (
                                <div style={{ ...styles.errorContainer, marginTop: '8px' }}>
                                    <ErrorIcon />
                                    <p style={styles.errorText}>{genderError}</p>
                                </div>
                            )}
                            <button style={styles.button} type="submit">Continue</button>
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
                        <button style={styles.openButton} onClick={() => { window.open(`mailto:${email}`, '_blank'); }}>Open Email</button>
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
                                    <p style={styles.rulesTitle}>Your password must contain at least</p>
                                    <ul style={styles.passwordRules}>
                                        <li style={styles.ruleItem}>
                                            <span style={{...styles.bullet, ...(hasLetter ? styles.bulletMet : styles.bulletNotMet)}}>{hasLetter && <CheckmarkIcon />}</span>
                                            <span style={{color: hasLetter ? '#2D706E' : '#D94C4C'}}>1 letter</span>
                                        </li>
                                        <li style={styles.ruleItem}>
                                            <span style={{...styles.bullet, ...(hasNumber ? styles.bulletMet : styles.bulletNotMet)}}>{hasNumber && <CheckmarkIcon />}</span>
                                            <span style={{color: hasNumber ? '#2D706E' : '#D94C4C'}}>1 number</span>
                                        </li>
                                        <li style={styles.ruleItem}>
                                            <span style={{...styles.bullet, ...(hasSpecial ? styles.bulletMet : styles.bulletNotMet)}}>{hasSpecial && <CheckmarkIcon />}</span>
                                            <span style={{color: hasSpecial ? '#2D706E' : '#D94C4C'}}>1 Special character</span>
                                        </li>
                                        <li style={styles.ruleItem}>
                                            <span style={{...styles.bullet, ...(has8Chars ? styles.bulletMet : styles.bulletNotMet)}}>{has8Chars && <CheckmarkIcon />}</span>
                                            <span style={{color: has8Chars ? '#2D706E' : '#D94C4C'}}>8 characters</span>
                                        </li>
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
                <img src="image.png" alt="stethoscope" style={{ width: "90%", margin: "20px 0", maxWidth: '400px' }} />
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
    errorContainer: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', alignSelf: 'flex-start', paddingLeft: '10px' },
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

    // --- PASSWORD RESET RULES ---
    passwordRulesContainer: { textAlign: "left", width: "100%", padding: '0 10px', marginTop: '-10px', marginBottom: '10px' },
    rulesTitle: { fontSize: '13px', color: '#333', marginBottom: '8px', fontWeight: 'normal' },
    passwordRules: { padding: "0", listStyleType: "none", display: 'flex', flexDirection: 'column', gap: '4px' },
    ruleItem: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' },
    bullet: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px', borderRadius: '50%', boxSizing: 'border-box', transition: 'all 0.2s ease-in-out' },
    bulletNotMet: { border: '1px solid #D94C4C', backgroundColor: 'white' },
    bulletMet: { border: '1px solid #2D706E', backgroundColor: '#2D706E' }, 
    
    // --- PASSWORD CREATE NEW STYLES ---
    arrowProgressBarContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: '10px',
        marginBottom: '20px',
    },
    backButtonContainer: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
    },
    progressBar: {
        display: 'flex',
        gap: '4px',
        flex: 1,
        height: '6px',
    },
    progressSegmentFilled: {
        height: '6px',
        flex: 1,
        backgroundColor: '#2D706E',
        borderRadius: '3px',
    },
    progressSegmentEmpty: {
        height: '6px',
        flex: 1,
        backgroundColor: '#EAF3F3',
        borderRadius: '3px',
    },

// Add these new styles
genderLabel: {
    fontSize: '14px',
    color: '#6c757d',
    alignSelf: 'flex-start',
    marginBottom: '10px',
    paddingLeft: '10px',
},
genderGroup: {
    display: 'flex',
    gap: '16px',
    width: '100%',
},
genderBox: {
    border: '1px solid #A8B5C6',
    borderRadius: '25px',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flex: 1,
    justifyContent: 'center',
    fontSize: '14px',
    color: '#333',
    transition: 'all 0.2s ease',
},
genderBoxSelected: {
    borderColor: '#2D706E',
},
genderBoxError: {
    borderColor: '#D94C4C',
},
radioInput: {
    marginRight: '8px',
    accentColor: '#2D706E',
    cursor: 'pointer',
},
    
    // --- CAROUSEL DOTS ---
    carouselDots: { display: 'flex', gap: '10px' },
    dot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.4)', transition: 'all 0.3s ease' },
    dotActive: { backgroundColor: 'white', width: '24px', borderRadius: '4px', },
};

export default PatientLogin;

