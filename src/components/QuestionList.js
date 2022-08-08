import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions))
  }, [])

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then(() => {
      const minusDeletedQuestions = questions.filter((item) => item.id !== id)
      setQuestions(minusDeletedQuestions)

    })
  }
  
  function AnswerChanged(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex})
    })
      .then((response) => response.json())
      .then((minusDeletedQuestions) => {
        const updatedQuestionAnswers = questions.map((item) => {
          if(item.id === minusDeletedQuestions.id){
            return minusDeletedQuestions
          }else{
            return item
          }
        })
        setQuestions(updatedQuestionAnswers)
      })
  }

  const listQuestions = questions.map((question) => {
    
    return <QuestionItem key={question.id} question={question} onDelete={handleDelete} onAnswerChange={AnswerChanged} />
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {listQuestions} 
      </ul>
    </section>
  );
}

export default QuestionList;
