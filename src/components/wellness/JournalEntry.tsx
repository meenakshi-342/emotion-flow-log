import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface JournalEntryProps {
  value: string;
  onChange: (value: string) => void;
}

export const JournalEntry = ({ value, onChange }: JournalEntryProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="journal" className="text-xl font-semibold text-foreground">
        Journal your thoughts
      </Label>
      <Textarea
        id="journal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's on your mind? Share your thoughts, feelings, and experiences..."
        className="w-full p-4 rounded-xl border-rose-200 focus:border-primary focus:ring-primary resize-none min-h-[120px] text-base leading-relaxed"
        rows={6}
      />
      <p className="text-sm text-muted-foreground">
        💭 Express yourself freely - this is your safe space to reflect and process your day.
      </p>
    </div>
  );
};