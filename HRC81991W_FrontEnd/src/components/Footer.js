import { Link } from "react-router-dom";

function Footer() {
  return (
    <div style={{ textAlign: "center", color: "white", marginTop: "2vh" }}>
      <b>
        <Link
          to="/privacy"
          style={{
            color: "#4775ff",
          }}
        >
          Privacy Policy
        </Link>{" "}
        &nbsp; | &copy; {new Date().getFullYear()} HighRadius. All rights
        reserved.
      </b>
    </div>
  );
}

export default Footer;
