import React from "react";

function QuestionItem({ question, onDelete, onAnswerChange }) {
  console.log(question)
  const { id, prompt, answers, correctIndex } = question;
  console.log(answers)
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  
  function deleteButton(){
    onDelete(id)
  }
  function answerChanged(event){
    onAnswerChange(id, parseInt(event.target.value))
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={answerChanged}>{options}</select>
      </label>
      <button onClick={deleteButton}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
