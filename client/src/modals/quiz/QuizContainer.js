import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { notification } from 'antd';
import { PlayerActions, LearnActions, QuizActions } from 'actions';
import { getUserInfo } from 'reducers/auth/select';
import { getSelectedPlayer } from 'reducers/player/select';
import {
	getTotalQuestions,
	isFetching,
	errorMessage,
	getShowingQuestion,
	getShowingAnswer,
	getCorrectAnswer,
	getShowingHint
} from 'reducers/quiz/select';

import QuizComponent from './QuizComponent';

const mapStateToProps = (state, props) => {
	return {
		userInfo: getUserInfo(state.auth),
		player: getSelectedPlayer(state.player),
		quiz: {
			totalQuestions: getTotalQuestions(state.quiz),
			correctAnswer: getCorrectAnswer(state.quiz),
			showingQuestion: getShowingQuestion(state.quiz),
			showingAnswer: getShowingAnswer(state.quiz),
			showingHint: getShowingHint(state.quiz),
			isFetching: isFetching(state.quiz),
			errorMessage: errorMessage(state.quiz)
		}
	}
};

const { getNextQuestions, answerQuestion, resetQuestions } = QuizActions;
const mapDispatchToProps = (dispatch) => {
	dispatch(resetQuestions());

	return {
		getNextQuestions: (...params) => dispatch(getNextQuestions(...params)),
		answerQuestion: (...params) => dispatch(answerQuestion(...params)),
	}
}

@connect(mapStateToProps, mapDispatchToProps)
class QuizContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		if (this.props.quiz.errorMessage) {
			notification.error({
				message: this.props.quiz.errorMessage
			});
			this.props.close();
		}
	}

	render() {
		return (
			<QuizComponent {...this.props} />
		);
	}
}

QuizContainer.propTypes = {
	userInfo: PropTypes.object,
	player: PropTypes.object,
	quiz: PropTypes.shape({
		totalQuestions: PropTypes.number,
		isFetching: PropTypes.bool,
		showingQuestion: PropTypes.object,
		showingAnswer: PropTypes.object,
		showingHint: PropTypes.object
	}),

	close: PropTypes.func,
	getNextQuestions: PropTypes.func,
	answerQuestion: PropTypes.func
};

export default QuizContainer;
