import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Flame,
  GitBranch,
  MessageSquareQuote,
  Shield,
  UsersRound,
  Target,
} from "lucide-react";
import {
  actorMap,
  casePillars,
  chapters,
  counterFrames,
  dangerCards,
  getChapterById,
  patternSteps,
  pressureMarkers,
  sharpestDetails,
  strategicOverview,
} from "./data/evidence.js";
import { BlueprintMap } from "./components/BlueprintMap.jsx";
import { ChapterRail } from "./components/ChapterRail.jsx";
import { ChapterView } from "./components/ChapterView.jsx";
import { RemotionSection } from "./components/RemotionSection.jsx";

function App() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const activeChapter = getChapterById(activeId);

  function selectChapter(id) {
    setActiveId(id);
    document.getElementById("moves")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main id="top">
      <header className="site-header" aria-label="Primary">
        <a className="brand" href="#top" aria-label="The Progressive Plan home">
          <span className="brand-mark">PP</span>
          <span>The Progressive Plan</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#case">The Case</a>
          <a href="#moves">Five Moves</a>
          <a href="#stakes">What It Means</a>
          <a href="#video">Watch</a>
        </nav>
      </header>

      <section id="case" className="hero" aria-labelledby="hero-title">
        <div className="hero-masthead">
          <h1 id="hero-title">
            <span>The</span>
            <span>Progressive</span>
            <span>Plan</span>
          </h1>
          <p className="deck">
            My case is simple: these are not isolated reforms. They form a sequence for moving
            power away from constitutional checks and into institutions progressives can pressure,
            regulate, staff, or control.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#moves">
              <Target aria-hidden="true" />
              See the five moves
            </a>
            <a className="secondary-action" href="#stakes">
              <Shield aria-hidden="true" />
              Why it matters
            </a>
          </div>
        </div>

        <div className="hero-brief">
          <div className="brief-rule" />
          <div className="hero-diagram" aria-label="Plan sequence">
            <div className="diagram-core">
              <span>Power</span>
              <strong>center</strong>
            </div>
            {chapters.map((chapter) => (
              <button
                type="button"
                key={chapter.id}
                className={`diagram-node node-${chapter.number}`}
                style={{ "--accent": chapter.color }}
                onClick={() => selectChapter(chapter.id)}
              >
                <span>{chapter.number}</span>
                {chapter.shortLabel}
              </button>
            ))}
          </div>
          <p>
            The pattern starts with Congress, moves through the courts and elections, then relies on
            mass pressure and justice-system leverage to make the change hard to reverse.
          </p>
          <a href="#pattern">
            Follow the pattern
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <BlueprintMap activeId={activeId} onSelect={selectChapter} />
      </section>

      <section className="case-section" aria-labelledby="case-proof-title">
        <div className="case-copy">
          <p className="eyebrow">The case</p>
          <h2 id="case-proof-title">This is the pattern hiding in plain sight.</h2>
          <p>
            The public language is reform. The structure is power transfer. Each move is easier to
            dismiss alone; together they describe a durable plan for changing who can govern, who
            can resist, and who gets punished for standing in the way.
          </p>
        </div>
        <div className="case-pillars">
          {casePillars.map((pillar, index) => (
            <article key={pillar.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="machine-section" aria-labelledby="machine-title">
        <div className="machine-copy">
          <p className="eyebrow">Strategic overview</p>
          <h2 id="machine-title">{strategicOverview.title}</h2>
          {strategicOverview.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="machine-flow" aria-label="How the plan reinforces itself">
          {strategicOverview.machine.map((step, index) => (
            <article key={step} style={{ "--accent": chapters[index]?.color }}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pressure-section" aria-labelledby="pressure-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Pressure logic</p>
            <h2 id="pressure-title">The same move repeats: independence becomes obstruction.</h2>
          </div>
          <p>
            That is the persuasive trick. Each independent limit is renamed as a threat, then the
            power transfer is presented as the cure.
          </p>
        </div>
        <div className="pressure-grid">
          {pressureMarkers.map((marker) => (
            <article key={marker.title}>
              <span>{marker.label}</span>
              <h3>{marker.title}</h3>
              <p>{marker.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="moves" className="moves-intro" aria-labelledby="moves-title">
        <div>
          <h2 id="moves-title">The Five Moves</h2>
          <p>Not separate. Coordinated. Sequenced. Reinforcing.</p>
        </div>
        <strong>Five moves. One plan. Total transformation.</strong>
      </section>

      <section className="blueprint-section" aria-label="Five moves">
        <ChapterRail activeId={activeId} onSelect={setActiveId} />
        <ChapterView
          chapter={activeChapter}
          onSelectChapter={setActiveId}
        />
      </section>

      <section className="timeline-section" aria-labelledby="timeline-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Pattern timeline</p>
            <h2 id="timeline-title">The sequence is the argument.</h2>
          </div>
          <p>
            This is not a list of grievances. It is a chain: each move makes the next move more
            plausible, more powerful, and harder to undo.
          </p>
        </div>
        <div className="pattern-timeline">
          {patternSteps.map((step, index) => (
            <article key={step.label} style={{ "--accent": chapters[index]?.color }}>
              <span>{index + 1}</span>
              <h3>{step.label}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pattern" className="pattern-section" aria-labelledby="pattern-title">
        <div className="pattern-copy">
          <p className="eyebrow">The pattern</p>
          <h2 id="pattern-title">Different tools. Same blueprint.</h2>
          <p>
            Look past the slogans and the pattern becomes clear: centralize power, weaken the
            referees, control election rules, mobilize pressure, and use enforcement power against
            resistance.
          </p>
          <ul className="pattern-list">
            <li>Centralize power.</li>
            <li>Silence opposition.</li>
            <li>Make the shift irreversible.</li>
          </ul>
        </div>
        <div className="pillar-diagram" aria-label="Five pillars of the plan">
          {chapters.map((chapter) => (
            <button
              type="button"
              key={chapter.id}
              className={activeId === chapter.id ? "active" : ""}
              style={{ "--accent": chapter.color }}
              onClick={() => setActiveId(chapter.id)}
            >
              <span>{chapter.number}</span>
              <strong>{chapter.shortLabel}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="danger-section" aria-labelledby="danger-title">
        <div className="danger-masthead">
          <AlertTriangle aria-hidden="true" />
          <div>
            <p className="eyebrow">The danger</p>
            <h2 id="danger-title">What changes if the plan works?</h2>
          </div>
        </div>
        <div className="danger-grid">
          {dangerCards.map((card) => (
            <article key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="counter-section" aria-labelledby="counter-title">
        <div className="counter-heading">
          <MessageSquareQuote aria-hidden="true" />
          <div>
            <p className="eyebrow">They say / the pattern shows</p>
            <h2 id="counter-title">The friendly label is not the whole story.</h2>
          </div>
        </div>
        <div className="counter-grid">
          {counterFrames.map((frame) => (
            <article key={frame.id} style={{ "--accent": frame.color }}>
              <span>{frame.title}</span>
              <div>
                <small>They say</small>
                <p>{frame.theySay}</p>
              </div>
              <div>
                <small>The pattern shows</small>
                <p>{frame.patternShows}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="actor-section" aria-labelledby="actor-title">
        <div className="actor-heading">
          <UsersRound aria-hidden="true" />
          <div>
            <p className="eyebrow">The network</p>
            <h2 id="actor-title">The roles are different. The direction is the same.</h2>
          </div>
        </div>
        <div className="actor-grid">
          {actorMap.map((actor) => (
            <article key={actor.name}>
              <small>{actor.role}</small>
              <h3>{actor.name}</h3>
              <p>{actor.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sharpest-section" aria-labelledby="sharpest-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sharpest tells</p>
            <h2 id="sharpest-title">The details that make the pattern harder to dismiss.</h2>
          </div>
          <BookOpen aria-hidden="true" />
        </div>
        <div className="sharpest-grid">
          {sharpestDetails.map((detail) => (
            <article key={detail.label}>
              <span>{detail.label}</span>
              <p>{detail.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="stakes" className="stakes-section" aria-labelledby="stakes-title">
        <div className="section-heading">
          <h2 id="stakes-title">The Stakes</h2>
          <p>This is not about routine policy disagreement. It is about preserving limits.</p>
        </div>
        <div className="stakes-grid">
          <article>
            <Flame aria-hidden="true" />
            <h3>Your freedoms</h3>
            <p>Rights once lost are seldom restored. Speech, religion, privacy, and due process are on the line.</p>
          </article>
          <article>
            <Shield aria-hidden="true" />
            <h3>The rule of law</h3>
            <p>Justice becomes a political weapon when neutral limits are replaced by movement discipline.</p>
          </article>
          <article>
            <Target aria-hidden="true" />
            <h3>Election integrity</h3>
            <p>If outcomes are controlled through rules, pressure, and administration, consent becomes a myth.</p>
          </article>
          <article>
            <GitBranch aria-hidden="true" />
            <h3>The structure</h3>
            <p>Once institutional power is rearranged, ordinary elections may no longer be enough to restore the old limits.</p>
          </article>
        </div>
      </section>

      <RemotionSection activeId={activeId} />

      <footer className="site-footer">
        <p>
          Understand the plan. Recognize the pattern. Defend the Republic.
        </p>
        <a href="#top">Back to masthead</a>
      </footer>
    </main>
  );
}

export default App;
