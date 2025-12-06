import { useState } from "preact/hooks";

import "./App.css";

import AuthPage from "./pages/authPage";
import ChatsPage from "./pages/chatsPage";

function App() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default App;
