import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea,
} from 'recharts';
import { ScrollAnimation } from "./ScrollAnimation";

function getRankColor(rating: number | null): { color: string; rank: string; bgColor: string } {
  if (rating === null) return { color: 'text-gray-400 dark:text-gray-400', rank: 'Unrated', bgColor: 'bg-gray-100 dark:bg-gray-800' };
  if (rating < 1200) return { color: 'text-gray-600 dark:text-gray-300', rank: 'Newbie', bgColor: 'bg-gray-100 dark:bg-gray-800' };
  if (rating < 1400) return { color: 'text-green-600 dark:text-green-400', rank: 'Pupil', bgColor: 'bg-green-50 dark:bg-green-900/30' };
  if (rating < 1600) return { color: 'text-cyan-600 dark:text-cyan-400', rank: 'Specialist', bgColor: 'bg-cyan-50 dark:bg-cyan-900/30' };
  if (rating < 1900) return { color: 'text-blue-600 dark:text-blue-400', rank: 'Expert', bgColor: 'bg-blue-50 dark:bg-blue-900/30' };
  if (rating < 2100) return { color: 'text-purple-600 dark:text-purple-400', rank: 'Candidate Master', bgColor: 'bg-purple-50 dark:bg-purple-900/30' };
  if (rating < 2300) return { color: 'text-orange-500 dark:text-orange-400', rank: 'Master', bgColor: 'bg-orange-50 dark:bg-orange-900/30' };
  if (rating < 2400) return { color: 'text-orange-600 dark:text-orange-400', rank: 'International Master', bgColor: 'bg-orange-100 dark:bg-orange-900/40' };
  if (rating < 2600) return { color: 'text-red-500 dark:text-red-400', rank: 'Grandmaster', bgColor: 'bg-red-50 dark:bg-red-900/30' };
  return { color: 'text-red-700 dark:text-red-400', rank: 'Legendary Grandmaster', bgColor: 'bg-red-100 dark:bg-red-900/40' };
}

function CodeforcesStatsCard() {
  const [data, setData] = useState<{
    solved: number;
    rating: number | null;
    maxRating: number | null;
    contests: number;
    graphData: { name: string; rating: number }[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const [statusRes, ratingRes] = await Promise.all([
          fetch('https://codeforces.com/api/user.status?handle=Wassim221e'),
          fetch('https://codeforces.com/api/user.rating?handle=Wassim221e'),
        ]);

        const statusData = await statusRes.json();
        const ratingData = await ratingRes.json();

        if (statusData.status !== 'OK' || ratingData.status !== 'OK') throw new Error('API Error');

        const solvedSet = new Set();
        for (const sub of statusData.result) {
          if (sub.verdict === 'OK') {
            const id = `${sub.problem.contestId}-${sub.problem.index}`;
            solvedSet.add(id);
          }
        }

        const contestHistory = ratingData.result;
        const graphData = contestHistory.map((entry, i) => ({
          name: entry.contestName || `Contest ${i + 1}`,
          rating: entry.newRating,
        }));

        const latest = contestHistory.at(-1);
        const maxRating = Math.max(...contestHistory.map(c => c.newRating), 0);

        setData({
          solved: solvedSet.size,
          rating: latest ? latest.newRating : null,
          maxRating: maxRating || null,
          contests: contestHistory.length,
          graphData,
        });
      } catch (err) {
        console.error('Error fetching Codeforces data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const { color, rank, bgColor } = getRankColor(data?.rating ?? null);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 animate-pulse">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-16 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/50 p-8 text-center">
        <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Unable to load stats</h3>
        <p className="text-gray-600 dark:text-gray-300">Please check your internet connection and try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ScrollAnimation>
      <div className="w-full max-w-6xl mx-auto mb-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 px-4">Codeforces Statistics</h1>
      </div>
      <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className={`${bgColor} px-8 py-6 border-b border-gray-100 dark:border-gray-700`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              W
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${color} flex items-center gap-2`}>
                Wassim22e
                <span className="text-lg">🧑‍💻</span>
              </h2>
              <p className={`text-sm font-medium ${color}`}>
                {rank} {data?.rating ? `(${data.rating} rating)` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-100 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {data?.solved}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300 font-medium flex items-center justify-center gap-1">
                <span>✅</span> Solved Problems
              </div>
            </div>

            <div className={`text-center p-4 ${bgColor} rounded-lg border border-gray-200 dark:border-gray-600`}>
              <div className={`text-3xl font-bold ${color} mb-1`}>
                {data?.rating || 'N/A'}
              </div>
              <div className={`text-sm ${color} font-medium flex items-center justify-center gap-1`}>
                <span>📊</span> Current Rating
              </div>
            </div>

            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg border border-orange-100 dark:border-orange-800">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {data?.maxRating}
              </div>
              <div className="text-sm text-orange-700 dark:text-orange-300 font-medium flex items-center justify-center gap-1">
                <span>🏆</span> Max Rating
              </div>
            </div>

            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-100 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {data?.contests}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300 font-medium flex items-center justify-center gap-1">
                <span>🧠</span> Contests
              </div>
            </div>
          </div>

          {/* Rating Graph */}
          {data?.graphData && data.graphData.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span>📈</span> Rating Progress
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-lg px-0 py-4 border border-gray-200 dark:border-gray-600 shadow-sm">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data.graphData} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                    {/* Rating Bands - Exact Codeforces rating divisions */}
                    <defs>
                      {/* Individual rank background colors */}
                      <rect id="newbie-bg" fill="#f3f4f6" fillOpacity={0.4} />
                      <rect id="pupil-bg" fill="#bbf7d0" fillOpacity={0.5} />
                      <rect id="specialist-bg" fill="#a7f3d0" fillOpacity={0.5} />
                      <rect id="expert-bg" fill="#bfdbfe" fillOpacity={0.5} />
                      <rect id="cm-bg" fill="#e9d5ff" fillOpacity={0.5} />
                      <rect id="master-bg" fill="#fed7aa" fillOpacity={0.5} />
                      <rect id="im-bg" fill="#fdba74" fillOpacity={0.6} />
                      <rect id="gm-bg" fill="#fecaca" fillOpacity={0.6} />
                      <rect id="lgm-bg" fill="#fee2e2" fillOpacity={0.7} />
                    </defs>

                    {/* Calculate chart dimensions and rating ranges */}
                    {(() => {
                      const minRating = Math.min(...data.graphData.map(d => d.rating)) - 50;
                      const maxRating = Math.max(...data.graphData.map(d => d.rating)) + 50;
                      const ratingRange = maxRating - minRating;

                      // Function to convert rating to Y position
                      const ratingToY = (rating: number) => {
                        return ((maxRating - rating) / ratingRange) * 400; // 400 is chart height minus margins
                      };

                      const bands = [];

                      // Define rating thresholds and colors
                      const thresholds = [
                        { min: 0, max: 1199, color: '#E7EDE6', opacity: 0.5 },      // Newbie - Gray
                        { min: 1200, max: 1399, color: '#69FF3B', opacity: 0.5 },   // Pupil - Green
                        { min: 1400, max: 1599, color: '#1AE4EB', opacity: 0.5 },   // Specialist - Cyan
                        { min: 1600, max: 1899, color: '#1919D4', opacity: 0.5 },   // Expert - Blue
                        { min: 1900, max: 2099, color: '#e9d5ff', opacity: 0.5 },   // CM - Purple
                        { min: 2100, max: 2299, color: '#FFD238', opacity: 0.5 },   // Master - Orange
                        { min: 2300, max: 2399, color: '#fdba74', opacity: 0.6 },   // IM - Dark Orange
                        { min: 2400, max: 2599, color: '#fecaca', opacity: 0.6 },   // GM - Red
                        { min: 2600, max: 5000, color: '#fee2e2', opacity: 0.7 },   // LGM - Dark Red
                      ];

                      return thresholds.map((band, index) => {
                        // Skip bands outside the chart's Y domain
                        if (band.max < minRating || band.min > maxRating) return null;

                        const y1 = Math.max(band.min, minRating);
                        const y2 = Math.min(band.max, maxRating);

                        return (
                          <ReferenceArea
                            key={index}
                            y1={y1}
                            y2={y2}
                            strokeOpacity={0}
                            fill={band.color}
                            fillOpacity={band.opacity}
                          />
                        );
                      }).filter(Boolean);
                    })()}


                    {/* Rating Thresholds */}
                    <ReferenceLine y={1200} stroke="#cccccc" strokeDasharray="2 2" strokeWidth={0.1} />
                    <ReferenceLine y={1400} stroke="#77ff77" strokeDasharray="2 2" strokeWidth={0.1} />
                    <ReferenceLine y={1600} stroke="#77ddbb" strokeDasharray="2 2" strokeWidth={0.1} />
                    <ReferenceLine y={1900} stroke="#1919D4" strokeDasharray="2 2" strokeWidth={0.1} />
                    <ReferenceLine y={2100} stroke="#ff88ff" strokeDasharray="2 2" strokeWidth={0.001} />
                    <ReferenceLine y={2300} stroke="#ffcc88" strokeDasharray="2 2" strokeWidth={0.001} />
                    <ReferenceLine y={2400} stroke="#ffbb55" strokeDasharray="2 2" strokeWidth={0.001} />
                    <ReferenceLine y={2600} stroke="#ff7777" strokeDasharray="2 2" strokeWidth={0.001} />
                    <YAxis
                      fontSize={11}
                      tick={{ fill: 'currentColor' }}
                      axisLine={{ stroke: '#ddd' }}
                      tickLine={{ stroke: '#ddd' }}
                      domain={['dataMin - 50', 'dataMax + 50']}
                      className="text-gray-600 dark:text-gray-300"
                    />
                    <CartesianGrid vertical={true} strokeDasharray="0 0" stroke="#666564" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '4px',
                        fontSize: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value: number) => [
                        `${value} (${getRankColor(value).rank})`,
                        'Rating'
                      ]}
                      labelFormatter={(label) => `Contest: ${label}`}
                    />
                    <Line
                      type="linear"
                      dataKey="rating"
                      stroke="#000000"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 3, fill: '#ffffff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollAnimation>
  );
}

export default CodeforcesStatsCard;
