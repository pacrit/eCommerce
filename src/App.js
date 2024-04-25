import HomePage from "./components/HomePage";
import "./styles.css";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}
