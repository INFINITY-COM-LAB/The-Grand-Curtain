/**
 * PerformanceDebugger Component
 * Development-only component to display real-time performance metrics
 * Toggle with ?debug=true in URL
 */

import { useEffect, useState } from 'react';
import { Vital } from '../utils/webVitals';

interface MetricDisplay {
  name: string;
  value: number;
  rating: string;
  timestamp: number;
}

export function PerformanceDebugger() {
  const [metrics, setMetrics] = useState<MetricDisplay[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check URL params
    const params = new URLSearchParams(window.location.search);
    const debugMode = params.has('debug') && params.get('debug') === 'true';
    setVisible(debugMode || process.env.VITE_DEBUG_METRICS === 'true');

    // Intercept analytics events to display metrics
    const originalTrack = window.dispatchEvent;
    const handleMetricUpdate = (event: Event) => {
      if (event.type === 'web-vital') {
        const vitals = (event as any).detail as Vital;
        setMetrics((prev) => [
          {
            name: vitals.name,
            value: vitals.value,
            rating: vitals.rating,
            timestamp: Date.now(),
          },
          ...prev.slice(0, 9),
        ]);
      }
    };

    window.addEventListener('web-vital', handleMetricUpdate);
    return () => window.removeEventListener('web-vital', handleMetricUpdate);
  }, []);

  if (!visible || process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white text-xs rounded-lg border border-amber-500/30 p-4 max-w-sm max-h-64 overflow-y-auto font-mono">
      <div className="font-bold text-amber-400 mb-2">Performance Metrics</div>
      {metrics.length === 0 ? (
        <div className="text-white/50">Waiting for metrics...</div>
      ) : (
        <div className="space-y-1">
          {metrics.map((m, i) => (
            <div key={i} className="flex justify-between gap-2">
              <span className="text-white/70">{m.name}</span>
              <span className={`font-semibold ${
                m.rating === 'good' ? 'text-green-400' :
                m.rating === 'needs-improvement' ? 'text-amber-400' :
                'text-red-400'
              }`}>
                {m.value.toFixed(0)}ms
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 text-white/40 text-[10px]">
        Pass ?debug=true to hide
      </div>
    </div>
  );
}
