import { type TaskInfo } from "@/lib/game";
import { ModelTag, Dots } from "@/components/ModelTag";

interface VoteCardProps {
  task: TaskInfo;
  isSelected: boolean;
  isOther: boolean;
  canVote: boolean;
  onVote: () => void;
}

export function VoteCard({ task, isSelected, isOther, canVote, onVote }: VoteCardProps) {
  const color = task.model.color;

  return (
    <button
      type="button"
      disabled={!canVote}
      onClick={onVote}
      className={`text-left border-l-[3px] px-5 py-4 flex flex-col gap-3 transition-all lg:flex-1 rounded-r-md ${
        canVote
          ? "cursor-pointer hover:bg-card active:scale-[0.98]"
          : ""
      } ${
        isSelected
          ? "border-l-4 bg-card animate-[winner-reveal_1.5s_ease-out]"
          : ""
      } ${
        isOther ? "opacity-40" : ""
      }`}
      style={{
        borderLeftColor: color,
      }}
    >
      <div className="flex items-center justify-between shrink-0">
        <ModelTag model={task.model} />
        {isSelected && (
          <span className="font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 bg-primary text-primary-foreground rounded-sm">
            YOUR PICK
          </span>
        )}
      </div>

      <div className="flex-1 min-h-0">
        {!task.finishedAt ? (
          <p className="font-serif text-[clamp(20px,3.5vw,28px)] leading-snug text-text-muted tracking-tight">
            <Dots />
          </p>
        ) : task.error ? (
          <p className="font-mono text-sm text-destructive">{task.error}</p>
        ) : (
          <p className={`font-serif text-[clamp(20px,3.5vw,28px)] leading-snug tracking-tight ${
            isSelected ? "text-foreground" : isOther ? "text-text-muted" : "text-dim"
          }`}>
            &ldquo;{task.result}&rdquo;
          </p>
        )}
      </div>

      {canVote && task.finishedAt && (
        <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
          Click to vote
        </span>
      )}
    </button>
  );
}
