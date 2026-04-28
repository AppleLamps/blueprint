import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Newspaper, Search } from "lucide-react";
import {
  allClaims,
  chapters,
  getChapterById,
  searchableChapterText,
} from "./data/evidence.js";
import { BlueprintMap } from "./components/BlueprintMap.jsx";
import { ChapterRail } from "./components/ChapterRail.jsx";
import { ChapterView } from "./components/ChapterView.jsx";
import { EvidenceExplorer } from "./components/EvidenceExplorer.jsx";
import { ReceiptsPanel } from "./components/ReceiptsPanel.jsx";
import { RemotionSection } from "./components/RemotionSection.jsx";

function App() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClaimId, setSelectedClaimId] = useState(chapters[0].claims[0].id);

  const activeChapter = getChapterById(activeId);

  useEffect(() => {
    setSelectedClaimId((currentId) => {
      const stillInChapter = activeChapter.claims.some((claim) => claim.id === currentId);
      return stillInChapter ? currentId : activeChapter.claims[0]?.id;
    });
  }, [activeChapter]);

  const filteredClaims = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return allClaims.filter((claim) => {
      const chapter = getChapterById(claim.chapterId);
      const receipts = chapter.receipts.filter((receipt) => claim.receiptIds.includes(receipt.id));
      const matchesStatus = statusFilter === "all" || claim.status === statusFilter;

      if (!matchesStatus) return false;
      if (!needle) return true;

      const claimCorpus = [
        claim.label,
        claim.text,
        claim.status,
        ...receipts.flatMap((receipt) => [
          receipt.speaker,
          receipt.transcript,
          receipt.locator,
          receipt.quote,
          receipt.interpretation,
        ]),
      ]
        .join(" ")
        .toLowerCase();

      return claimCorpus.includes(needle) || searchableChapterText(chapter).includes(needle);
    });
  }, [query, statusFilter]);

  const selectedClaim =
    allClaims.find((claim) => claim.id === selectedClaimId) ??
    activeChapter.claims[0];

  function selectChapter(id) {
    setActiveId(id);
    document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectClaim(claim) {
    setActiveId(claim.chapterId);
    setSelectedClaimId(claim.id);
  }

  return (
    <main id="top">
      <header className="site-header" aria-label="Primary">
        <a className="brand" href="#top" aria-label="The Jacobin Blueprint home">
          <span className="brand-mark">JB</span>
          <span>The Jacobin Blueprint</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#chapters">Chapters</a>
          <a href="#evidence">Evidence</a>
          <a href="#video">Remotion</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-masthead">
          <p className="eyebrow">Special strategic report</p>
          <h1 id="hero-title">
            <span>The</span>
            <span>Jacobin</span>
            <span>Blueprint</span>
          </h1>
          <p className="deck">
            A five-chapter polemic mapping the article's argument against the transcript receipts:
            congressional supremacy, judicial purge, nationalized ballot, 3.5% mobilization, and
            DOJ politicization.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#chapters">
              <Newspaper aria-hidden="true" />
              Read the blueprint
            </a>
            <a className="secondary-action" href="#evidence">
              <Search aria-hidden="true" />
              Search receipts
            </a>
          </div>
        </div>

        <div className="hero-brief">
          <div className="brief-rule" />
          <p>
            The site keeps the article's aggressive framing, but every item is tagged by evidentiary
            status: direct transcript quote, strategic interpretation, or claim needing more source
            work.
          </p>
          <a href="#evidence">
            Inspect source status
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <BlueprintMap activeId={activeId} onSelect={selectChapter} />
      </section>

      <section id="chapters" className="blueprint-section" aria-label="Blueprint chapters">
        <ChapterRail activeId={activeId} onSelect={setActiveId} />
        <ChapterView
          chapter={activeChapter}
          selectedClaimId={selectedClaimId}
          onSelectClaim={setSelectedClaimId}
          onSelectChapter={setActiveId}
        />
        <ReceiptsPanel chapter={getChapterById(selectedClaim.chapterId)} claim={selectedClaim} />
      </section>

      <section id="evidence" className="evidence-section">
        <EvidenceExplorer
          query={query}
          statusFilter={statusFilter}
          claims={filteredClaims}
          onQueryChange={setQuery}
          onStatusFilterChange={setStatusFilter}
          onSelectClaim={selectClaim}
        />
      </section>

      <RemotionSection activeId={activeId} />

      <footer className="site-footer">
        <p>
          Evidence standard: direct quotes include speaker, transcript filename, and locator from
          the local <code>info</code> folder. Interpretive claims are deliberately labeled.
        </p>
        <a href="#top">Back to masthead</a>
      </footer>
    </main>
  );
}

export default App;
