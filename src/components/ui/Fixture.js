import React from 'react';
import moment from 'moment';
import { Grid, Segment, Image, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Fixture = props => {
  const normalizeStatus = status => {
    if (status === 'In Progress') return 'LIVE';
    return status;
  };

  const normalizeTime = time => {
    const segments = time
      .split(':')
      .map(x => parseInt(x, 10))
      .slice(0, 2);
    const minutes = segments[0] * 60 + segments[1];
    return `${minutes} minutes`;
  };

  const normalizeFlag = team => {
    if (team.links) {
      return team.links.logos.retina;
    }
    return team.useFlag ? team.flag : team.logo;
  };

  let fixtureStatus = (
    <div className="fixture-status">
      <div className="fixture-status-score">
        {props.score ? props.score.homeScore : '-'}
      </div>
      <div className="fixture-status-score">
        {[2, 3].includes(props.status.id) ? (
          [
            <div className="fixture-status-score-live">
              {normalizeStatus(props.status.name)}
            </div>,
            <div className="fixture-status-time">
              {normalizeTime(props.score.liveMatchTime)}
            </div>
          ]
        ) : (
          <div className="fixture-status-score-final">
            {normalizeStatus(props.status.name.toUpperCase())}
          </div>
        )}
      </div>
      <div className="fixture-status-score">
        {props.score ? props.score.awayScore : '-'}
      </div>
    </div>
  );

  // Pregame
  if (props.status.id === 1) {
    fixtureStatus = (
      <div className="fixture-status pregame">
        <div className="fixture-status-score">
          {moment(props.date).format('hh:mm A')}
        </div>
      </div>
    );
  }

  let { venue } = props;
  if (venue && venue.city) {
    venue = `${venue.name}, ${venue.city}`;
  } else {
    venue = 'TBD';
  }

  const hr = props.homeTeam.record;
  const ar = props.awayTeam.record;

  const { style } = props;

  return [
    <div className="match-fixture" style={style}>
      <div className="match-venue-broadcast">
        <div className="match-venue">
          <strong>Venue - </strong>
          {venue}
        </div>
        <div className="match-broadcast-info">
          {props.broadcasts && (
            <div className="tv-channel">
              <Icon fitted name="tv" />{' '}
              {props.broadcasts && props.broadcasts[0].name}
            </div>
          )}
        </div>
      </div>
      <div className="match-fixture-inner">
        <div className="fixture-team">
          <div className="team-label team-label--reverse">
            <Image
              className="team-label-image"
              height="64"
              src={normalizeFlag(props.homeTeam)}
            />
            <div className="team-label-name">
              <strong className='team-name--regular'>{props.homeTeam && props.homeTeam.name}</strong>
              <strong className='team-name--custom'>{props.homeTeam && props.homeTeam.customName}</strong>
              {hr && <div>{`(${hr.wins} - ${hr.ties} - ${hr.losses})`}</div>}
            </div>
          </div>
        </div>
        {fixtureStatus}
        <div className="fixture-team fixture-team--away">
          <div className="team-label">
            <Image
              className="team-label-image"
              height="64"
              src={normalizeFlag(props.awayTeam)}
            />
            <div className="team-label-name">
              <strong className='team-name--regular'>{props.awayTeam && props.awayTeam.name}</strong>
              <strong className='team-name--custom'>{props.awayTeam && props.awayTeam.customName}</strong>
              {ar && <div>{`(${ar.wins} - ${ar.ties} - ${ar.losses})`}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  ];
};

Fixture.defaultProps = {
  homeTeam: { name: 'TBD' },
  awayTeam: { name: 'TBD' },
  score: { homeScore: '-', awayScore: '-' }
};

Fixture.propTypes = {
  homeTeam: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  awayTeam: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  score: PropTypes.shape({
    homeScore: PropTypes.any,
    awayScore: PropTypes.any
  }),
  status: PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
    .isRequired,
  date: PropTypes.string.isRequired
};

export default Fixture;
