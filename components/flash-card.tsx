'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, ArrowRight } from "lucide-react"
import { useState } from "react"

interface Flashcard {
    question: string
    answer: string
}


export default function Flashcard() {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [flip, setFlip] = useState<boolean>(false)
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [topic, setTopic] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    function handleFlip() {
        setFlip(!flip)
    }

    function handleNext() {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
        setFlip(false)
    }

    async function handleGenerateFlashcards() {
        setLoading(true)
        try {
            const response = await fetch("/api/generate-flashcards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic }),
            })
            const data: Flashcard[] = await response.json()
            setFlashcards(data)
            setCurrentIndex(0)
            setFlip(false)
        } catch (error) {
            console.error('Error generating flashcards:', error)
        } finally {
            setLoading(false)
        }
    }
    const currentCard = flashcards[currentIndex]

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Flashcard App</CardTitle>
                </CardHeader>
                <CardContent>
                    <Card className="bg-secondary">
                        <CardContent className="p-6 h-64 flex flex-col justify-center items-center">
                            {currentCard ? (
                                <>
                                    <h2 className="text-xl font-semibold mb-4">{currentCard.question}</h2>
                                    {flip && <p className="text-muted-foreground">{currentCard.answer}</p>}
                                </>
                            ) : (
                                <p>No flashcards generated yet. Enter a topic and click &quot;Generate Flashcards&quot;.</p>
                            )}
                        </CardContent>
                    </Card>
                    <div className="flex justify-between mt-4">
                        <Button onClick={handleFlip} variant="ghost" size="icon" disabled={!currentCard}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleNext} variant="ghost" size="icon" disabled={!currentCard}>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-6 space-y-2">
                        <Label htmlFor="topic">Enter a topic:</Label>
                        <Input
                            id="topic"
                            placeholder="Enter a topic"
                            value={topic}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
                        />
                        <Button
                            className="w-full"
                            onClick={handleGenerateFlashcards}
                            disabled={loading || !topic}
                        >
                            {loading ? 'Generating...' : 'Generate Flashcards'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// 'use client'

// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { RefreshCw, ArrowRight } from "lucide-react"
// import { useState } from "react"

// // Test data
// const flashcards = [
//     { question: "What is the capital of France?", answer: "Paris" },
//     { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
//     { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
//     { question: "What is the chemical symbol for gold?", answer: "Au" },
// ]

// export default function Flashcard() {
//     const [currentIndex, setCurrentIndex] = useState(0)
//     const [flip, setFlip] = useState(false)

//     function handleFlip() {
//         setFlip(!flip)
//     }

//     function handleNext() {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
//         setFlip(false)
//     }

//     const currentCard = flashcards[currentIndex]

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
//             <Card className="w-full max-w-md">
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle>Flashcard App</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Card className="bg-secondary">
//                         <CardContent className="p-6 h-64 flex flex-col justify-center items-center">
//                             <h2 className="text-xl font-semibold mb-4">{currentCard.question}</h2>
//                             {flip && <p className="text-muted-foreground">{currentCard.answer}</p>}
//                         </CardContent>
//                     </Card>
//                     <div className="flex justify-between mt-4">
//                         <Button onClick={handleFlip} variant="ghost" size="icon">
//                             <RefreshCw className="h-4 w-4" />
//                         </Button>
//                         <Button onClick={handleNext} variant="ghost" size="icon">
//                             <ArrowRight className="h-4 w-4" />
//                         </Button>
//                     </div>
//                     <div className="mt-6 space-y-2">
//                         <Label htmlFor="topic">Enter a topic:</Label>
//                         <Input id="topic" placeholder="Enter a topic" />
//                         <Button className="w-full">Generate Flashcards</Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }


// All comments below are previous working versions of this app kept them for reference

// 'use client'

// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { RefreshCw, ArrowRight } from "lucide-react"
// import { useState } from "react"

// // Test data
// const flashcards = [
//     { question: "What is the capital of France?", answer: "Paris" },
//     { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
//     { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
//     { question: "What is the chemical symbol for gold?", answer: "Au" },
// ]

// export default function Flashcard() {
//     const [currentIndex, setCurrentIndex] = useState(0)
//     const [flip, setFlip] = useState(false)

//     function handleFlip() {
//         setFlip(!flip)
//     }

//     function handleNext() {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
//         setFlip(false)
//     }

//     const currentCard = flashcards[currentIndex]

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
//             <Card className="w-full max-w-md">
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle>Flashcard App</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Card className="bg-secondary">
//                         <CardContent className="p-6 h-64 flex flex-col justify-center items-center">
//                             <h2 className="text-xl font-semibold mb-4">{currentCard.question}</h2>
//                             {flip && <p className="text-muted-foreground">{currentCard.answer}</p>}
//                         </CardContent>
//                     </Card>
//                     <div className="flex justify-between mt-4">
//                         <Button onClick={handleFlip} variant="ghost" size="icon">
//                             <RefreshCw className="h-4 w-4" />
//                         </Button>
//                         <Button onClick={handleNext} variant="ghost" size="icon">
//                             <ArrowRight className="h-4 w-4" />
//                         </Button>
//                     </div>
//                     <div className="mt-6 space-y-2">
//                         <Label htmlFor="topic">Enter a topic:</Label>
//                         <Input id="topic" placeholder="Enter a topic" />
//                         <Button className="w-full">Generate Flashcards</Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

// 'use client'
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { RefreshCw, ArrowRight } from "lucide-react"
// import { useState } from "react"

// export default function Flashcard() {

//     const [flip, setFlip] = useState(false);

//     function handleClick() {
//         setFlip(!flip);
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
//             <Card className="w-full max-w-md">
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle>Flashcard App</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Card className="bg-secondary">
//                         {flip ?
//                             <CardContent className="p-6 h-64 flex flex-col justify-center items-center">
//                                 <h2 className="text-xl font-semibold mb-4">What is the capital of France?</h2>
//                                 <p className="text-muted-foreground">Paris</p>
//                             </CardContent> :
//                             <CardContent className="p-6 h-64 flex flex-col justify-center items-center">
//                                 <h2 className="text-xl font-semibold mb-4">What is the capital of France?</h2>

//                             </CardContent>

//                         }

//                     </Card>
//                     <div className="flex justify-between mt-4">
//                         <Button onClick={handleClick} variant="ghost" size="icon">
//                             <RefreshCw className="h-4 w-4" />
//                         </Button>
//                         <Button variant="ghost" size="icon">
//                             <ArrowRight className="h-4 w-4" />
//                         </Button>
//                     </div>
//                     <div className="mt-6 space-y-2">
//                         <Label htmlFor="topic">Enter a topic:</Label>
//                         <Input id="topic" placeholder="Enter a topic" />
//                         <Button className="w-full">Generate Flashcards</Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }