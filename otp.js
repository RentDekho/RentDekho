// otp.js
import { auth, RecaptchaVerifier } from "./firebase.js";
import { signInWithPhoneNumber } from "firebase/auth";

window.sendOTP = function() {
  const phoneNumber = document.getElementById('phoneNumber').value;
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {size: 'invisible'}, auth);

  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert("Error sending OTP: " + error.message);
    });
}

window.verifyOTP = function() {
  const otp = document.getElementById('otp').value;
  if (!window.confirmationResult) return alert("Please send OTP first!");

  window.confirmationResult.confirm(otp)
    .then((result) => {
      alert("Login successful! Welcome " + result.user.phoneNumber);
    })
    .catch((error) => {
      console.error(error);
      alert("Invalid OTP!");
    });
}
