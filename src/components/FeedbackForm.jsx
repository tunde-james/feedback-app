import { useState } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'

function FeedbackForm({ handleAdd }) {
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleReviewChange = (e) => {
    if (review === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (review !== '' && review.trim().length <= 10) {
      setMessage('Review must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setReview(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (review.trim().length > 10) {
      const newFeedback = {
        review,
        rating,
      }

      handleAdd(newFeedback)

      setReview('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            onChange={handleReviewChange}
            value={review}
            placeholder="Write a review"
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
