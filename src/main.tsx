import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import 'multi-lp-brz-dev/src/styles/themes/landing/tokens.css';
import 'multi-lp-brz-dev/src/styles/themes/landing/components.css';

createRoot(document.getElementById("root")!).render(<App />);
