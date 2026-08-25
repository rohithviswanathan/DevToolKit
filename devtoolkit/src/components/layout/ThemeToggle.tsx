import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import IconButton from "../ui/IconButton";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("devtoolkit-theme");

    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setIsDark(false);
    } else {
      document.documentElement.classList.remove("light");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;

    setIsDark(nextIsDark);

    document.documentElement.classList.toggle("light", !nextIsDark);

    localStorage.setItem(
      "devtoolkit-theme",
      nextIsDark ? "dark" : "light",
    );
  };

  return (
    <IconButton
      label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </IconButton>
  );
}

export default ThemeToggle;