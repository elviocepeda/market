import AppRouter from "./routers/AppRouter";
import { AppProvider } from "./store";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
