import React from 'react';
import { path } from 'ramda';
import { CSSTransition } from 'react-transition-group';
import { Progress } from 'antd';

import { SECONDARY_COLOR, TRANSITION_QUIZ_STATUS } from 'config';

export default (props) => {
  return (
    <React.Fragment>
      <CSSTransition mountOnEnter in={props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS} classNames="transition-info">
        <div className="c-before-quiz__goal">
          <p className="c-before-quiz__goal-label">Goal:</p>
          <p className="c-before-quiz__goal-info u-color-secondary">
            <span>{props.correctAnswer}/{props.totalQuestions}</span>
            <span className="u-mgl-5">task</span>
          </p>
        </div>
      </CSSTransition>

      <CSSTransition mountOnEnter in={props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS} classNames="transition-info">
        <div className="c-before-quiz__topic">
          <p className="c-before-quiz__topic-label">Topic:</p>
          <p className="c-before-quiz__topic-info u-color-secondary">
            <span>{path(['quiz', 'showingQuestion', 'topic'], props) || props.player.topic}</span>
          </p>
        </div>
      </CSSTransition>

      <CSSTransition appear in={props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS} classNames="transition-progress">
        <div className="c-before-quiz__progress">
          <Progress percent={props.correctAnswer / props.totalQuestions * 100} showInfo={false} strokeWidth ={15} strokeColor={SECONDARY_COLOR} />
        </div>
      </CSSTransition>
    </React.Fragment>
  );
}