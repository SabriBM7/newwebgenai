"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash, Edit, Eye, Save, ArrowLeft, ArrowRight, Check, X } from "lucide-react"

interface QuizQuestion {
    id: string
    type: "multiple-choice" | "single-choice" | "true-false" | "text"
    question: string
    options?: { id: string; text: string; isCorrect: boolean }[]
    correctAnswer?: string
    explanation?: string
    points: number
}

interface Quiz {
    id: string
    title: string
    description: string
    timeLimit?: number
    passingScore?: number
    questions: QuizQuestion[]
}

interface InteractiveQuizBuilderProps {
    initialQuiz?: Quiz
    onSave?: (quiz: Quiz) => void
    onPreview?: (quiz: Quiz) => void
    className?: string
}

const defaultQuiz: Quiz = {
    id: "default-quiz",
    title: "Web Development Fundamentals",
    description: "Test your knowledge of HTML, CSS, and JavaScript basics",
    timeLimit: 15,
    passingScore: 70,
    questions: [
        {
            id: "q1",
            type: "single-choice",
            question: "What does HTML stand for?",
            options: [
                { id: "q1-a", text: "Hyper Text Markup Language", isCorrect: true },
                { id: "q1-b", text: "High Tech Modern Language", isCorrect: false },
                { id: "q1-c", text: "Hyperlink and Text Markup Language", isCorrect: false },
                { id: "q1-d", text: "Home Tool Markup Language", isCorrect: false },
            ],
            explanation:
                "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.",
            points: 10,
        },
        {
            id: "q2",
            type: "multiple-choice",
            question: "Which of the following are CSS preprocessors?",
            options: [
                { id: "q2-a", text: "SASS", isCorrect: true },
                { id: "q2-b", text: "LESS", isCorrect: true },
                { id: "q2-c", text: "Stylus", isCorrect: true },
                { id: "q2-d", text: "Bootstrap", isCorrect: false },
            ],
            explanation: "SASS, LESS, and Stylus are CSS preprocessors that extend CSS with variables, nesting, and more.",
            points: 15,
        },
        {
            id: "q3",
            type: "true-false",
            question: "JavaScript is a statically typed language.",
            options: [
                { id: "q3-a", text: "True", isCorrect: false },
                { id: "q3-b", text: "False", isCorrect: true },
            ],
            explanation: "JavaScript is a dynamically typed language, which means variable types are determined at runtime.",
            points: 5,
        },
    ],
}

export default function InteractiveQuizBuilder({
                                                   initialQuiz = defaultQuiz,
                                                   onSave,
                                                   onPreview,
                                                   className,
                                               }: InteractiveQuizBuilderProps) {
    const [quiz, setQuiz] = useState<Quiz>(initialQuiz)
    const [activeTab, setActiveTab] = useState<string>("edit")
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null)
    const [previewMode, setPreviewMode] = useState<boolean>(false)
    const [previewAnswers, setPreviewAnswers] = useState<Record<string, string | string[]>>({})
    const [showResults, setShowResults] = useState<boolean>(false)

    const addNewQuestion = () => {
        const newQuestion: QuizQuestion = {
            id: `q${Date.now()}`,
            type: "single-choice",
            question: "",
            options: [
                { id: `q${Date.now()}-a`, text: "", isCorrect: false },
                { id: `q${Date.now()}-b`, text: "", isCorrect: false },
            ],
            explanation: "",
            points: 10,
        }

        setQuiz({
            ...quiz,
            questions: [...quiz.questions, newQuestion],
        })

        setCurrentQuestionIndex(quiz.questions.length)
        setEditingQuestion(newQuestion)
    }

    const updateQuestion = (updatedQuestion: QuizQuestion) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
        })
        setEditingQuestion(null)
    }

    const deleteQuestion = (questionId: string) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.filter((q) => q.id !== questionId),
        })

        if (currentQuestionIndex >= quiz.questions.length - 1) {
            setCurrentQuestionIndex(Math.max(0, quiz.questions.length - 2))
        }
    }

    const moveQuestion = (questionId: string, direction: "up" | "down") => {
        const currentIndex = quiz.questions.findIndex((q) => q.id === questionId)
        if (
            (direction === "up" && currentIndex === 0) ||
            (direction === "down" && currentIndex === quiz.questions.length - 1)
        ) {
            return
        }

        const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
        const newQuestions = [...quiz.questions]
        const [movedQuestion] = newQuestions.splice(currentIndex, 1)
        newQuestions.splice(newIndex, 0, movedQuestion)

        setQuiz({
            ...quiz,
            questions: newQuestions,
        })

        setCurrentQuestionIndex(newIndex)
    }

    const handleQuizInfoChange = (field: keyof Quiz, value: string | number) => {
        setQuiz({
            ...quiz,
            [field]: value,
        })
    }

    const startPreview = () => {
        setPreviewMode(true)
        setCurrentQuestionIndex(0)
        setPreviewAnswers({})
        setShowResults(false)
    }

    const endPreview = () => {
        setPreviewMode(false)
    }

    const handlePreviewAnswer = (questionId: string, answer: string | string[]) => {
        setPreviewAnswers({
            ...previewAnswers,
            [questionId]: answer,
        })
    }

    const calculateScore = () => {
        let earnedPoints = 0
        let totalPoints = 0

        quiz.questions.forEach((question) => {
            totalPoints += question.points

            const userAnswer = previewAnswers[question.id]
            if (!userAnswer) return

            if (question.type === "single-choice" || question.type === "true-false") {
                const correctOption = question.options?.find((opt) => opt.isCorrect)
                if (correctOption && userAnswer === correctOption.id) {
                    earnedPoints += question.points
                }
            } else if (question.type === "multiple-choice" && Array.isArray(userAnswer)) {
                const correctOptions = question.options?.filter((opt) => opt.isCorrect).map((opt) => opt.id) || []
                const isCorrect =
                    correctOptions.length === userAnswer.length && correctOptions.every((id) => userAnswer.includes(id))

                if (isCorrect) {
                    earnedPoints += question.points
                }
            } else if (question.type === "text" && typeof userAnswer === "string") {
                if (userAnswer.toLowerCase() === question.correctAnswer?.toLowerCase()) {
                    earnedPoints += question.points
                }
            }
        })

        const percentage = Math.round((earnedPoints / totalPoints) * 100)
        const passed = percentage >= (quiz.passingScore || 0)

        return {
            earnedPoints,
            totalPoints,
            percentage,
            passed,
        }
    }

    const currentQuestion = quiz.questions[currentQuestionIndex]

    return (
        <div className={className}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="edit" disabled={previewMode}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Quiz
                    </TabsTrigger>
                    <TabsTrigger value="preview" onClick={startPreview}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Quiz
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="space-y-4">
                    {!editingQuestion ? (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quiz Information</CardTitle>
                                    <CardDescription>Set up the basic details for your quiz</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Quiz Title</Label>
                                        <Input
                                            id="title"
                                            value={quiz.title}
                                            onChange={(e) => handleQuizInfoChange("title", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={quiz.description}
                                            onChange={(e) => handleQuizInfoChange("description", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                                            <Input
                                                id="timeLimit"
                                                type="number"
                                                value={quiz.timeLimit || ""}
                                                onChange={(e) => handleQuizInfoChange("timeLimit", Number.parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="passingScore">Passing Score (%)</Label>
                                            <Input
                                                id="passingScore"
                                                type="number"
                                                value={quiz.passingScore || ""}
                                                onChange={(e) => handleQuizInfoChange("passingScore", Number.parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Questions</CardTitle>
                                        <CardDescription>Manage your quiz questions</CardDescription>
                                    </div>
                                    <Button onClick={addNewQuestion}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Question
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {quiz.questions.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            No questions yet. Click "Add Question" to create your first question.
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {quiz.questions.map((question, index) => (
                                                <div
                                                    key={question.id}
                                                    className={`p-3 border rounded-md flex items-center justify-between ${
                                                        index === currentQuestionIndex ? "border-primary bg-primary/5" : ""
                                                    }`}
                                                    onClick={() => setCurrentQuestionIndex(index)}
                                                >
                                                    <div>
                                                        <div className="font-medium">Question {index + 1}</div>
                                                        <div className="text-sm text-muted-foreground truncate max-w-md">
                                                            {question.question || "No question text"}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="icon" onClick={() => setEditingQuestion(question)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => moveQuestion(question.id, "up")}
                                                            disabled={index === 0}
                                                        >
                                                            <ArrowLeft className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => moveQuestion(question.id, "down")}
                                                            disabled={index === quiz.questions.length - 1}
                                                        >
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => deleteQuestion(question.id)}>
                                                            <Trash className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <div className="text-sm text-muted-foreground">Total questions: {quiz.questions.length}</div>
                                    <Button onClick={() => onSave && onSave(quiz)}>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Quiz
                                    </Button>
                                </CardFooter>
                            </Card>
                        </>
                    ) : (
                        <QuestionEditor
                            question={editingQuestion}
                            onSave={updateQuestion}
                            onCancel={() => setEditingQuestion(null)}
                        />
                    )}
                </TabsContent>

                <TabsContent value="preview">
                    {previewMode && !showResults ? (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{quiz.title}</CardTitle>
                                        <CardDescription>{quiz.description}</CardDescription>
                                    </div>
                                    <div className="text-sm">
                                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {currentQuestion && (
                                    <QuestionPreview
                                        question={currentQuestion}
                                        answer={previewAnswers[currentQuestion.id]}
                                        onAnswer={(answer) => handlePreviewAnswer(currentQuestion.id, answer)}
                                    />
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    Previous
                                </Button>

                                {currentQuestionIndex < quiz.questions.length - 1 ? (
                                    <Button
                                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                                        disabled={!previewAnswers[currentQuestion?.id]}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setShowResults(true)}
                                        disabled={Object.keys(previewAnswers).length < quiz.questions.length}
                                    >
                                        Finish Quiz
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ) : showResults ? (
                        <QuizResults
                            quiz={quiz}
                            answers={previewAnswers}
                            score={calculateScore()}
                            onRetake={() => {
                                setPreviewAnswers({})
                                setCurrentQuestionIndex(0)
                                setShowResults(false)
                            }}
                            onExit={endPreview}
                        />
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Quiz Preview</CardTitle>
                                <CardDescription>See how your quiz will appear to students</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center py-8">
                                <h3 className="text-2xl font-bold mb-2">{quiz.title}</h3>
                                <p className="text-muted-foreground mb-6">{quiz.description}</p>
                                {quiz.timeLimit && (
                                    <div className="mb-4">
                                        <span className="font-medium">Time Limit:</span> {quiz.timeLimit} minutes
                                    </div>
                                )}
                                {quiz.passingScore && (
                                    <div className="mb-6">
                                        <span className="font-medium">Passing Score:</span> {quiz.passingScore}%
                                    </div>
                                )}
                                <div className="mb-4">
                                    <span className="font-medium">Questions:</span> {quiz.questions.length}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={startPreview}>
                                    Start Quiz
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

function QuestionEditor({
                            question,
                            onSave,
                            onCancel,
                        }: {
    question: QuizQuestion
    onSave: (question: QuizQuestion) => void
    onCancel: () => void
}) {
    const [editedQuestion, setEditedQuestion] = useState<QuizQuestion>(question)

    const updateQuestionField = (field: keyof QuizQuestion, value: any) => {
        setEditedQuestion({
            ...editedQuestion,
            [field]: value,
        })
    }

    const updateOption = (optionId: string, field: "text" | "isCorrect", value: string | boolean) => {
        setEditedQuestion({
            ...editedQuestion,
            options: editedQuestion.options?.map((opt) => (opt.id === optionId ? { ...opt, [field]: value } : opt)),
        })
    }

    const addOption = () => {
        if (!editedQuestion.options) {
            editedQuestion.options = []
        }

        setEditedQuestion({
            ...editedQuestion,
            options: [...editedQuestion.options, { id: `opt-${Date.now()}`, text: "", isCorrect: false }],
        })
    }

    const removeOption = (optionId: string) => {
        setEditedQuestion({
            ...editedQuestion,
            options: editedQuestion.options?.filter((opt) => opt.id !== optionId),
        })
    }

    const handleTypeChange = (newType: QuizQuestion["type"]) => {
        let updatedOptions = editedQuestion.options || []

        if (newType === "true-false") {
            updatedOptions = [
                { id: `tf-true-${Date.now()}`, text: "True", isCorrect: false },
                { id: `tf-false-${Date.now()}`, text: "False", isCorrect: false },
            ]
        } else if (newType === "text") {
            updatedOptions = []
        } else if (updatedOptions.length === 0) {
            updatedOptions = [
                { id: `opt-a-${Date.now()}`, text: "", isCorrect: false },
                { id: `opt-b-${Date.now()}`, text: "", isCorrect: false },
            ]
        }

        setEditedQuestion({
            ...editedQuestion,
            type: newType,
            options: updatedOptions,
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Question Type</Label>
                    <RadioGroup
                        value={editedQuestion.type}
                        onValueChange={(value) => handleTypeChange(value as QuizQuestion["type"])}
                        className="flex flex-wrap gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single-choice" id="single-choice" />
                            <Label htmlFor="single-choice">Single Choice</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multiple-choice" id="multiple-choice" />
                            <Label htmlFor="multiple-choice">Multiple Choice</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true-false" id="true-false" />
                            <Label htmlFor="true-false">True/False</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="text" id="text" />
                            <Label htmlFor="text">Text Answer</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="question-text">Question Text</Label>
                    <Textarea
                        id="question-text"
                        value={editedQuestion.question}
                        onChange={(e) => updateQuestionField("question", e.target.value)}
                        placeholder="Enter your question here"
                        className="min-h-[100px]"
                    />
                </div>

                {editedQuestion.type !== "text" ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Answer Options</Label>
                            {editedQuestion.type !== "true-false" && (
                                <Button variant="outline" size="sm" onClick={addOption}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Option
                                </Button>
                            )}
                        </div>

                        <div className="space-y-2">
                            {editedQuestion.options?.map((option, index) => (
                                <div key={option.id} className="flex items-center gap-3">
                                    {editedQuestion.type === "multiple-choice" ? (
                                        <Checkbox
                                            checked={option.isCorrect}
                                            onCheckedChange={(checked) => updateOption(option.id, "isCorrect", !!checked)}
                                        />
                                    ) : (
                                        <RadioGroup
                                            value={editedQuestion.options?.find((opt) => opt.isCorrect)?.id || ""}
                                            onValueChange={(value) => {
                                                editedQuestion.options?.forEach((opt) => {
                                                    updateOption(opt.id, "isCorrect", opt.id === value)
                                                })
                                            }}
                                        >
                                            <RadioGroupItem value={option.id} id={option.id} />
                                        </RadioGroup>
                                    )}

                                    <Input
                                        value={option.text}
                                        onChange={(e) => updateOption(option.id, "text", e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        disabled={editedQuestion.type === "true-false"}
                                        className="flex-1"
                                    />

                                    {editedQuestion.type !== "true-false" && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeOption(option.id)}
                                            disabled={editedQuestion.options && editedQuestion.options.length <= 2}
                                        >
                                            <Trash className="h-4 w-4 text-red-500" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label htmlFor="correct-answer">Correct Answer</Label>
                        <Input
                            id="correct-answer"
                            value={editedQuestion.correctAnswer || ""}
                            onChange={(e) => updateQuestionField("correctAnswer", e.target.value)}
                            placeholder="Enter the correct answer"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="explanation">Explanation (Optional)</Label>
                    <Textarea
                        id="explanation"
                        value={editedQuestion.explanation || ""}
                        onChange={(e) => updateQuestionField("explanation", e.target.value)}
                        placeholder="Explain why the answer is correct"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="points">Points</Label>
                    <Input
                        id="points"
                        type="number"
                        value={editedQuestion.points}
                        onChange={(e) => updateQuestionField("points", Number.parseInt(e.target.value) || 0)}
                        min="0"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={() => onSave(editedQuestion)}>Save Question</Button>
            </CardFooter>
        </Card>
    )
}

function QuestionPreview({
                             question,
                             answer,
                             onAnswer,
                         }: {
    question: QuizQuestion
    answer: string | string[] | undefined
    onAnswer: (answer: string | string[]) => void
}) {
    const handleSingleChoice = (optionId: string) => {
        onAnswer(optionId)
    }

    const handleMultipleChoice = (optionId: string, checked: boolean) => {
        const currentAnswers = Array.isArray(answer) ? answer : []

        if (checked) {
            onAnswer([...currentAnswers, optionId])
        } else {
            onAnswer(currentAnswers.filter((id) => id !== optionId))
        }
    }

    const handleTextAnswer = (text: string) => {
        onAnswer(text)
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">{question.question}</h3>

            {question.type === "text" ? (
                <div className="space-y-2">
                    <Label htmlFor="text-answer">Your Answer</Label>
                    <Textarea
                        id="text-answer"
                        value={(answer as string) || ""}
                        onChange={(e) => handleTextAnswer(e.target.value)}
                        placeholder="Type your answer here"
                        className="min-h-[100px]"
                    />
                </div>
            ) : question.type === "multiple-choice" ? (
                <div className="space-y-3">
                    {question.options?.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={option.id}
                                checked={Array.isArray(answer) && answer.includes(option.id)}
                                onCheckedChange={(checked) => handleMultipleChoice(option.id, !!checked)}
                            />
                            <Label htmlFor={option.id} className="cursor-pointer">
                                {option.text}
                            </Label>
                        </div>
                    ))}
                </div>
            ) : (
                <RadioGroup value={answer as string} onValueChange={handleSingleChoice}>
                    <div className="space-y-3">
                        {question.options?.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.id} id={option.id} />
                                <Label htmlFor={option.id} className="cursor-pointer">
                                    {option.text}
                                </Label>
                            </div>
                        ))}
                    </div>
                </RadioGroup>
            )}
        </div>
    )
}

function QuizResults({
                         quiz,
                         answers,
                         score,
                         onRetake,
                         onExit,
                     }: {
    quiz: Quiz
    answers: Record<string, string | string[]>
    score: {
        earnedPoints: number
        totalPoints: number
        percentage: number
        passed: boolean
    }
    onRetake: () => void
    onExit: () => void
}) {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quiz Results</CardTitle>
                <CardDescription>{quiz.title}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                    <div
                        className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                            score.passed ? "bg-green-100" : "bg-red-100"
                        }`}
                    >
            <span className={`text-4xl font-bold ${score.passed ? "text-green-600" : "text-red-600"}`}>
              {score.percentage}%
            </span>
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${score.passed ? "text-green-600" : "text-red-600"}`}>
                        {score.passed ? "Passed!" : "Not Passed"}
                    </h3>

                    <p className="text-center text-muted-foreground mb-6">
                        You scored {score.earnedPoints} out of {score.totalPoints} points
                        {quiz.passingScore && <span> (passing score: {quiz.passingScore}%)</span>}
                    </p>

                    <div className="w-full max-w-md space-y-4">
                        <h4 className="font-semibold">Question Summary</h4>

                        {quiz.questions.map((question, index) => {
                            const userAnswer = answers[question.id]
                            let isCorrect = false

                            if (question.type === "single-choice" || question.type === "true-false") {
                                const correctOption = question.options?.find((opt) => opt.isCorrect)
                                isCorrect = correctOption?.id === userAnswer
                            } else if (question.type === "multiple-choice" && Array.isArray(userAnswer)) {
                                const correctOptions = question.options?.filter((opt) => opt.isCorrect).map((opt) => opt.id) || []
                                isCorrect =
                                    correctOptions.length === userAnswer.length && correctOptions.every((id) => userAnswer.includes(id))
                            } else if (question.type === "text" && typeof userAnswer === "string") {
                                isCorrect = userAnswer.toLowerCase() === question.correctAnswer?.toLowerCase()
                            }

                            return (
                                <div
                                    key={question.id}
                                    className={`p-3 border rounded-md ${
                                        isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {isCorrect ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}
                                        <span className="font-medium">Question {index + 1}</span>
                                    </div>
                                    <p className="text-sm mb-1 truncate">{question.question}</p>
                                    {question.explanation && <p className="text-xs text-muted-foreground">{question.explanation}</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={onRetake}>
                    Retake Quiz
                </Button>
                <Button onClick={onExit}>Exit</Button>
            </CardFooter>
        </Card>
    )
}
