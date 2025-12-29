"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Zap,
  MapPin,
  ShieldCheck,
  CreditCard,
  Star,
  ChefHat,
  Clock,
  Smartphone,
  Facebook,
  Instagram,
  Twitter,
  Menu,
  X,
  ChevronRight,
  Download
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
              <ShoppingBag size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-secondary">
              Yum<span className="text-primary">zio</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Features</a>
            <a href="#offers" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Offers</a>
            <a href="#why-us" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Why Yumzio</a>
            <button className="rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-white hover:bg-black transition-all shadow-md active:scale-95">
              Download Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex md:hidden text-secondary p-2 transition-colors active:bg-zinc-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-zinc-100 overflow-hidden shadow-xl"
            >
              <div className="flex flex-col p-6 gap-6">
                <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-secondary flex items-center justify-between">
                  Features <ChevronRight size={20} className="text-zinc-300" />
                </a>
                <a href="#offers" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-secondary flex items-center justify-between">
                  Offers <ChevronRight size={20} className="text-zinc-300" />
                </a>
                <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-secondary flex items-center justify-between">
                  Why Yumzio <ChevronRight size={20} className="text-zinc-300" />
                </a>
                <button className="w-full rounded-2xl bg-primary py-4 text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                  <Download size={20} /> Download Yumzio App
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl text-center lg:text-left"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-primary">
                <MapPin size={16} className="text-primary" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Now Serving Narsinghpur & Cuttack</span>
              </div>
              <h1 className="mb-4 md:mb-6 text-4xl font-extrabold leading-[1.2] text-secondary md:text-5xl lg:text-7xl">
                Your Favorite Food, <br />
                <span className="gradient-text">Delivered Fast</span>
              </h1>
              <p className="mb-8 md:mb-10 text-base leading-relaxed text-zinc-600 md:text-lg lg:text-xl px-4 md:px-0">
                Order from local restaurants you love – hot, fresh & on time.
                Bringing the best tastes of your city right to your doorstep.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start px-6 md:px-0">
                <button className="flex items-center justify-center gap-3 rounded-2xl bg-black px-6 py-3 md:px-8 md:py-4 text-white transition-all hover:bg-zinc-800 shadow-xl active:scale-95 group lg:w-full sm:w-auto">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={120} height={36} className="md:w-[140px] md:h-[42px]" />
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 divide-x divide-zinc-200 lg:justify-start">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-secondary">50+</span>
                  <span className="text-sm text-zinc-500">Local Restaurants</span>
                </div>
                <div className="flex flex-col pl-6">
                  <span className="text-2xl font-bold text-secondary">2.5k+</span>
                  <span className="text-sm text-zinc-500">Happy Users</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto lg:mx-0"
            >
              <div className="relative z-10 mx-auto w-full max-w-2xl">
                <img
                  src="/yumzio_marketing_hero.png"
                  alt="Yumzio Experience"
                  className="rounded-[3rem] shadow-2xl w-full border-8 border-white/50 backdrop-blur-sm"
                />
              </div>

              {/* Floaties */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-1/4 z-20 hidden rounded-3xl bg-white p-6 shadow-2xl lg:block border border-zinc-100"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Live Orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-bold text-secondary tracking-tight">2.5k+ Ordering Now</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-surface py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary lg:text-4xl">Everything You Need from a Food App</h2>
            <p className="mx-auto max-w-2xl text-zinc-600">We've built Yumzio with features that make food ordering a breeze in your city.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Zap />, title: "Fast Delivery", desc: "Our delivery partners ensure your food reaches you hot and fresh in no time." },
              { icon: <ChefHat />, title: "Local Favorites", desc: "Discover the best biryani, rolls, and street food from your favorite local spots." },
              { icon: <CreditCard />, title: "Secure Payments", desc: "Pay easily using UPI, Cards, or Cash on Delivery. Your transactions are safe." },
              { icon: <MapPin />, title: "Live Tracking", desc: "Stay updated with real-time tracking of your order from kitchen to doorstep." },
              { icon: <ShieldCheck />, title: "Verified Partners", desc: "We only partner with restaurants that maintain high hygiene and quality standards." },
              { icon: <ShoppingBag />, title: "Best Offers", desc: "Get exclusive discounts and free delivery on your favorite meals every day." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl group"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-secondary">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="offers" className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl md:rounded-[3rem] bg-secondary p-8 md:p-12 lg:p-20">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-50" />

            <div className="grid items-center gap-12 lg:grid-cols-2 relative z-10">
              <div className="text-center lg:text-left">
                <span className="mb-4 inline-block font-bold uppercase tracking-widest text-primary text-xs md:text-sm">Limited Time Offer</span>
                <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Enjoy Your First Meal With a Discount!</h2>
                <p className="mb-10 text-base md:text-lg lg:text-xl text-zinc-400">Get 50% OFF on your first 3 orders plus FREE delivery for a week. Use code <span className="font-mono font-bold text-white bg-primary px-3 py-1 rounded-lg inline-block my-2">NEWYUM</span></p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-6 py-3 text-white backdrop-blur-sm border border-white/10">
                    <Clock size={20} className="text-primary" />
                    <span className="text-sm">Valid for New Users</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-6 py-3 text-white backdrop-blur-sm border border-white/10">
                    <Zap size={20} className="text-primary" />
                    <span className="text-sm">Instant Apply</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto max-w-sm md:max-w-md lg:max-w-none">
                <img
                  src="/yumzio_indian_food_collage.png"
                  alt="Indian Food Offer"
                  className="rounded-3xl shadow-2xl lg:rotate-3 hover:rotate-0 transition-transform duration-500 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Yumzio Section */}
      <section id="why-us" className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="grid h-full grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-3 md:space-y-4 pt-8 md:pt-12">
                  <div className="h-40 md:h-64 rounded-2xl md:rounded-3xl bg-primary/10 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=500&auto=format&fit=crop" className="h-full w-full object-cover" alt="Biryani" />
                  </div>
                  <div className="h-32 md:h-48 rounded-2xl md:rounded-3xl bg-accent/10 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=500&auto=format&fit=crop" className="h-full w-full object-cover" alt="Pizza" />
                  </div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="h-32 md:h-48 rounded-2xl md:rounded-3xl bg-zinc-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1601050690597-df056fb17797?q=80&w=500&auto=format&fit=crop" className="h-full w-full object-cover" alt="Street Food" />
                  </div>
                  <div className="h-40 md:h-64 rounded-2xl md:rounded-3xl bg-zinc-300 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1599307734170-8b940939b49e?q=80&w=500&auto=format&fit=crop" className="h-full w-full object-cover" alt="Rolls" />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="mb-4 inline-block font-bold uppercase tracking-widest text-primary">Made for your city</span>
              <h2 className="mb-8 text-4xl font-bold text-secondary lg:text-5xl tracking-tight leading-tight">Built Locally for Narsinghpur & Cuttack</h2>
              <div className="space-y-8">
                {[
                  { title: "Understand Local Tastes", desc: "We know where the best Tandoori and Momos are. We bring them to you.", icon: <Star /> },
                  { title: "Empowering Local Businesses", desc: "By using Yumzio, you support local restaurant owners and delivery partners.", icon: <ChefHat /> },
                  { title: "Reliability You Can Trust", desc: "We are committed to being the most reliable food delivery service in your city.", icon: <ShieldCheck /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="mb-2 text-xl font-bold text-secondary">{item.title}</h4>
                      <p className="text-zinc-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-6 md:mb-8 text-3xl font-extrabold text-secondary md:text-5xl lg:text-6xl max-w-4xl leading-tight">
              Ready to Taste Happiness? <br />
              <span className="text-primary">Download Yumzio Today!</span>
            </h2>
            <p className="mb-10 md:mb-12 text-base md:text-xl text-zinc-600 max-w-2xl px-4 md:px-0">
              Join thousands of happy foodies in Narsinghpur & Cuttack who order their favorite meals daily.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row w-full sm:w-auto px-6 md:px-0">
              <button className="flex items-center justify-center gap-3 rounded-2xl bg-black px-6 py-3 md:px-8 md:py-4 text-white transition-all hover:bg-zinc-800 shadow-xl active:scale-95 lg:w-full sm:w-auto">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={120} height={36} className="md:w-[140px] md:h-[42px]" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary pt-20 pb-10 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-12 border-b border-zinc-800 pb-16 lg:grid-cols-4">
            <div className="col-span-1 lg:col-span-1">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                  <ShoppingBag size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  Yum<span className="text-primary">zio</span>
                </span>
              </div>
              <p className="mb-8 text-zinc-400">
                Bringing your city's best flavors to your doorstep. Fast, fresh, and reliable.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-primary">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold">Quick Links</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Sustainability</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold">Partner with Us</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-primary font-medium text-white underline decoration-primary underline-offset-4">List Your Restaurant</a></li>
                <li><a href="#" className="hover:text-primary font-medium text-white underline decoration-primary underline-offset-4">Become a Delivery Partner</a></li>
                <li><a href="#" className="hover:text-primary">Corporate Accounts</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold">Contact Us</h4>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex gap-3"><MapPin size={20} className="text-primary shrink-0" /> <span>Narsinghpur, Odisha, India</span></li>
                <li className="flex gap-3"><Smartphone size={20} className="text-primary shrink-0" /> <span>+91 90409 44520</span></li>
                <li><span>Email: hello@yumzio.in</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-6 text-sm text-zinc-500 md:flex-row">
            <p>© 2026 Yumzio. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Made with ❤️ By</span>
              <span className="font-bold text-white">
                <Link href="https://trivyaa.in" target="_blank" rel="noopener noreferrer">
                  Trivyaa
                </Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
