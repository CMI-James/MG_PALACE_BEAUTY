import { Button } from "@/components/ui/button"
import { Sparkles, Star } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://placeholder.svg?height=600&width=1200&query=professional beauty salon with microblading tools and lash extensions')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-secondary/30">
        <Sparkles className="h-8 w-8" />
      </div>
      <div className="absolute bottom-20 right-10 text-primary/30">
        <Star className="h-6 w-6" />
      </div>
      <div className="absolute top-1/3 right-20 text-secondary/20">
        <Sparkles className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/30">
          <Sparkles className="h-4 w-4" />
          Premium Beauty Experience
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-white via-white to-secondary/90 bg-clip-text text-transparent">
          Elevate Your Beauty Craft
        </h1>
        <p className="text-lg md:text-xl mb-8 text-balance leading-relaxed max-w-2xl mx-auto text-white/90">
          Discover premium microblading tools, luxurious lash extensions, and professional beauty services. Transform
          your artistry with MG Beauty Palace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/80 font-semibold shadow-lg hover:shadow-secondary/25 transition-all duration-300"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/50 text-white hover:bg-primary hover:text-primary-foreground bg-primary/10 backdrop-blur-sm hover:border-primary transition-all duration-300"
          >
            <Link href="/services">Book Service</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
