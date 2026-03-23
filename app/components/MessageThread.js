"use client";

import { useEffect, useRef } from "react";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";
import ThinkingIndicator from "./ThinkingIndicator";
import EmptyState from "./EmptyState";

export default function MessageThread({ messages, isThinking, onSend }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  if (messages.length === 0 && !isThinking) {
    return (
      <div className="flex-1 overflow-y-auto">
        <EmptyState onSend={onSend} />
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-auto py-4"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {messages.map((msg, i) => {
        const prevMsg = messages[i - 1];
        const isFirstInSequence = !prevMsg || prevMsg.role !== msg.role;

        if (msg.role === "user") {
          return <UserMessage key={msg.id} message={msg} />;
        }
        return (
          <AIMessage
            key={msg.id}
            message={msg}
            showAvatar={isFirstInSequence}
          />
        );
      })}
      {isThinking && <ThinkingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
