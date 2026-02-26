import { Dots } from "@/components/ModelTag";

export function ConnectingScreen() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-4 bg-background">
      <h1 className="font-serif text-[clamp(40px,8vw,64px)] text-primary tracking-tight">
        quipslop
      </h1>
      <div className="font-mono text-[13px] text-text-muted tracking-widest uppercase">
        Starting game
        <Dots />
      </div>
    </div>
  );
}
