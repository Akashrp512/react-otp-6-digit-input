import { useState } from "react";
import "./OTPInput.css";

export default function OTPInput() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const focusInput = (index) => {
    document.getElementById(`otp-input-${index}`).focus();
  };

  const handleChange = (e, index) => {
    let value = e.target.value;

    if (/[^0-9]/.test(value)) {
      return;
    }

    otp[index] = value;

    if (index < otp.length - 1 && value !== "") {
      focusInput(index + 1);
    }

    if (index > 0 && value === "") {
      focusInput(index - 1);
    }

    setOtp([...otp]);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    let pastedData = e.clipboardData.getData("text/plain");

    if (pastedData.length === 6 && /^[0-9]{6}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
    }
  };

  return (
    <>
      <div className="otp-container">
        {otp.map((item, i) => (
          <input
            id={`otp-input-${i}`}
            type="text"
            value={item}
            onChange={(e) => handleChange(e, i)}
            onPaste={handlePaste}
            maxLength="1"
            className="otp-input"
            key={i}
          />
        ))}
      </div>
    </>
  );
}
