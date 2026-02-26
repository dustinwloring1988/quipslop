import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  createSingleRound,
  type RoundState,
  getEloScores,
  saveEloScores,
  updateElo,
} from "@/lib/game";
import { PromptCard } from "@/components/PromptCard";
import { VoteCard } from "@/components/VoteCard";
import { ConnectingScreen } from "@/components/ConnectingScreen";
import { ModelTag } from "@/components/ModelTag";

const Play = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState<RoundState | null>(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const cancel = createSingleRound(setRound);
    return cancel;
  }, []);

  const handleVote = useCallback(
    (choice: "A" | "B") => {
      if (!round || voted) return;
      setVoted(true);

      const winner = choice === "A" ? round.contestants[0] : round.contestants[1];
      const loser = choice === "A" ? round.contestants[1] : round.contestants[0];

      const scores = getEloScores();
      const updated = updateElo(scores, winner.name, loser.name);
      saveEloScores(updated);

      setRound((prev) =>
        prev ? { ...prev, phase: "done", userVote: choice } : prev
      );

      setTimeout(() => navigate("/"), 2000);
    },
    [round, voted, navigate]
  );

  if (!round) return <ConnectingScreen />;

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 p-5 lg:pt-[88px] lg:px-12 lg:pb-8 overflow-y-auto flex flex-col lg:items-center">
        <header className="shrink-0 mb-7 flex items-center justify-between gap-3 lg:mb-10 w-full lg:max-w-[900px]">
          <h1
            className="font-serif text-xl text-primary tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            quipslop
          </h1>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-dim border border-border bg-surface rounded-full px-2.5 py-1.5 whitespace-nowrap">
            Round #{round.num}
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:max-w-[900px] lg:w-full lg:my-auto">
          <PromptCard round={round} />

          {round.phase !== "prompting" && (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 flex-1 min-h-0 lg:items-start">
              <VoteCard
                task={round.answerTasks[0]}
                isSelected={round.userVote === "A"}
                isOther={round.userVote === "B"}
                canVote={round.phase === "user-voting" && !voted}
                onVote={() => handleVote("A")}
              />
              <VoteCard
                task={round.answerTasks[1]}
                isSelected={round.userVote === "B"}
                isOther={round.userVote === "A"}
                canVote={round.phase === "user-voting" && !voted}
                onVote={() => handleVote("B")}
              />
            </div>
          )}

          {round.phase === "user-voting" && !voted && (
            <div className="text-center font-mono text-[11px] tracking-widest uppercase text-dim mt-6 animate-pulse">
              Pick the funniest answer
            </div>
          )}

          {voted && (
            <div className="text-center font-mono text-[13px] font-bold tracking-widest uppercase text-primary mt-6 animate-[toast-in_0.3s_cubic-bezier(0.22,1,0.36,1)]">
              Vote recorded — back to lobby…
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Play;
