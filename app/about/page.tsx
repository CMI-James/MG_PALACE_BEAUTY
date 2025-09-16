import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, Heart, Star, Calendar } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const achievements = [
    {
      icon: Award,
      title: "5+ Years Experience",
      description: "Professional beauty services and training",
    },
    {
      icon: Users,
      title: "500+ Happy Clients",
      description: "Satisfied customers across Nigeria",
    },
    {
      icon: Heart,
      title: "Premium Quality",
      description: "Only the finest beauty tools and products",
    },
    {
      icon: Star,
      title: "Expert Training",
      description: "Certified courses and professional development",
    },
  ]

  const team = [
    {
      name: "Margaret Grace",
      role: "Founder & Master Artist",
      image: "https://placeholder.svg?height=300&width=300&query=professional woman beauty artist",
      description: "Certified microblading artist with over 8 years of experience in the beauty industry.",
    },
    {
      name: "Sarah Johnson",
      role: "Senior Lash Technician",
      image: "https://placeholder.svg?height=300&width=300&query=professional woman lash technician",
      description: "Specialist in volume lash extensions and lash lift treatments.",
    },
    {
      name: "Adaora Okafor",
      role: "Training Coordinator",
      image: "https://placeholder.svg?height=300&width=300&query=professional woman beauty trainer",
      description: "Experienced trainer helping aspiring beauty artists achieve certification.",
    },
  ]

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">About MG Beauty Palace</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your premier destination for professional beauty tools, expert services, and comprehensive training. We're
              passionate about empowering beauty professionals and enthusiasts across Nigeria with the finest products
              and exceptional service.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-primary">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2019, MG Beauty Palace began as a vision to bridge the gap between aspiring beauty
                    professionals and high-quality tools and training in Nigeria. What started as a small venture has
                    grown into a trusted name in the beauty industry.
                  </p>
                  <p>
                    Our founder, Margaret Grace, recognized the need for accessible, professional-grade beauty equipment
                    and expert training. With her extensive background in microblading and lash extensions, she set out
                    to create a one-stop destination for beauty professionals.
                  </p>
                  <p>
                    Today, we serve hundreds of satisfied customers across Nigeria, offering everything from premium
                    microblading tools to comprehensive training courses that have launched countless successful beauty
                    careers.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://placeholder.svg?height=500&width=600&query=beauty salon interior professional"
                  alt="MG Beauty Palace Studio"
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-lg">5+ Years</p>
                  <p className="text-sm">of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We're committed to excellence in everything we do, from product quality to customer service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our experienced professionals are here to help you achieve your beauty goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover mx-auto"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary" className="mt-2">
                        {member.role}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-primary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower beauty professionals and enthusiasts across Nigeria by providing access to
                    premium-quality tools, expert services, and comprehensive training that enables them to excel in
                    their craft and build successful careers in the beauty industry.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-secondary-foreground">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Quality:</strong> We source only the finest beauty tools and products
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Excellence:</strong> We strive for perfection in every service we provide
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Education:</strong> We believe in continuous learning and skill development
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>Community:</strong> We support and uplift the beauty professional community
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Beauty Journey?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Whether you're looking for premium tools, professional services, or expert training, we're here to help
              you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/products">Shop Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Service
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
