import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { WellnessEntry } from '@/pages/Index';

interface EntryHistoryProps {
  entries: WellnessEntry[];
}

export const EntryHistory = ({ entries }: EntryHistoryProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-muted-foreground text-lg">
          No entries yet. Start your first check-in above!
        </p>
      </div>
    );
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-success text-success-foreground';
      case 'Negative':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-warning text-warning-foreground';
    }
  };

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-4 bg-rose-50/50 border-rose-200 hover:shadow-soft transition-all duration-300">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
                <Badge className={getSentimentColor(entry.sentiment)}>
                  {entry.sentiment || 'Analyzing...'}
                </Badge>
              </div>

              {/* Entry Details */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-semibold text-rose-800">Mood:</span>
                  <span className="font-medium">{entry.mood}</span>
                  <span className="font-semibold text-rose-800">Happiness:</span>
                  <span className="font-medium">{entry.happinessLevel}/10</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-semibold text-rose-800">Sleep:</span>
                  <span className="font-medium">{entry.sleepHours}h</span>
                  <span className="font-semibold text-rose-800">Exercise:</span>
                  <span className="font-medium">
                    {entry.exercised ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
              </div>

              {/* Journal Text */}
              <div className="space-y-1">
                <span className="font-semibold text-rose-800 text-sm">Journal:</span>
                <p className="text-sm text-foreground leading-relaxed">
                  {entry.journalText}
                </p>
              </div>

              {/* Recommendations */}
              {entry.recommendations && entry.recommendations.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-rose-200">
                  <span className="font-semibold text-rose-700 text-sm">
                    💡 Wellness Tips:
                  </span>
                  <ul className="space-y-1">
                    {entry.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-rose-700 flex items-start">
                        <span className="mr-2 text-rose-500">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};