import React, { PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import * as colors from 'material-ui/styles/colors'
// import RaisedButton from 'material-ui/RaisedButton'
import Button from '../../../components/atoms/BaseButton'
import Input from '../../atoms/BaseInput'
import Answer from '../Answer'

const style = {
  width: 800,
  margin: 30,
  textAlign: 'center',
  display: 'inline-block',
  padding: '20px 20px 20px 20px',
}

const Question = ({ onClickAnswer, onClickDelete, ...props }) => {
  const q = props.question
  const a = props.answer
  const selectedId = (a !== undefined && q.resolved) ? a.find(x => x.id === q.selected).id : undefined

  let answer
  const resolved = (q.resolved !== undefined) ? q.resolved.toString() : ''
  const onClickAnswerButton = () => {
    if (answer) {
      onClickAnswer(answer.value, props.user.profile.username, q.postId)
      answer = ''
    }
  }

  const onClickDeleteButton = () => {
    onClickDelete(q.postId)
  }

  const displayTags = (tags) => {
    return tags.reduce((accum, value) => {
      return `${accum} #${value}`
    }, '')
  }

  const formatDue = (due) => {
    const d = new Date(due)
    return d.toLocaleString()
  }

  const isOwner = (q.author === props.user.profile.username)
  return (
    <div style={{ textAlign: 'center', margin: '40px 0px' }}>
      <Card style={style}>
        <CardTitle title={q.title} titleStyle={{ fontSize: 30, color: colors.indigo500 }} style={{ padding: '16px 0px 0px 0px' }} />
        <CardText style={{ fontSize: 16, color: colors.orange800, padding: '0px' }} >
          {displayTags(q.tags)}
        </CardText>
        <CardText style={{ fontSize: 14, color: colors.grey500, padding: '10px' }} >
          {'~'}{formatDue(q.due)}
        </CardText>
        <CardText>
          <div style={{ fontSize: 20, textAlign: 'center', padding: '20px' }} >
            {q.content}
            <br /><br />
          </div>
        </CardText>
        {isOwner ? (
          <Button className={'delete-button'} type={'submit'} onClick={onClickDeleteButton}>Delete</Button>
          ) : ('')}
        {(!isOwner && q.resolved) ? (
          <CardText style={{ fontSize: 16, color: colors.orange600, padding: '10px' }} >
            {'Sorry! This question is already finished!'}
          </CardText>
        ) : ('')}
        {(!isOwner && !q.resolved) ? (
          <CardText style={{ fontSize: 16, textAlign: 'center', color: colors.indigo400 }}>
            {'Write an answer and get '}
            <span style={{ fontSize: 24, color: colors.orange700 }}>{q.bounty}</span>
            {' credit'}
          </CardText>
        ) : ('')}
        {(!isOwner && !q.resolved) ? (
          <CardActions actAsExpander>
            <Button className={'answer-button'} type={'submit'} onClick={onClickAnswerButton}>Answer</Button>
          </CardActions>
          ) : ('')}
        <CardText expandable={!q.resolved}>
          {(!isOwner && !q.resolved) ? (
            <Input
              style={{ textAlign: 'left' }}
              fullWidth
              className={'answer'} floatingLabelText="Answer Contents"
              multiLine rows={3}
              floatingLabelFixed
              onChange={node => { answer = node.target }}
            />) : ('')}
        </CardText>
        <CardText>
          {Object.values(a).map((questionAnswer) =>
            <Answer
              key={questionAnswer.id}
              username={props.user.profile.username}
              question={q}
              answer={questionAnswer}
              selected={questionAnswer.id === selectedId}
            />
          )}
        </CardText>
      </Card>
    </div>
  )
}

Question.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  due: PropTypes.string,
  resolved: PropTypes.bool,
  bounty: PropTypes.number,
  author: PropTypes.string,
  tags: PropTypes.string,
  reverse: PropTypes.bool,
  onClickAnswer: PropTypes.func,
  onClickDelete: PropTypes.func,
  question: PropTypes.object,
  user: PropTypes.object,
  answer: PropTypes.array,
}

export default Question
