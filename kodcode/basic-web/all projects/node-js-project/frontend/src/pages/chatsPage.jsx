import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";

import { PrettyChatWindow } from "react-chat-engine-pretty";

export default function ChatsPage({ user }) {
  const chatProps = useMultiChatLogic(
    "83be06ba-cfe7-4271-adcf-fd7623b24efe",
    user.username,
    user.secret
  );
  return (
    <div style={{ height: "100vh" }}>
      <MultiChatSocket {...chatProps} />
      <PrettyChatWindow {...chatProps} style={{ height: "100vh" }} />
      {/* <MultiChatWindow {...chatProps} style={{ height: "100vh" }} /> */}
    </div>
  );
}
