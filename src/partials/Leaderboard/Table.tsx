"use client";

import { type MouseEventHandler, useState, useEffect } from "react";
import {
  FetchLeaderboardSortType,
  type LeaderboardResponse,
  type LeaderboardEntry,
} from "../../db/queries/leaderboard.types";
import Button from "../../components/Button";
import { SortDirection, SortIcon } from "../../components/SortIcon";
import { useSession } from "next-auth/react";

export function Table(props: {
  defaultEntries: LeaderboardEntry[];
  total: number | bigint;
  guildId: string;
  fetched: number;
}) {
  const auth = useSession();

  // data options states
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.Desc);
  const [sortBy, setSortBy] = useState<FetchLeaderboardSortType>(
    FetchLeaderboardSortType.MMR
  );
  const [changedSort, setChangedSort] = useState(false);

  // data state
  const [entries, setEntries] = useState(props.defaultEntries);
  const [loadMore, setLoadMore] = useState(false);
  const isMore = entries.length < props.total;

  // data updater hook
  useEffect(() => {
    if (!loadMore && !changedSort) return;

    let oldEntries = entries;
    if (changedSort) setEntries((oldEntries = []));

    const params = new URLSearchParams();
    params.set("sortBy", sortBy);
    params.set("sortDirection", sortDir);
    params.set("page", Math.ceil(oldEntries.length / 10).toString());

    console.log(`Current page: ${params.get("page") ?? ""}`);

    void fetch(`/api/leaderboard/${props.guildId}?${params.toString()}`, {
      credentials: "include",
    })
      .then((res) => res.json() as Promise<LeaderboardResponse>)
      .then((data) => {
        console.log(`Recieved ${data.data.length} entries`);
        setEntries([...oldEntries, ...data.data]);
        setLoadMore(false);
        setChangedSort(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortDir, props.guildId, loadMore]);

  // utility functions
  function createSortOnClick(
    clickSortBy: FetchLeaderboardSortType
  ): MouseEventHandler<HTMLTableHeaderCellElement> {
    return () => {
      let direction: SortDirection;
      if (clickSortBy === sortBy) {
        if (sortDir === SortDirection.Desc) {
          direction = SortDirection.Asc;
        } else {
          direction = SortDirection.Desc;
        }
      } else {
        direction = SortDirection.Desc;
      }

      setChangedSort(true);
      setSortBy(clickSortBy);
      setSortDir(direction);
    };
  }

  function getSortDir(type: FetchLeaderboardSortType) {
    if (type === sortBy) {
      return sortDir;
    } else {
      return SortDirection.None;
    }
  }

  // const [entries, setEntries] = useState(props.defaultEntries);
  return (
    <>
      <div className="mx-4 w-auto max-w-[1024px] overflow-x-auto rounded-md bg-background-accent p-2 md:mx-auto">
        <table className="w-full table-auto text-white">
          <thead>
            <tr className="text-left [&>*]:border-table-border">
              <th className="whitespace-nowrap border-r px-4 py-2">
                <span className="inline-block md:hidden">#</span>
                <span className="hidden md:inline-block">Ranking</span>
              </th>
              <th className="w-full whitespace-nowrap border-r px-4 py-2">
                Username
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-r px-4 py-2 hover:bg-zinc-700"
                onClick={createSortOnClick(FetchLeaderboardSortType.MMR)}
              >
                MMR
                <SortIcon
                  direction={getSortDir(FetchLeaderboardSortType.MMR)}
                />
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-r px-4 py-2 hover:bg-zinc-700"
                onClick={createSortOnClick(FetchLeaderboardSortType.Wins)}
              >
                Wins
                <SortIcon
                  direction={getSortDir(FetchLeaderboardSortType.Wins)}
                />
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-r px-4 py-2 hover:bg-zinc-700"
                onClick={createSortOnClick(FetchLeaderboardSortType.Losses)}
              >
                Losses
                <SortIcon
                  direction={getSortDir(FetchLeaderboardSortType.Losses)}
                />
              </th>
              <th
                className="cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-zinc-700"
                onClick={createSortOnClick(FetchLeaderboardSortType.Winrate)}
              >
                <span className="inline-block md:hidden">WR</span>
                <span className="hidden md:inline-block">Winrate</span>

                <SortIcon
                  direction={getSortDir(FetchLeaderboardSortType.Winrate)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr
                key={`${i} ${entry.ign}`}
                className="[&>*]:border-table-border"
              >
                <td className="whitespace-nowrap border border-l-0 px-4 py-2">
                  {i + 1}
                </td>
                <td className="w-full border px-4 py-2">{entry.ign}</td>
                <td className="border px-4 py-2">{Math.round(entry.mmr)}</td>
                <td className="border px-4 py-2">{entry.wins}</td>
                <td className="border px-4 py-2">{entry.losses}</td>
                <td className="flex-nowrap border border-r-0 px-4 py-2">
                  {Math.round(entry.winrate)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="w-full text-white"> */}
        <div className="flex w-full flex-row flex-wrap justify-between px-4 py-2 text-white">
          <p className="block w-fit">
            <>
              Showing {entries.length}/{props.total} entries.
            </>
          </p>
          <p className="block w-fit">
            Updated {Math.round((Date.now() - props.fetched) / 1000 / 60)}{" "}
            minutes ago.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-4 flex flex-col items-center gap-4">
        {isMore && (
          <Button
            variant="gray"
            className="mx-auto"
            disabled={loadMore ?? isMore}
            onClick={() => setLoadMore(true)}
          >
            {loadMore ? "Loading..." : "Load More"}
          </Button>
        )}

        {auth.data?.user.name && (
          <p className="text-zinc-600">Logged in as {auth.data?.user.name}</p>
        )}
      </div>
    </>
  );
}
