# Application Architecture

## UI
Home Page (input: year, defaults to current year if not provided)
  Competition

Competitions (a.k.a Leagues)
  Fixtures
  Teams
  League Table (a.k.a Standings)

Team Logos
  `team_logos_scraper.rb`

Country Flags
  `flags_scraper.rb`


## Collections
Collections should be searchable and filterable. Each collection has its own
redux store item, example, state.fixtures

Collections
  fixtures
  teams
  competitions
  players
