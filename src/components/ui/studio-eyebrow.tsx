import { cn } from "@/lib/utils";

type StudioEyebrowProps = {
  text: string;
  className?: string;
};

function spaceLetters(word: string): string {
  return word.toUpperCase().split("").join(" ");
}

export function StudioEyebrow({ text, className }: StudioEyebrowProps) {
  const words = text.trim().split(/\s+/);

  return (
    <p className={cn("studio-eyebrow studio-eyebrow--underlined", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="studio-eyebrow__word">
          {word === "&" ? word : spaceLetters(word)}
        </span>
      ))}
    </p>
  );
}
