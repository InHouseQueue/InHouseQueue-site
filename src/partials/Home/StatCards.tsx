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

  const dummyStats: IStatsProps = {
    status: "operational",
    last_check: "2023-06-11 12:52:22",
    message: "bot is connected v2",
    server_count: 582,
    total_games: 6547,
    total_users: 5625
  }

  return (
    <div className="relative w-full z-30">
      <div className="flex -translate-y-24 flex-row flex-wrap z-30 w-full align-middle justify-center gap-9">
        <StatCard
          count={dummyStats.server_count}
          label="Servers"
          aosIndex={0}
        />

        <StatCard
          count={dummyStats.total_users}
          label="Active Players"
          aosIndex={1}
        />

        <StatCard
          count={dummyStats.total_games}
          label="Matches Played"
          aosIndex={2}
        />
      </div>
    </div>
  )
}