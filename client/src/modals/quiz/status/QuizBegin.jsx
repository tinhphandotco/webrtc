import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { TRANSITION_QUIZ_STATUS } from 'config';
import { staticUrl } from 'utils/common';

export default (props) => {
  return (
    <React.Fragment>
      <CSSTransition in={!props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS / 2} classNames="transition-fade" unmountOnExit={false}>
        <h3 className="c-before-quiz__welcome u-color-grey u-text-center">Good morning,</h3>
      </CSSTransition>

      <CSSTransition in={!props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS / 2} classNames="transition-fade" unmountOnExit={false}>
        <h3 className="c-before-quiz__player-name u-color-secondary u-text-center">{props.player.name}</h3>
      </CSSTransition>

      <CSSTransition in={!props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS / 2} classNames="transition-fade" unmountOnExit={false}>
        <div className="c-before-quiz__challenge">
          <div className="c-before-quiz__challenge-image">
            <img src={staticUrl('assets/images/OK.png')} />
          </div>
          <div className="c-before-quiz__challenge-description">
            <h4 className="c-before-quiz__challenge-description__label">Your challenge is to get...</h4>
            <div className="c-before-quiz__challenge-description__num u-text-center o-button o-button--primary o-button--half-rounded">
              <span>{props.totalQuestions}</span>
              <span className="u-mgl-5">correct</span>
            </div>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={!props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS / 2} classNames="transition-fade" unmountOnExit={false}>
        <div className="c-before-quiz__actions">
          <button onClick={props.startDoingQuiz} className="o-button o-button--large o-button--wide o-button--orange o-button--rounded">Begin</button>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
}