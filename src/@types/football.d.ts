export interface IdNamePair {
  id: number;
  name: string;
}

export interface FixtureType {
  broadcasts: any;
  competitionId: number;
  competitionType: IdNamePair;
  competitionTeamType: IdNamePair;
  homeFormation: string;
  awayFormation: string;
  priority: number;
  uri: string;
  date: Date;
  utcDate: Date;
  week: number;
  seasonType: string;
  season: number;
  eventType: IdNamePair;
  homeTeam: Team;
  awayTeam: Team;
  status: IdNamePair;
  links: Links;
  score: Score;
  venue: Venue;
  isTBA: boolean;
  isNeutralSite: boolean;
  localDate: Date;
  lastModifyDateUtc: Date;
  alternateIds: FixtureAlternateIds;
  coverageLevel: number;
  id: number;
}

export interface FixtureAlternateIds {
  StatsGlobalId: null;
  StatsGameCode: null;
  FoxSoccerName: string;
  FSGoBranch: string;
  FSGoType: string;
  SportRadarInternalId: number;
}

export interface Team extends IdNamePair {
  globalUri: string;
  gender: IdNamePair;
  teamType: IdNamePair;
  uri: string;
  groupId: number;
  location: string;
  abbreviation: string;
  customName: string;
  primaryColor: string;
  secondaryColor: string;
  useSecondaryColor: boolean;
  record: Record;
  alternateIds: AwayTeamAlternateIds;
  country: Place;
  profileToken: string;
  logoFlippable: boolean;
  logoFlipOrientation: IdNamePair;
  hasLocalNewsCoverage: boolean;
}

export interface AwayTeamAlternateIds {
  StatsId: null;
  StatsGlobalId: number;
  TmsId: number;
  TagboardID: string;
  AssociatedPressId: string;
  TagPath: string;
  ContentUri: string;
  SportRadarInternalId: number;
}

export interface Place extends IdNamePair {
  abbreviation: string;
  shortname?: string;
}

export interface Record {
  roundId: number;
  gamesPlayed: number;
  points: number;
  pointsPerGame: number;
  penaltyPoints: number;
  goals: number;
  goalsAgainst: number;
  previousRank: number;
  recentResults: string;
  tiedStreak?: number;
  winlessStreak?: number;
  losslessStreak: number;
  wins: number;
  losses: number;
  ties: number;
  winPercentage: number;
  rank: number;
  lastModifyDateUtc: Date;
  winningStreak?: number;
}

export interface Links {
  api: Api;
  web: Web;
}

export interface Api {
  home: string;
  away: string;
}

export interface Web {
  matchtrax: string;
  boxscore: string;
  recap: string;
}

export interface Score {
  homeShots: number;
  awayShots: number;
  homeShotsOnGoal: number;
  awayShotsOnGoal: number;
  awayYellowCards: number;
  awayYellowRedCards: number;
  awayRedCards: number;
  homeYellowCards: number;
  homeYellowRedCards: number;
  homeRedCards: number;
  homeTeamPossessionPercentage: number;
  awayTeamPossessionPercentage: number;
  homeScore: number;
  awayScore: number;
  homeScoreByPeriod: number[];
  awayScoreByPeriod: number[];
  totalPeriods: number;
  liveMatchTime: string;
  isScoreOfficial: boolean;
}

export interface Venue extends IdNamePair {
  capacity: number;
  city: string;
  state: Place;
  country: Place;
  latitude: number;
  longitude: number;
  alternateIds: VenueAlternateIds;
}

export interface VenueAlternateIds {
  SportRadarInternalId: number;
}
