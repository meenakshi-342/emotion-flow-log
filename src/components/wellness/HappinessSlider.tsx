import { Slider } from '@/components/ui/slider';

interface HappinessSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const getHappinessEmoji = (level: number): string => {
  if (level >= 9) return '😁';
  if (level >= 7) return '😊';
  if (level >= 5) return '🙂';
  if (level >= 3) return '😐';
  return '😞';
};

export const HappinessSlider = ({ value, onChange }: HappinessSliderProps) => {
  return (
    <div className="space-y-4">
      <label className="flex items-center text-xl font-semibold text-foreground">
        How happy are you feeling?
        <span className="ml-3 text-3xl">
          {getHappinessEmoji(value)}
        </span>
      </label>
      
      <div className="space-y-3">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
        
        <div className="flex justify-between text-sm text-muted-foreground font-medium">
          <span>1 - Very Low</span>
          <span className="font-bold text-primary">
            {value} / 10
          </span>
          <span>10 - Excellent</span>
        </div>
      </div>
    </div>
  );
};