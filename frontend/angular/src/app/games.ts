export interface Game{
    gameid: number,
    awayteam: string,
    hometeam: string,
    startdate: string,
    time: string,
    homeid: string,
    awayid: string, 
    homescore?: number | null,
    awayscore?: number | null,
}

export const games = [
    {gameid: 1,
    awayteam: "Team 1",
    hometeam: "Team 2",
    startdate: "2023-08-01 19:00:00-07" ,
    time: "02:00:00",
    homeid: "2",
    awayid: "3",
    homescore: 0,
    awayscore: 0,}
]