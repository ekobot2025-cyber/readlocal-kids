import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Headphones, BookOpenText, Mic, ArrowRight, Sparkles, Home as HomeIcon,
  ShoppingBag, Soup, Bird, Drum, Waves, GraduationCap,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

const HERO = "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/a7b0324a0584a89c20f2cb7ee1fc27401bd8b736185cb6658d491cc10928e172.jpeg";

const STEP_CARDS = [
  { icon: Headphones, title: "Listen", desc: "Hear a native-style model read each story aloud with clear pronunciation.", color: "bg-sky-500" },
  { icon: BookOpenText, title: "Read Aloud", desc: "Follow along sentence by sentence with gentle highlighting to guide you.", color: "bg-amber-400" },
  { icon: Mic, title: "Practice", desc: "Record your own reading, play it back, and get friendly feedback.", color: "bg-green-500" },
];

const CULTURE = [
  { icon: HomeIcon, name: "Honai", tint: "from-orange-400 to-amber-500" },
  { icon: ShoppingBag, name: "Noken", tint: "from-rose-400 to-pink-500" },
  { icon: Soup, name: "Papeda", tint: "from-yellow-400 to-orange-400" },
  { icon: Bird, name: "Bird of Paradise", tint: "from-sky-400 to-blue-500" },
  { icon: Waves, name: "Sentani Lake", tint: "from-cyan-400 to-teal-500" },
  { icon: Drum, name: "Tifa", tint: "from-violet-400 to-purple-500" },
];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo size={42} />
        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          data-testid="nav-login-btn"
          className="rounded-full border-2 border-slate-200 font-bold animate-bounce-in"
        >
          Log in
        </Button>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-2 md:px-8 md:pt-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
            <Sparkles className="h-3.5 w-3.5" /> Interactive Reading Aloud Platform
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
            ReadLocal <span className="text-sky-500 font-bold">Kids</span>
          </h1>
          <p className="mt-3 font-heading text-2xl font-semibold text-amber-500 sm:text-3xl">
            Read English, Discover Local Culture
          </p>
          <p className="mt-5 max-w-lg text-base text-slate-500 sm:text-lg">
            An interactive Reading Aloud learning platform that helps children learn English through
            stories inspired by Papua's local culture.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => navigate("/login")}
              data-testid="start-learning-btn"
              className="rounded-full bg-sky-500 px-7 py-6 text-base font-bold text-white shadow-[0_8px_20px_rgba(14,165,233,0.35)] hover:bg-sky-600"
            >
              Start Learning <ArrowRight className="ml-1.5 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              data-testid="teacher-dashboard-btn"
              className="rounded-full border-2 border-slate-200 px-7 py-6 text-base font-bold text-slate-700 hover:bg-slate-55"
            >
              <GraduationCap className="mr-1.5 h-5 w-5" /> Teacher Dashboard
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-sky-200 via-amber-100 to-green-100 blur-2xl animate-float" />
          <img
            src={HERO}
            alt="Papuan children reading with their teacher"
            className="relative w-full rounded-[2rem] border-4 border-white object-cover shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Learn Through Local Stories */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <h2 className="font-heading text-3xl font-bold text-slate-800 sm:text-4xl">Learn Through Local Stories</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            Children learn English best when the stories feel close to home. Every story in ReadLocal
            Kids is inspired by the environment, food, animals, and traditions children already know
            and love from Papua.
          </p>
        </div>
      </section>

      {/* Listen, Read, Practice */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-slate-800 sm:text-4xl">
          Listen, Read, and Practice
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEP_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border-2 border-slate-100 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.color} text-white`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-slate-800">{c.title}</h3>
                <p className="mt-2 text-slate-500">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Explore Papua */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-slate-800 sm:text-4xl">
            Explore Papua Through English
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-500">
            Discover the treasures of Papuan culture while building English vocabulary.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {CULTURE.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col items-center gap-3 rounded-3xl border-2 border-slate-100 bg-white p-5 text-center shadow-sm"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.tint} text-white`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{c.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-sky-500 to-sky-600 px-8 py-12 text-center text-white shadow-xl">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Ready to read today?</h2>
          <p className="mx-auto mt-3 max-w-lg text-sky-100">
            Join Maria and friends on a reading adventure across Papua.
          </p>
          <Button
            onClick={() => navigate("/login")}
            data-testid="cta-start-btn"
            className="mt-6 rounded-full bg-amber-400 px-8 py-6 text-base font-bold text-slate-900 hover:bg-amber-300"
          >
            Start Learning <ArrowRight className="ml-1.5 h-5 w-5" />
          </Button>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5">
          <Logo size={32} />
          <p>ReadLocal Kids · Read English, Discover Local Culture</p>
        </div>
      </footer>
    </div>
  );
}
