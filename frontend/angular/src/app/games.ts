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
    awayteam: "Team 2",
    hometeam: "Team 1",
    startdate: "2023-08-01 19:00:00-07" ,
    time: "02:00:00",
    homeid: "2",
    awayid: "3",
    homescore: 0,
    awayscore: 0,
},
{gameid: 2,
    awayteam: "Team 2",
    hometeam: "Team 1",
    startdate: "2023-08-02 19:00:00-07" ,
    time: "05:00:00",
    homeid: "2",
    awayid: "3",
    homescore: 0,
    awayscore: 0,
}

]