import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-2 shrink-0 hover:bg-foreground/10 transition-colors border-l border-foreground/10 flex items-center justify-center group"
    >
      {copied ? (
        <Check className="w-4 h-4 text-[#0000EE] dark:text-[#A1A1AA]" />
      ) : (
        <Copy className="w-4 h-4 text-foreground/50 group-hover:text-[#0000EE] dark:group-hover:text-[#A1A1AA] transition-colors" />
      )}
    </button>
  );
}
