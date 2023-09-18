import React from "react";

const Footer = () => {
  const d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © Designed &amp; Developed by{" "}
          <a href="http://dexignzone.com/" target="_blank"  rel="noreferrer">
            OvexSoftware
          </a>{" "}
          {d.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
