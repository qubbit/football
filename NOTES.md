# Application Architecture

## UI
* Home Page (input: year, defaults to current year if not provided)
  * Competition

* Competitions (a.k.a Leagues)
  * Fixtures
  * Teams
  * League Table (a.k.a Standings)

## Assets
* Team and league logos are scraped from Wikipedia using `logos_scraper.rb`
* Country flags (for showing league country) are scraped from Wikipedia using `flags_scraper.rb`
* Background are images from Unsplash
* Icon fonts are from Font Awesome


## Collections
Collections should be searchable and filterable. Each collection has its own
redux store item, example, `state.fixtures`.

Collections
  * fixtures
  * teams
  * competitions
  * players
