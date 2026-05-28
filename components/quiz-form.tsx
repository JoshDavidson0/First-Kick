"use client";

import { useState, useEffect } from "react";

interface QuizFormProps {
  onSubmit: (data: {
    sessionId: string;
    personalityTraits: string[];
    favoriteGames: string[];
  }) => void;
}

const personalityTraits = [
  { id: "competitive", label: "Competitive", emoji: "🏆" },
  { id: "creative", label: "Creative", emoji: "🎨" },
  { id: "laid-back", label: "Laid-back", emoji: "😎" },
  { id: "analytical", label: "Analytical", emoji: "🧠" },
  { id: "passionate", label: "Passionate", emoji: "🔥" },
  { id: "determined", label: "Determined", emoji: "💪" },
  { id: "energetic", label: "Energetic", emoji: "⚡" },
  { id: "focused", label: "Focused", emoji: "🎯" },
  { id: "confident", label: "Confident", emoji: "✨" },
];

const games = [
  { id: "EA FC", label: "EA FC / FIFA", emoji: "⚽" },
  { id: "Football Manager", label: "Football Manager", emoji: "📊" },
  { id: "Action Games", label: "Action Games", emoji: "🕹️" },
  { id: "Strategy Games", label: "Strategy Games", emoji: "🧩" },
  { id: "RPG Games", label: "RPG Games", emoji: "⚔️" },
  { id: "Shooter Games", label: "Shooter Games", emoji: "🔫" },
  { id: "Simulation Games", label: "Simulation Games", emoji: "✈️" },
];

// Retrieve existing session ID or generate a new one
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const existing = localStorage.getItem("firstkick_session_id");
  if (existing) return existing;
  const newId = crypto.randomUUID();
  localStorage.setItem("firstkick_session_id", newId);
  return newId;
}

export function QuizForm({ onSubmit }: QuizFormProps) {
  const [step, setStep] = useState(1);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>("");

  const totalSteps = 3;

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const toggleSelection = (
    id: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedTraits.length >= 1;
    if (step === 2) return selectedGames.length >= 1;
    return true;
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit({
      sessionId,
      personalityTraits: selectedTraits,
      favoriteGames: selectedGames,
    });
  };

  const getTraitLabel = (id: string) =>
    personalityTraits.find((t) => t.id === id)?.label || id;

  const getGameLabel = (id: string) =>
    games.find((g) => g.id === id)?.label || id;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-2xl bg-card border p-6 shadow-sm sm:p-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
              How would you describe yourself?
            </h2>
            <p className="mb-6 text-center text-muted-foreground">
              Select 1 to 3 traits that best describe you
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {personalityTraits.map((trait) => {
                const isSelected = selectedTraits.includes(trait.id);
                return (
                  <button
                    key={trait.id}
                    type="button"
                    onClick={() =>
                      toggleSelection(trait.id, selectedTraits, setSelectedTraits)
                    }
                    className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all duration-200 sm:p-6 ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-muted bg-background hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <span className="mb-2 text-3xl sm:text-4xl">{trait.emoji}</span>
                    <span className={`text-sm font-medium sm:text-base ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {trait.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
              What kind of games do you enjoy?
            </h2>
            <p className="mb-6 text-center text-muted-foreground">
              Select 1 to 3 genres you like
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {games.map((game) => {
                const isSelected = selectedGames.includes(game.id);
                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() =>
                      toggleSelection(game.id, selectedGames, setSelectedGames)
                    }
                    className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all duration-200 sm:p-6 ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-muted bg-background hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <span className="mb-2 text-3xl sm:text-4xl">{game.emoji}</span>
                    <span className={`text-center text-sm font-medium sm:text-base ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {game.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
              Ready to find your match?
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              Here&apos;s what you selected
            </p>
            <div className="space-y-6">
              <div className="rounded-xl bg-muted/50 p-4 sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Personality
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTraits.map((traitId) => (
                    <span
                      key={traitId}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {personalityTraits.find((t) => t.id === traitId)?.emoji}
                      {getTraitLabel(traitId)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 p-4 sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Games You Play
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedGames.map((gameId) => (
                    <span
                      key={gameId}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {games.find((g) => g.id === gameId)?.emoji}
                      {getGameLabel(gameId)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-all"
            >
              Find My Match
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
