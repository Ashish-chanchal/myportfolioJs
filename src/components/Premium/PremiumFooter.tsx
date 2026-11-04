import { Link } from 'react-router-dom';

const PremiumFooter = () => (
  <div className="pm-root">
    <div className="pm-wrap">
      <footer className="pm-footer">
        <span>© {new Date().getFullYear()} Ashish Chanchal · Noida, India</span>
        <span>
          <a href="https://github.com/Ashish-chanchal" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ashishchanchal/" target="_blank" rel="noreferrer">LinkedIn</a>
          <Link to="/privacy-policy">Privacy</Link>
        </span>
      </footer>
    </div>
  </div>
);

export default PremiumFooter;
