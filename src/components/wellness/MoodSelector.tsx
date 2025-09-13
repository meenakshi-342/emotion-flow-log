import { Button } from '@/components/ui/button';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

const moodOptions = [
  { label: 'Happy', emoji: '🤩', color: 'hover:bg-rose-100' },
  { label: 'Calm', emoji: '🧘', color: 'hover:bg-rose-100' },
  { label: 'Neutral', emoji: '😐', color: 'hover:bg-rose-100' },
  { label: 'Anxious', emoji: '😰', color: 'hover:bg-rose-100' },
  { label: 'Stressed', emoji: '🤯', color: 'hover:bg-rose-100' },
  { label: 'Overwhelmed', emoji: '😵‍💫', color: 'hover:bg-rose-100' },
];

export const MoodSelector = ({ selectedMood, onMoodChange }: MoodSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-xl font-semibold text-foreground">
        How's it going today?
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {moodOptions.map((mood) => (
          <Button
            key={mood.label}
            type="button"
            variant="ghost"
            onClick={() => onMoodChange(mood.label)}
            className={`
              p-4 h-auto rounded-2xl transition-all duration-300 transform hover:scale-110 
              ${mood.color}
              ${selectedMood === mood.label 
                ? 'ring-2 ring-primary bg-rose-100 scale-105' 
                : 'hover:shadow-soft'
              }
            `}
            title={mood.label}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs font-medium text-foreground">
                {mood.label}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};