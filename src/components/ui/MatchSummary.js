import React from 'react'
import moment from 'moment';
import { Segment, Card, Icon, Image, Header } from 'semantic-ui-react'

const MatchSummary = (props) => {
  return <Segment.Group>
    <Segment.Group className='equal width' horizontal>
      <Segment>
        <Header as='h2' floated='left'>
          <Image height='64' src={props.homeTeam.crestUrl} />
          {' '} {props.homeTeamName}
        </Header>
        <Header floated='right' as='h1'>{props.result.goalsHomeTeam}</Header>
      </Segment>
      <Segment>
        <Header as='h2' floated='right'>
          {props.awayTeamName}{' '}
          <Image height='64' src={props.awayTeam.crestUrl} />
        </Header>
        <Header floated='left' as='h1'>{props.result.goalsAwayTeam}</Header>
      </Segment>
    </Segment.Group>
    <Segment>
      Date: {moment(props.date).format('MM/DD/YYYY hh:mm A')}
    </Segment>
  </Segment.Group>;
}

export default MatchSummary;
