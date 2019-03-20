import React from "react";
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { TRANSITION_QUIZ_STATUS } from 'config';

import { SoundControl } from "modules/components";
import QuizStatus from './status/QuizStatus';
import QuestionAnswer from './QuestionAnswer';

class QuizComponent extends React.Component {
	TIME_DELAY_BEFORE_CLOSE = 1500;

	constructor(props) {
    super(props);

    this.state = {
			isDoingQuiz: false,
			isFinishQuiz: false
    };
  }

  startDoingQuiz = () => {
		this.props.getNextQuestions({
      UserID: this.props.userInfo.id,
      PlayerID: this.props.player.id
    });
    this.setState({ isDoingQuiz: true, isFinishQuiz: false });
	}

	finishDoingQuiz = () => {
		if (this.props.finishDoingQuiz) {
			this.props.finishDoingQuiz()
		} else {
			this.setState({ isFinishQuiz: true, isDoingQuiz: false });
			setTimeout(() => {
				this.props.close();
			}, this.TIME_DELAY_BEFORE_CLOSE)
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className="p-quiz">
					<div className="p-quiz__quiz-content">
						<div className="p-quiz__quiz-status">
							<QuizStatus
								userInfo={this.props.userInfo}
								isDoingQuiz={this.state.isDoingQuiz}
								isFinishQuiz={this.state.isFinishQuiz}
								player={this.props.player}
								quiz={this.props.quiz}
								totalQuestions={this.props.quiz.totalQuestions}
								correctAnswer={this.props.quiz.correctAnswer}

								startDoingQuiz={this.startDoingQuiz}
								getNextQuestions={this.props.getNextQuestions}
								closeModal={this.props.close}
							/>
						</div>

						<div className="p-quiz__question-answer">
							<QuestionAnswer
								isDoingQuiz={this.state.isDoingQuiz}
								userInfo={this.props.userInfo}
								player={this.props.player}
								quiz={this.props.quiz}
								totalQuestions={this.props.quiz.totalQuestions}
								correctAnswer={this.props.quiz.correctAnswer}

								finishDoingQuiz={this.finishDoingQuiz}
								getNextQuestions={this.props.getNextQuestions}
								answerQuestion={this.props.answerQuestion}
							/>
						</div>

						{this.props.quiz.showingHint && (
							<div className="p-quiz__sound">
								<CSSTransition classNames="transition-fade" mountOnEnter in={this.state.isDoingQuiz} timeout={TRANSITION_QUIZ_STATUS}>
									<SoundControl message={this.props.quiz.showingHint.Hint} />
								</CSSTransition>
							</div>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

QuizComponent.propTypes = {
	userInfo: PropTypes.object,
	player: PropTypes.object,
	quiz: PropTypes.shape({
		totalQuestions: PropTypes.number,
		isFetching: PropTypes.bool,
		showingQuestion: PropTypes.object,
		showingAnswer: PropTypes.object,
		showingHint: PropTypes.object
	}),

	getNextQuestions: PropTypes.func,
	answerQuestion: PropTypes.func,
	finishDoingQuiz: PropTypes.func
};

export default QuizComponent;