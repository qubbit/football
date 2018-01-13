import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const Match = props => {
  return (
    <Card.Group>
      <Card>
        <Image height="200" src={props.homeTeam.crestUrl} />
        <Card.Content>
          <Card.Header>{props.homeTeamName}</Card.Header>
          <Card.Description>
            <h2>{props.result.goalsHomeTeam}</h2>
          </Card.Description>
        </Card.Content>
      </Card>,
      <Card>
        <Image height="200" src={props.awayTeam.crestUrl} />
        <Card.Content>
          <Card.Header>{props.awayTeamName}</Card.Header>
          <Card.Description>
            <h2>{props.result.goalsAwayTeam}</h2>
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default Match;
