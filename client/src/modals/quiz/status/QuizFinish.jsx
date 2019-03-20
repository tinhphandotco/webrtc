import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { TRANSITION_QUIZ_STATUS } from 'config';
import { staticUrl } from 'utils/common';

export default (props) => {
  return (
    <React.Fragment>
      <CSSTransition in={props.isFinishQuiz} timeout={TRANSITION_QUIZ_STATUS / 2} classNames="transition-fade" unmountOnExit={false}>
        <h3 className="c-before-quiz__welcome u-color-grey u-text-center">Great job,</h3>
      </CSSTransition>

      <CSSTransition in={props.isFinishQuiz} timeout={TRANSITION_QUIZ_STATUS / 2} classNames="transition-fade" unmountOnExit={false}>
        <h3 className="c-before-quiz__player-name u-color-secondary u-text-center">{props.player.name}</h3>
      </CSSTransition>

      <CSSTransition in={props.isFinishQuiz} timeout={TRANSITION_QUIZ_STATUS / 2} classNames="transition-fade" unmountOnExit={false}>
        <div className="c-before-quiz__challenge">
          <div className="c-before-quiz__challenge-image">
            <img src={staticUrl('assets/images/success.png')} />
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={props.isFinishQuiz} timeout={TRANSITION_QUIZ_STATUS / 2} classNames="transition-fade" unmountOnExit={false}>
        <div className="c-before-quiz__actions">
          <button
            className="o-button o-button--large o-button--wide o-button--orange o-button--rounded u-color-white"
            onClick={props.closeModal}
          >Complete</button>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
}