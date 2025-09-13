import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { MoodSelector } from '@/components/wellness/MoodSelector';
import { HappinessSlider } from '@/components/wellness/HappinessSlider';
import { HealthTracker } from '@/components/wellness/HealthTracker';
import { JournalEntry } from '@/components/wellness/JournalEntry';
import { EntryHistory } from '@/components/wellness/EntryHistory';
import { MoodChart } from '@/components/wellness/MoodChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface WellnessEntry {
  id: string;
  mood: string;
  happinessLevel: number;
  sleepHours: number;
  exercised: boolean;
  nutritionNotes: string;
  journalText: string;
  timestamp: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  recommendations?: string[];
}

const Index = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [happinessLevel, setHappinessLevel] = useState(5);
  const [sleepHours, setSleepHours] = useState(8);
  const [exercised, setExercised] = useState(false);
  const [nutritionNotes, setNutritionNotes] = useState('');
  const [journalText, setJournalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entries, setEntries] = useState<WellnessEntry[]>([]);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('momentum-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('momentum-entries', JSON.stringify(entries));
  }, [entries]);

  const resetForm = () => {
    setSelectedMood('');
    setHappinessLevel(5);
    setSleepHours(8);
    setExercised(false);
    setNutritionNotes('');
    setJournalText('');
  };

  const generateRecommendations = (mood: string, happiness: number, sentiment: string): string[] => {
    const recommendations: string[] = [];
    
    if (happiness <= 4 || sentiment === 'Negative') {
      recommendations.push("Take a 10-minute walk outdoors to boost your mood and get fresh air");
      recommendations.push("Practice deep breathing exercises for 5 minutes to reduce stress");
      recommendations.push("Connect with a friend or family member for support and social connection");
    } else if (happiness >= 8 || sentiment === 'Positive') {
      recommendations.push("Keep up the great work! Consider journaling about what's going well");
      recommendations.push("Share your positive energy by helping a classmate or friend");
      recommendations.push("Use this good mood to tackle a challenging task on your to-do list");
    } else {
      recommendations.push("Maintain balance with a consistent sleep schedule of 7-9 hours");
      recommendations.push("Try a new study technique or creative hobby to keep things interesting");
      recommendations.push("Take regular breaks during study sessions to prevent burnout");
    }

    return recommendations;
  };

  const analyzeSentiment = (text: string): 'Positive' | 'Neutral' | 'Negative' => {
    const positiveWords = ['happy', 'great', 'amazing', 'wonderful', 'excited', 'grateful', 'good', 'fantastic', 'awesome', 'love'];
    const negativeWords = ['sad', 'terrible', 'awful', 'stressed', 'anxious', 'worried', 'bad', 'hate', 'frustrated', 'overwhelmed'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'Positive';
    if (negativeCount > positiveCount) return 'Negative';
    return 'Neutral';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood || !journalText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a mood and write a journal entry.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const sentiment = analyzeSentiment(journalText);
      const recommendations = generateRecommendations(selectedMood, happinessLevel, sentiment);
      
      const newEntry: WellnessEntry = {
        id: Date.now().toString(),
        mood: selectedMood,
        happinessLevel,
        sleepHours,
        exercised,
        nutritionNotes,
        journalText,
        timestamp: new Date().toISOString(),
        sentiment,
        recommendations,
      };

      setEntries(prev => [newEntry, ...prev]);
      
      toast({
        title: "Entry Saved Successfully! ✨",
        description: "Your wellness check-in has been recorded. Keep up the great work!",
      });

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section: Check-in Form */}
          <Card className="p-6 sm:p-8 bg-gradient-card shadow-medium border-rose-100">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-rose-800 mb-2">
                  Momentum
                </h1>
                <p className="text-xl text-rose-600 font-semibold">
                  Your Student Wellness Companion
                </p>
              </div>

              {/* Check-in Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <MoodSelector
                  selectedMood={selectedMood}
                  onMoodChange={setSelectedMood}
                />

                <HappinessSlider
                  value={happinessLevel}
                  onChange={setHappinessLevel}
                />

                <HealthTracker
                  sleepHours={sleepHours}
                  onSleepChange={setSleepHours}
                  exercised={exercised}
                  onExerciseChange={setExercised}
                  nutritionNotes={nutritionNotes}
                  onNutritionChange={setNutritionNotes}
                />

                <JournalEntry
                  value={journalText}
                  onChange={setJournalText}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg font-bold bg-gradient-primary hover:scale-105 transform transition-all duration-300 shadow-medium hover:shadow-strong"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      <span>Saving Entry...</span>
                    </div>
                  ) : (
                    'Submit Entry ✨'
                  )}
                </Button>
              </form>
            </div>
          </Card>

          {/* Right Section: Progress & History */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card shadow-medium border-rose-100">
              <h2 className="text-3xl font-extrabold text-rose-800 mb-6">
                Your Progress
              </h2>
              <MoodChart entries={entries} />
            </Card>

            <Card className="p-6 bg-gradient-card shadow-medium border-rose-100">
              <h3 className="text-2xl font-bold text-rose-800 mb-4">
                Recent Entries
              </h3>
              <EntryHistory entries={entries} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;