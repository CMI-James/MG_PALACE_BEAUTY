import { HeroSection } from "@/components/layout/hero-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Star, Calendar, Sparkles, TrendingUp, Award, Users } from "lucide-react"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { getProducts } from "@/lib/supabase/queries"

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true, limit: 4 })

  const categories = [
    {
      name: "Microblading Tools",
      image: "/images/microblading-tools.jpg",
      href: "/products?category=microblading-tools",
    },
    {
      name: "Lash Extensions",
      image: "/images/lash-extensions.jpg",
      href: "/products?category=lash-extensions",
    },
    {
      name: "Facial Treatments",
      image: "/images/facial-treatments.jpg",
      href: "/products?category=facial-treatments",
    },
    {
      name: "Beauty Accessories",
      image: "/images/beauty-accessories.jpg",
      href: "/products?category=beauty-accessories",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-background">
      <main>
        <HeroSection />

        {/* Featured Categories */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-slate-100/50 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="h-4 w-4" />
                Popular Categories
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">Shop by Category</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore our curated collection of professional beauty tools and products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link key={category.name} href={category.href} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:shadow-primary/10 border-l-4 border-l-transparent hover:border-l-primary">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="h-4 w-4" />
                Featured Products
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
                Discover our most popular and highly-rated beauty tools
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Professional-grade tools trusted by beauty experts across Nigeria
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:shadow-secondary/10 border-t-4 border-t-transparent hover:border-t-secondary"
                >
                  <CardHeader className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.is_featured && (
                        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg">
                          Featured
                        </Badge>
                      )}
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                        <div className="flex items-center gap-1 text-xs font-medium text-secondary-foreground">
                          <Star className="h-3 w-3 fill-secondary text-secondary" />
                          4.8
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-base mb-2 line-clamp-2 h-12 group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < 4 ? "fill-secondary text-secondary" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(24)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-primary">₦{product.price.toLocaleString()}</span>
                      {product.compare_price && product.compare_price > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₦{product.compare_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <AddToCartButton product={product} className="w-full bg-transparent " size="sm" />
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gradient-to-br from-secondary/15 via-primary/10 to-secondary/15">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Users className="h-4 w-4" />
                Professional Services
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
                Professional Beauty Services
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experience our expert beauty treatments and training courses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:shadow-primary/10 border-2 border-transparent hover:border-primary/20 bg-gradient-to-b from-slate-50 to-primary/10">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-primary">Microblading Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Professional eyebrow enhancement with natural-looking results
                  </p>
                  <p className="font-bold text-lg text-secondary-foreground">From ₦80,000</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/services/microblading">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:shadow-secondary/10 border-2 border-transparent hover:border-secondary/20 bg-gradient-to-b from-slate-50 to-secondary/10">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Sparkles className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-secondary-foreground">Lash Extensions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Classic and volume lash extensions for stunning eyes</p>
                  <p className="font-bold text-lg text-primary">From ₦35,000</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Link href="/services/lash-extensions">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:shadow-primary/10 border-2 border-transparent hover:border-primary/20 bg-gradient-to-b from-slate-50 to-primary/10">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-primary">Training Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Professional certification courses for beauty artists</p>
                  <p className="font-bold text-lg text-secondary-foreground">From ₦150,000</p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link href="/services/training">
                      <Calendar className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
