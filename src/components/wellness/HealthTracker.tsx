import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface HealthTrackerProps {
  sleepHours: number;
  onSleepChange: (hours: number) => void;
  exercised: boolean;
  onExerciseChange: (exercised: boolean) => void;
  nutritionNotes: string;
  onNutritionChange: (notes: string) => void;
}

export const HealthTracker = ({
  sleepHours,
  onSleepChange,
  exercised,
  onExerciseChange,
  nutritionNotes,
  onNutritionChange,
}: HealthTrackerProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">
        Daily Health Check-in
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sleep Hours */}
        <div className="space-y-2">
          <Label htmlFor="sleep" className="text-lg font-medium">
            Hours of Sleep
          </Label>
          <Input
            id="sleep"
            type="number"
            value={sleepHours}
            onChange={(e) => onSleepChange(Number(e.target.value))}
            min="0"
            max="24"
            className="w-full p-3 text-center text-lg font-semibold rounded-xl border-rose-200 focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Exercise Checkbox */}
        <div className="space-y-2">
          <Label className="text-lg font-medium">Exercise Today</Label>
          <div className="flex items-center space-x-3 p-3 rounded-xl border border-rose-200 bg-rose-50/50">
            <Checkbox
              id="exercise"
              checked={exercised}
              onCheckedChange={(checked) => onExerciseChange(!!checked)}
              className="h-5 w-5"
            />
            <Label htmlFor="exercise" className="text-lg font-medium cursor-pointer">
              {exercised ? '✅ Yes, I exercised!' : '💪 Did you exercise?'}
            </Label>
          </div>
        </div>
      </div>

      {/* Nutrition Notes */}
      <div className="space-y-2">
        <Label htmlFor="nutrition" className="text-lg font-medium">
          Nutrition Notes
        </Label>
        <Textarea
          id="nutrition"
          value={nutritionNotes}
          onChange={(e) => onNutritionChange(e.target.value)}
          placeholder="e.g., 'Had a healthy lunch' or 'Ate too much junk food'"
          className="w-full p-4 rounded-xl border-rose-200 focus:border-primary focus:ring-primary resize-none"
          rows={2}
        />
      </div>
    </div>
  );
};