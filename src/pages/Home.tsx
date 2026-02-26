import { useNavigate } from "react-router-dom";
import { getEloScores, MODELS, getRoundCount } from "@/lib/game";
import { ModelTag } from "@/components/ModelTag";

const Home = () => {
  const navigate = useNavigate();
  const scores = getEloScores();
  const totalRounds = getRoundCount();

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-dvh flex flex-col items-center bg-background">
      <div className="w-full max-w-lg px-5 py-12 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-serif text-[clamp(48px,10vw,72px)] text-primary tracking-tight leading-none">
            quipslop
          </h1>
          <p className="font-mono text-[11px] tracking-widest uppercase text-dim text-center">
            AI comedy showdown — you be the judge
          </p>
        </div>

        <button
          onClick={() => navigate("/play")}
          className="group relative font-mono text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95"
        >
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary group-hover:bg-primary-foreground transition-colors"
            style={{ animation: "viewer-pulse 1.8s ease-out infinite" }}
          />
          Start Round
        </button>

        <div className="w-full">
          <div className="flex items-baseline justify-between mb-4">
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-dim">
              ELO Rankings
            </span>
            <span className="font-mono text-[10px] tracking-wider text-text-muted">
              {totalRounds} round{totalRounds !== 1 ? "s" : ""} played
            </span>
          </div>

          <div className="flex flex-col gap-1 border border-border rounded-md bg-surface overflow-hidden">
            {sorted.map(([name, score], i) => {
              const model = MODELS.find((m) => m.name === name) || {
                id: name,
                name,
                color: "#A1A1A1",
              };
              return (
                <div
                  key={name}
                  className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 hover:bg-card transition-colors"
                >
                  <span className="w-6 text-center font-mono text-sm font-bold text-text-muted">
                    {i === 0 && score > 1000 ? "👑" : `#${i + 1}`}
                  </span>
                  <ModelTag model={model} />
                  <span
                    className="ml-auto font-mono text-sm font-bold"
                    style={{ color: model.color }}
                  >
                    {score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
