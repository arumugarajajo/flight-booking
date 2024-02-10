import React, { useState } from "react";
import "./LoginSignup.css";
import img1 from "../../assets/image/BannerImg2.jpg";
import img2 from "../../assets/image/BannerImg3.jpg";
import img3 from "../../assets/image/BannerImg4.jpg";
import img4 from "../../assets/image/BannerImg5.jpg";
import { IoMdClose } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { auth } from "../../firebase.config";
import { signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";

function LoginSignup() {
  const bannerData = [
    {
      img_url: img1,
      name: "img1",
    },
    {
      img_url: img2,
      name: "img2",
    },
    {
      img_url: img3,
      name: "img3",
    },
    {
      img_url: img4,
      name: "img4",
    },
  ];
  const randomIndex = Math.floor(Math.random() * bannerData.length);
  const randomBanner = bannerData[randomIndex];
  const [mobileNumber, setMobileNumber] = useState("");
  const [OTPpage, setOTPpage] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const handleMobileChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/\D/g, "");
    const truncatedValue = formattedValue.slice(0, 10);
    setMobileNumber(truncatedValue);
  };

  const isValidMobile = () => {
    const isValid = mobileNumber.length === 10;
    return isValid;
  };

  function onSignup() {
    setLoading(true);

    const formatPh = "91+" + mobileNumber;

    signInWithPhoneNumber(auth, formatPh)
      .then((confirmationResult) => {
        if (confirmationResult) {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sent successfully!");
        } else {
          setLoading(false);
          console.error("Confirmation result is undefined.");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        setLoading(false);
      });
  }

  return (
    <div className="loginSignup">
      <div className="benefitsBanner">
        <img
          src={randomBanner.img_url}
          alt={randomBanner.name}
          className="bannerImg"
        />
      </div>
      {OTPpage ? (
        <div className="loginSignupContainer OTPVerify">
          <IoMdClose className="OTP icon" onClick={() => setOTPpage(false)} />
          <h1>Verify OTP</h1>
          <p>
            Enter the 6 digit OTP sent to <span>{mobileNumber}</span>{" "}
            <span>
              <MdEdit className="edit-icon" onClick={() => setOTPpage(false)} />
            </span>
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            className="OTPcontainer"
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button className="verify-btn" onClick={onOTPVerify}>
            {loading && <CgSpinner className="spinner" />}
            <span>Verify OTP</span>
          </button>
          <div className="policyTerms">
            I agree to receive critical messages such as OTP booking details on
            SMS.
          </div>
        </div>
      ) : (
        <div className="loginSignupContainer">
          <h1>Login/Signup</h1>
          <IoMdClose className="icon" />
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mobile">
              <span className="mobilePlaceholder">
                Enter your Mobile Number
              </span>
              <div className="mobileNumber">
                <span className="countryCode">+91-</span>
                <input
                  type="text"
                  id="inputText"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                />
              </div>
            </div>
            <button disabled={!isValidMobile()} onClick={onSignup}>
              Continue
            </button>
          </form>
          <div className="privacyPolicy">
            <p>
              By proceeding, you agree to GoIbibo’s <span> Privacy Policy</span>
              ,<span> User Agreement </span> and <span>Terms of Service </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginSignup;
