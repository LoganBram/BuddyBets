export interface Game{
    gameid: number,
    awayteam: string,
    hometeam: string,
    startdate: string,
    homeid: string,
    awayid: string,
    time: Date,
    homescore?: number | null,
    awayscore?: number | null,
}

export const games = [
    {gameid: 1,
    awayteam: "Team 1",
    hometeam: "Team 2",
    startdate: "2020-12-12",
    homeid: "2",
    awayid: "3",
    time: new Date("2020-12-12T12:00:00"),
    homescore: 0,
    awayscore: 0,}
]