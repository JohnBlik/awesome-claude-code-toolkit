import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { personal } from '@/data/personal';

const budgetOptions = ['< €5k', '€5–15k', '€15–40k', '€40k+'];
const interestOptions = ['Landing', 'Brand site', 'Ecommerce', 'Web app', 'UI/UX', 'Motion / 3D'];

export function Contact() {
  const [budget, setBudget] = useState<string | null>(null);
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const toggleInterest = (i: string) => {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const next: typeof errors = {};
    if (!name) next.name = 'Please share your name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Please enter a valid email.';
    if (message.length < 10) next.message = 'Tell me a little more — at least a sentence.';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build something memorable."
          description="Tell me about the project — even a sketch is enough to start. I reply to every enquiry within one business day."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
          {/* Left column — info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-8"
          >
            <motion.a
              variants={fadeUp}
              href={`mailto:${personal.email}`}
              className="group inline-flex w-fit items-center gap-4 rounded-2xl border border-white/10
                bg-white/[0.03] p-5 backdrop-blur transition-colors hover:border-white/20
                hover:bg-white/[0.05]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl
                bg-gradient-to-br from-brand-500 to-glow-violet text-white shadow-glow">
                <Icon name="mail" size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/45">Email</p>
                <p className="text-lg font-semibold text-white">{personal.email}</p>
              </div>
              <Icon
                name="arrowUpRight"
                size={16}
                className="ml-2 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </motion.a>

            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest text-white/45">Based in</p>
              <p className="text-white/85">{personal.location}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-white/45">Follow along</p>
              <div className="flex items-center gap-2">
                {personal.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full
                      border border-white/10 bg-white/5 text-white/75 transition-all
                      hover:scale-110 hover:bg-white/10 hover:text-white"
                  >
                    <Icon name={s.icon} size={16} />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="max-w-md text-sm leading-relaxed text-white/55">
              Prefer to talk? Drop a 30-second voice note when you email and I’ll book a 20-minute
              intro call.
            </motion.p>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-3xl border border-white/10
              bg-white/[0.03] p-6 backdrop-blur-md sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem]
                bg-gradient-to-br from-brand-500/10 via-glow-violet/10 to-glow-pink/10 blur-3xl"
            />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full
                    bg-gradient-to-br from-brand-500 to-glow-pink text-white shadow-glow">
                    <Icon name="check" size={22} />
                  </span>
                  <h3 className="text-2xl font-semibold">Message on the way.</h3>
                  <p className="max-w-md text-sm text-white/65">
                    Thanks for reaching out — I'll get back to you within one business day with
                    next steps.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-5"
                >
                  <Field
                    name="name"
                    label="Your name"
                    placeholder="Aria Chen"
                    error={errors.name}
                  />
                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="you@studio.com"
                    error={errors.email}
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/55">
                      Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          aria-pressed={budget === b}
                          className={
                            'rounded-full border px-3.5 py-1.5 text-sm transition-colors ' +
                            (budget === b
                              ? 'border-white/30 bg-white/10 text-white'
                              : 'border-white/10 bg-white/[0.03] text-white/65 hover:bg-white/[0.06]')
                          }
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/55">
                      I’m interested in (multi-select)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((i) => {
                        const selected = interests.has(i);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggleInterest(i)}
                            aria-pressed={selected}
                            className={
                              'rounded-full border px-3.5 py-1.5 text-sm transition-colors ' +
                              (selected
                                ? 'border-glow-violet/60 bg-glow-violet/15 text-white'
                                : 'border-white/10 bg-white/[0.03] text-white/65 hover:bg-white/[0.06]')
                            }
                          >
                            {i}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/55">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="A few sentences about what you’re building, your timeline and what success looks like."
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm
                        text-white placeholder:text-white/30 transition-colors
                        focus:border-glow-violet/60 focus:bg-white/[0.06] focus:outline-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-glow-pink">{errors.message}</p>
                    )}
                  </div>

                  <div className="mt-2 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <p className="text-[11px] uppercase tracking-widest text-white/40">
                      No spam · used once to reply
                    </p>
                    <MagneticButton>
                      <Button type="submit" size="md" icon={<Icon name="send" size={14} />}>
                        Send message
                      </Button>
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = 'text',
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-xs uppercase tracking-widest text-white/55">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={
          name === 'email' ? 'email' : name === 'name' ? 'name' : 'off'
        }
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm
          text-white placeholder:text-white/30 transition-colors
          focus:border-glow-violet/60 focus:bg-white/[0.06] focus:outline-none"
      />
      {error && <p className="text-xs text-glow-pink">{error}</p>}
    </div>
  );
}
