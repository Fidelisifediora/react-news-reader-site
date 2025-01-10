/* eslint-disable react/prop-types */

import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // Import toggle styles

const ThemeToggle = ({ onToggle }) => {
  return (
    <div className="toggle-container">
      <label>
        <Toggle
          defaultChecked={false}
          icons={false}
          onChange={onToggle}
        />
        <span>{' '}Toggle Dark Mode</span>
      </label>
    </div>
  );
};

export default ThemeToggle;
