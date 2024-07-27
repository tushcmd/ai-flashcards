'use client'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RefreshCw, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Flashcard() {

    const [flip, setFlip] = useState(false);

    function handleClick() {
        setFlip(!flip);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Flashcard App</CardTitle>
                </CardHeader>
                <CardContent>
                    <Card className="bg-secondary">
                        {flip ?
                            <CardContent className="p-6 h-64 flex flex-col justify-center items-center">
                                <h2 className="text-xl font-semibold mb-4">What is the capital of France?</h2>
                                <p className="text-muted-foreground">Paris</p>
                            </CardContent> :
                            <CardContent className="p-6 h-64 flex flex-col justify-center items-center">
                                <h2 className="text-xl font-semibold mb-4">What is the capital of France?</h2>

                            </CardContent>

                        }

                    </Card>
                    <div className="flex justify-between mt-4">
                        <Button onClick={handleClick} variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-6 space-y-2">
                        <Label htmlFor="topic">Enter a topic:</Label>
                        <Input id="topic" placeholder="Enter a topic" />
                        <Button className="w-full">Generate Flashcards</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}