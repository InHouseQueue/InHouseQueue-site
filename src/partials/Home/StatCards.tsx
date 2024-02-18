import React from "react";

import StatCard from "../../components/StatCard/StatCard";

interface IStatsProps {
  status: string;
  last_check: string;
  message: string;
  server_count: number;
  total_games: number;
  total_users: number;
}

export default function StatCards() {
  const [stats, setStats] = React.useState<IStatsProps>({
    server_count: 2000, // Hardcoded value
    total_games: 20000, // Hardcoded value
    total_users: 40000 // Hardcoded value
  });

  React.useEffect(() => {
  }, []);

  return (
    <div className="relative w-full z-30">
      <div className="flex -translate-y-24 flex-row flex-wrap z-30 w-full align-middle justify-center gap-9">
        <StatCard
          count={stats.server_count}
          label="Servers"
          aosIndex={0}
        />

        <StatCard
          count={stats.total_users}
          label="Active Players"
          aosIndex={1}
        />

        <StatCard
          count={stats.total_games}
          label="Matches Played"
          aosIndex={2}
        />
      </div>
    </div>
  );
}
