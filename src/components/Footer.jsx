import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer(){
  return(
    <div className="footer">

        <div>
            <ul className="flex gap-8 ">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact</li>
            </ul>
        </div>
        <div className="flex gap-4 text-lg">
          <a href="https://github.com/Lordmarc"><FaGithub/></a>
        
          <a href="https://www.linkedin.com/in/lord-marc-matabang-8859102b0/"><FaLinkedin/></a>
        </div>

        <div>
          <p>© 2026 MarCode.</p>
        </div>
    
    </div>
  );
}