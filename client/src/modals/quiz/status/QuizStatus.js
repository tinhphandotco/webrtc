import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';

import { TRANSITION_QUIZ_STATUS } from 'config';
import { staticUrl, classes } from 'utils/common';

import QuizBegin from './QuizBegin';
import QuizDoing from './QuizDoing';
import QuizFinish from './QuizFinish';

class QuizStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={classes("c-before-quiz", {
          'c-before-quiz--doing-quiz': this.props.isDoingQuiz
        })}>
          <div className="c-before-quiz__user-avatar">
            <img src={staticUrl('assets/images/avatar/' + this.props.player.avatar)} />
          </div>

          <CSSTransition in={this.props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS} classNames="transition-logo">
            <div className="c-before-quiz__logo">
              <img src={staticUrl('assets/images/logo.png')} />
            </div>
          </CSSTransition>

          {!this.props.isDoingQuiz && !this.props.isFinishQuiz && (
            <QuizBegin
              isDoingQuiz={this.props.isDoingQuiz}
              player={this.props.player}
              startDoingQuiz={this.props.startDoingQuiz}
              totalQuestions={this.props.totalQuestions}
            />
          )}

          {this.props.isDoingQuiz && !this.props.isFinishQuiz && (
            <QuizDoing
              isDoingQuiz={this.props.isDoingQuiz}
              player={this.props.player}
              startDoingQuiz={this.props.startDoingQuiz}
              correctAnswer={this.props.correctAnswer}
              totalQuestions={this.props.totalQuestions}
              quiz={this.props.quiz}
            />
          )}

          {!this.props.isDoingQuiz && this.props.isFinishQuiz && (
            <QuizFinish
              isFinishQuiz={this.props.isFinishQuiz}
              player={this.props.player}
              closeModal={this.props.closeModal}
            />
          )}
        </div>
    );
  }
}

QuizStatus.propTypes = {
  isDoingQuiz: PropTypes.bool,
  totalQuestions: PropTypes.number,
  player: PropTypes.object.isRequired,
  startDoingQuiz: PropTypes.func,
  getNextQuestions: PropTypes.func,
  quiz: PropTypes.object
}

export default QuizStatus;