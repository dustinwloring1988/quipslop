import { type RoundState } from "@/lib/game";
import { ModelTag, Dots } from "@/components/ModelTag";

export function PromptCard({ round }: { round: RoundState }) {
  if (round.phase === "prompting" && !round.prompt) {
    return (
      <div className="mb-8 shrink-0">
        <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5 flex-wrap">
          <ModelTag model={round.prompter} small /> is writing a prompt
          <Dots />
        </div>
        <div className="font-serif text-[clamp(28px,5vw,52px)] leading-[1.15] text-text-muted tracking-tight border-l-[3px] border-border pl-5">
          <Dots />
        </div>
      </div>
    );
  }

  if (round.promptTask.error) {
    return (
      <div className="mb-8 shrink-0">
        <div className="font-mono text-base text-destructive border-l-[3px] border-destructive pl-5">
          Prompt generation failed
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 lg:mb-10 shrink-0">
      <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5 flex-wrap">
        Prompted by <ModelTag model={round.prompter} small />
      </div>
      <div className="font-serif text-[clamp(28px,5vw,52px)] leading-[1.15] text-foreground tracking-tight border-l-[3px] border-primary pl-5 lg:pl-6">
        {round.prompt}
      </div>
    </div>
  );
}
