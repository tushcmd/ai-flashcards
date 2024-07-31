import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingSection() {
    return (
        <section className="layout-container mt-16 mx-auto pb-4 px-4 sm:px-8">
            <div className="container grid items-center justify-center gap-12 px-4 md:px-6">
                <div className="space-y-3 text-center">
                    <h2 className="font-bold text-2xl md:text-3xl">Pricing for Every Need</h2>
                    <p className="mx-auto leading-relaxed max-w-3xl text-muted-foreground">
                        Choose the plan that fits your learning style and budget. Get started with our free Basic plan or unlock
                        more features with our Pro and Enterprise options.
                    </p>
                </div>
                <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <PricingCard
                        title="Basic"
                        description="Get started with our free plan."
                        price="$0"
                        features={[
                            "100 flashcards",
                            "Basic study modes",
                            "Limited analytics"
                        ]}
                        buttonText="Sign up for free"
                        buttonVariant="outline"
                    />
                    <PricingCard
                        title="Pro"
                        description="Unlock more features for serious learners."
                        price="$9/mo"
                        features={[
                            "Unlimited flashcards",
                            "Advanced study modes",
                            "Detailed analytics",
                            "Custom decks"
                        ]}
                        buttonText="Get Pro"
                        buttonVariant="default"
                    />
                    <PricingCard
                        title="Enterprise"
                        description="Tailored solutions for teams and organizations."
                        price="Contact us"
                        features={[
                            "Unlimited flashcards",
                            "Advanced study modes",
                            "Detailed analytics",
                            "Custom branding",
                            "Dedicated support"
                        ]}
                        buttonText="Contact Sales"
                        buttonVariant="default"
                    />
                </div>
            </div>
        </section>
    )
}

interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    features: string[];
    buttonText: string;
    buttonVariant: "outline" | "default" | "destructive" | "secondary" | "ghost" | "link";
}

function PricingCard({ title, description, price, features, buttonText, buttonVariant }: PricingCardProps) {
    return (
        <Card className="flex h-full flex-col justify-between">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="text-4xl font-bold">{price}</div>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                    {features.map((feature, index) => (
                        <li key={index}>
                            <Check className="mr-2 inline-block h-4 w-4 text-primary" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button variant={buttonVariant} className="w-full">
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    )
}