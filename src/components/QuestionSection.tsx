
import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const ATTENTION_ANIMATION = "animate-[ping_1s_linear_infinite]";

const QuestionSection = () => {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setValue("");
    }, 1800);
  }

  return (
    <div className="relative bg-muted/70 dark:bg-muted/50 border border-border rounded-lg p-4 mt-4 transition hover:border-primary shadow-sm">
      {/* Circle pulse for attention */}
      <div className="absolute -top-3 left-4 flex items-center">
        <span className={cn("inline-flex h-3 w-3 rounded-full bg-primary", ATTENTION_ANIMATION)} />
        <span className="relative h-3 w-3 rounded-full bg-primary"></span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <span className="font-semibold text-base">Have a question?</span>
        <Tooltip>
          <TooltipTrigger>
            <span className="ml-1 px-2 py-0.5 text-xs rounded bg-primary/10 text-primary">
              New
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            We're here to help—submit any trading question!
          </TooltipContent>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          required
          value={value}
          maxLength={300}
          onChange={e => setValue(e.target.value)}
          className="w-full bg-background p-2 rounded border border-input text-sm focus:ring-1 focus:ring-primary shadow-inner resize-none"
          rows={2}
          placeholder="Type your question..."
          disabled={submitted}
        />
        <button
          type="submit"
          disabled={submitted || !value.trim()}
          className="w-full py-1.5 rounded bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitted ? "Submitted!" : "Submit"}
        </button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">
        We respond personally (chatbot coming soon!).
      </p>
    </div>
  );
};

export default QuestionSection;
