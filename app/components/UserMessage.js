export default function UserMessage({ message }) {
  return (
    <div className="flex justify-end px-5 mb-1.5 animate-fade-in" role="article">
      <div
        className="max-w-[85%] bg-zinc-800 text-zinc-100 text-sm leading-relaxed rounded-xl rounded-br-[4px] px-3.5 py-2.5"
        aria-label={`You said: ${message.text}`}
      >
        {message.text}
      </div>
    </div>
  );
}
