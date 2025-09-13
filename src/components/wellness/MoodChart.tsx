import { useEffect, useRef } from 'react';
import type { WellnessEntry } from '@/pages/Index';

interface MoodChartProps {
  entries: WellnessEntry[];
}

export const MoodChart = ({ entries }: MoodChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (entries.length === 0) {
      // Draw empty state
      ctx.fillStyle = '#d1d5db';
      ctx.font = '16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No data to display yet', rect.width / 2, rect.height / 2);
      return;
    }

    // Prepare data
    const reversedEntries = entries.slice().reverse().slice(-10); // Show last 10 entries
    const sentimentToScore = { 'Positive': 1, 'Neutral': 0, 'Negative': -1 };
    const scores = reversedEntries.map(entry => sentimentToScore[entry.sentiment || 'Neutral']);

    if (scores.length === 0) return;

    const padding = 40;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;

    // Calculate positions
    const stepX = chartWidth / Math.max(scores.length - 1, 1);
    const dataPoints = scores.map((score, index) => {
      const x = padding + index * stepX;
      const normalizedScore = (score + 1) / 2; // Convert -1,1 to 0,1
      const y = padding + chartHeight - (normalizedScore * chartHeight);
      return { x, y, score };
    });

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
    }

    // Draw the line
    if (dataPoints.length > 1) {
      ctx.strokeStyle = '#e11d48'; // Rose-600
      ctx.lineWidth = 3;
      ctx.beginPath();
      dataPoints.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    }

    // Draw data points
    dataPoints.forEach((point, index) => {
      // Point circle
      ctx.fillStyle = '#e11d48'; // Rose-600
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fill();

      // White inner circle
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();

      // Date label
      const entry = reversedEntries[index];
      if (entry) {
        const date = new Date(entry.timestamp);
        const dateString = date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(dateString, point.x, rect.height - 10);
      }
    });

    // Draw Y-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'right';
    
    const labels = ['Negative', 'Neutral', 'Positive'];
    labels.forEach((label, index) => {
      const y = padding + chartHeight - (index * chartHeight / 2) + 5;
      ctx.fillText(label, padding - 10, y);
    });

  }, [entries]);

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 p-4 rounded-xl border border-rose-100">
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Mood Trends Over Time
        </h4>
        <canvas
          ref={canvasRef}
          className="w-full h-64 cursor-pointer"
          style={{ width: '100%', height: '256px' }}
        />
        <div className="flex justify-between mt-2 text-xs font-medium text-muted-foreground">
          <span>Past</span>
          <span>Recent</span>
        </div>
      </div>
      
      {entries.length > 0 && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-success/10 rounded-xl border border-success/20">
            <div className="text-lg font-bold text-success">
              {entries.filter(e => e.sentiment === 'Positive').length}
            </div>
            <div className="text-sm text-success/80">Positive Days</div>
          </div>
          <div className="p-3 bg-warning/10 rounded-xl border border-warning/20">
            <div className="text-lg font-bold text-warning">
              {entries.filter(e => e.sentiment === 'Neutral').length}
            </div>
            <div className="text-sm text-warning/80">Neutral Days</div>
          </div>
          <div className="p-3 bg-destructive/10 rounded-xl border border-destructive/20">
            <div className="text-lg font-bold text-destructive">
              {entries.filter(e => e.sentiment === 'Negative').length}
            </div>
            <div className="text-sm text-destructive/80">Challenging Days</div>
          </div>
        </div>
      )}
    </div>
  );
};