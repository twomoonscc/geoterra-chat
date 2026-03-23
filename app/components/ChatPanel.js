import MessageThread from "./MessageThread";
import Composer from "./Composer";

export default function ChatPanel({ messages, isThinking, onSend, layers }) {
  const activeLayerCount = layers.filter((l) => l.visible).length;

  return (
    <aside
      className="flex flex-col border-r border-zinc-800 bg-zinc-950 shrink-0 w-full sm:w-[400px]"
      aria-label="Chat panel"
    >
      <MessageThread
        messages={messages}
        isThinking={isThinking}
        onSend={onSend}
      />
      <Composer
        onSend={onSend}
        disabled={isThinking}
        activeLayerCount={activeLayerCount}
      />
    </aside>
  );
}
