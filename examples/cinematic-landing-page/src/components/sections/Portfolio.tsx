import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { Tag } from '@/components/ui/Tag';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { projects, portfolioCategories } from '@/data/portfolio';
import type { PortfolioCategory, Project } from '@/data/portfolio';
import { cn } from '@/lib/cn';

/** A faux browser chrome with a gradient artwork inside — stands in for a live preview. */
function ProjectMock({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10
      bg-gradient-to-br from-white/[0.04] to-white/[0.01]">
      <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-3">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2
          py-0.5 text-[10px] text-white/50">
          <span className="h-1 w-1 rounded-full" style={{ background: project.mockAccent }} />
          {project.client.toLowerCase().replace(/\s+/g, '')}.com
        </span>
      </div>
      <div className={cn('relative h-[calc(100%-1.75rem)] bg-gradient-to-br', project.gradient)}>
        <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px]
              uppercase tracking-[0.3em] text-white/85 backdrop-blur">
              {project.category}
            </div>
            <p className="font-display text-2xl font-semibold leading-tight text-white/95
              drop-shadow-lg sm:text-3xl">
              {project.title}
            </p>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="rounded-md bg-black/30 px-2 py-1 text-[10px] text-white/75 backdrop-blur">
            {project.summary}
          </div>
          <span className="rounded-md bg-black/30 px-2 py-1 text-[10px] text-white/55 backdrop-blur">
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.button
      type="button"
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onClick={() => onOpen(project)}
      data-cursor="hover"
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/10
        bg-white/[0.03] p-4 text-left backdrop-blur-md
        transition-colors hover:border-white/20 focus-visible:border-white/30"
      aria-label={`Open project ${project.title}`}
    >
      <ProjectMock project={project} />
      <div className="flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-widest text-white/45">
            {project.category} · {project.year}
          </p>
        </div>
        <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full
          border border-white/10 bg-white/5 text-white/70 transition-all
          group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white
          group-hover:rotate-[-12deg]">
          <Icon name="arrowUpRight" size={14} />
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 px-1 pb-1">
        {project.tags.slice(0, 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </motion.button>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory>('All');
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      filter === 'All' ? projects : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section id="portfolio" aria-label="Portfolio" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Selected work"
          title="Recent projects."
          description="A small, opinionated cross-section. Open any project to read the brief, outcomes and stack."
        />

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {portfolioCategories.map((c) => {
            const selected = filter === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={selected}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  selected ? 'text-white' : 'text-white/55 hover:text-white/80'
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full border border-white/15
                      bg-white/[0.06] backdrop-blur"
                  />
                )}
                {c}
              </button>
            );
          })}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          key={filter}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} onOpen={setActive} />
          ))}
        </motion.div>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        labelledBy={active ? `proj-${active.slug}` : undefined}
      >
        {active && (
          <div>
            <ProjectMock project={active} />
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 id={`proj-${active.slug}`} className="text-2xl font-semibold sm:text-3xl">
                  {active.title}
                </h3>
                <span className="text-xs uppercase tracking-widest text-white/45">
                  {active.year}
                </span>
              </div>
              <p className="mt-1 text-sm uppercase tracking-[0.25em] text-white/55">
                {active.client} · {active.category}
              </p>
              <p className="mt-5 text-base leading-relaxed text-white/75">
                {active.description}
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/45">Role</p>
                  <p className="mt-1 text-sm text-white/80">{active.role}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/45">Outcomes</p>
                  <ul className="mt-1 flex flex-col gap-1.5 text-sm text-white/80">
                    {active.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1 w-1 rounded-full bg-glow-pink" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
