import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { equals, path } from 'ramda';

import { Spin, Icon } from 'antd';

import { CSSTransition } from 'react-transition-group';
import {  TRANSITION_QUIZ_STATUS } from 'config';

import { classes } from 'utils/common';

class QuestionAnswer extends React.Component {
  DELAY_BEFORE_GET_NEXT_QUESTION = 1500;
  TOTAL_QUESTIONS = 4;

  constructor(props) {
    super(props);

    this.timeStartQuestion = moment();
    this.state = {
      choosedAnswer: ''
    };
  }

  get listAnswers() {
    return path(['random'], this.props.quiz.showingAnswer) || Array(this.TOTAL_QUESTIONS).fill()
  }

  get correctAnswer() {
    return path(['correct'], this.props.quiz.showingAnswer);
  }

  isCorrectAnswer(answer) {
    return (
      this.state.choosedAnswer === answer
      && this.state.choosedAnswer === this.correctAnswer
    );
  }

  isWrongAnswer(answer) {
    return (
      this.state.choosedAnswer === answer
      && this.state.choosedAnswer !== this.correctAnswer
    );
  }

  componentDidUpdate(prevProps) {
    if (!equals(prevProps.quiz.showingQuestion, this.props.quiz.showingQuestion)) {
      this.timeStartQuestion = moment();
    }
  }

  selectAnswer = (answer) => () => {
    if (this.props.quiz.showingQuestion) {
      this.setState({ choosedAnswer: answer });
      this.props.answerQuestion(this.props.quiz.showingQuestion.id, {
        result: answer === this.correctAnswer,
        answerSelected: this.props.quiz.showingAnswer.items.indexOf(answer),
        timeAsked: this.timeStartQuestion.toISOString(),
        taken: moment().diff(this.timeStartQuestion)
      });
      this.waitAndGetNextQuestion();
    }
  }

  waitAndGetNextQuestion() {
    setTimeout(() => {
      if (this.props.correctAnswer === this.props.totalQuestions) {
        this.props.finishDoingQuiz();
      } else {
        this.setState({ choosedAnswer: '' });
        this.props.getNextQuestions({
          UserID: this.props.userInfo.id,
          PlayerID: this.props.player.id
        });
      }
    }, this.DELAY_BEFORE_GET_NEXT_QUESTION);
  }

  render() {
    return (
      <CSSTransition mountOnEnter unmountOnExit classNames="transition-question-answer" in={this.props.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS}>
        {(state) => (
          <div className="p-question-answer">
            <div className="p-question-answer__question">
              {this.props.quiz.isFetching
              ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24, color: '#fff' }} spin />} />
              : this.props.quiz.showingQuestion ? this.props.quiz.showingQuestion.name : ''}
            </div>
            <div className={classes("p-question-answer__list-answers", {
              'p-question-answer__list-answers--2-col': true
            })}>
              {this.listAnswers.map((answer, index) => (
                <div
                  key={index}
                  className={classes("p-question-answer__answer", {
                    'p-question-answer__answer--choosed': !!this.state.choosedAnswer,
                    'p-question-answer__answer--correct': this.isCorrectAnswer(answer),
                    'p-question-answer__answer--wrong': this.isWrongAnswer(answer),
                    'u-disabled-element': this.props.quiz.isFetching || state === 'entering' || state === 'exiting'
                  })}
                  onClick={this.selectAnswer(answer)}
                >
                  {this.props.quiz.isFetching
                  ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24, color: '#333' }} spin />} />
                  : answer}
                </div>
              ))}
            </div>
          </div>
        )}
      </CSSTransition>
    );
  }
}

QuestionAnswer.propTypes = {
  isDoingQuiz: PropTypes.bool,
  quiz: PropTypes.object
}

export default QuestionAnswer;