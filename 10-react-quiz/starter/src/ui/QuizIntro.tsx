function QuizIntro({
  action,
  numberOfQuestions,
}: {
  action: () => void;
  numberOfQuestions: number;
}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numberOfQuestions} questions to test your React mastery</h3>
      <button className="btn" onClick={action}>
        Let's start
      </button>
    </div>
  );
}

export default QuizIntro;
