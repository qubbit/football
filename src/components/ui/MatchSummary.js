import React from 'react'
import moment from 'moment';
import { Grid, Segment, Image, Header } from 'semantic-ui-react'

const styles = {
  dark: {
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.75)'
  },
  darker: {
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.9)'
  }
}

const MatchSummary = (props) => {
  return <Segment.Group>
    <Segment style={styles.dark}>
      <Grid columns={2} divided>
        <Grid.Column>
          <Header as='h2' floated='left' style={{ color: '#fff' }}>
            <Image height='64' src={props.homeTeam.crestUrl} />
            {' '} {props.homeTeamName}
          </Header>
          <Header floated='right' as='h1' style={{ color: '#fff' }}>{props.result.goalsHomeTeam}</Header>
        </Grid.Column>
        <Grid.Column>
          <Header as='h2' floated='right' style={{ color: '#fff' }}>
            {props.awayTeamName}{' '}
            <Image height='64' src={props.awayTeam.crestUrl} />
          </Header>
          <Header floated='left' as='h1' style={{ color: '#fff' }}>{props.result.goalsAwayTeam}</Header>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment style={styles.darker} size='huge'>
      <Grid columns={2}>
        <Grid.Column>
          Date: {moment(props.date).format('MM/DD/YYYY hh:mm A')}
        </Grid.Column>
        <Grid.Column textAlign='right'>
          Match day {props.matchday}
        </Grid.Column>
      </Grid>
    </Segment>
  </Segment.Group>;
}

export default MatchSummary;
