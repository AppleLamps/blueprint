/**
 * @typedef {"direct_quote" | "interpretation" | "needs_source"} ClaimStatus
 *
 * @typedef {Object} Receipt
 * @property {string} id
 * @property {string} speaker
 * @property {string} transcript
 * @property {string} locator
 * @property {string} quote
 * @property {string} interpretation
 *
 * @typedef {Object} Claim
 * @property {string} id
 * @property {ClaimStatus} status
 * @property {string} label
 * @property {string} text
 * @property {string[]} receiptIds
 *
 * @typedef {Object} ComparisonRow
 * @property {string} issue
 * @property {string} traditional
 * @property {string} blueprint
 *
 * @typedef {Object} Chapter
 * @property {string} id
 * @property {number} number
 * @property {string} shortLabel
 * @property {string} title
 * @property {string} kicker
 * @property {string} thesis
 * @property {string} danger
 * @property {string} articleExcerpt
 * @property {string} sourceStatus
 * @property {string} color
 * @property {ComparisonRow[]} comparisonRows
 * @property {Receipt[]} receipts
 * @property {Claim[]} claims
 */

export const claimStatusLabels = {
  all: "All",
  direct_quote: "Direct Quotes",
  interpretation: "Interpretation",
  needs_source: "Needs Source",
};

export const claimStatusMeta = {
  direct_quote: {
    label: "Direct quote",
    tone: "receipt",
    description: "Supported by a transcript quote and locator.",
  },
  interpretation: {
    label: "Interpretation",
    tone: "analysis",
    description: "A strategic reading drawn from article framing and transcript context.",
  },
  needs_source: {
    label: "Needs source",
    tone: "warning",
    description: "Kept visible, but marked as needing an additional citation beyond the current transcripts.",
  },
};

/** @type {Chapter[]} */
export const chapters = [
  {
    id: "congressional-supremacy",
    number: 1,
    shortLabel: "Congress",
    title: "Congressional Supremacy",
    kicker: "Chapter I",
    thesis:
      "The article frames Raskin's argument as an attempt to recast Congress as the dominant branch and shrink the elected executive into an administrative subordinate.",
    danger:
      "The alarm point is not oversight by Congress. It is the claim that the familiar three-branch balance is a myth, paired with a program to strip executive discretion over war, tariffs, spending, and faithful execution.",
    articleExcerpt:
      "The report calls this the opening move: redefine the Constitution away from co-equal branches and toward a legislative command model.",
    sourceStatus:
      "Strong transcript support for the co-equal-branches critique, tariff authority, budget power, and Take Care framing.",
    color: "#9f2f2f",
    comparisonRows: [
      {
        issue: "National security",
        traditional: "Commander-in-Chief as the national executive voice in strategy and crisis response.",
        blueprint: "Narrow oversight limited to active armed forces, with Congress positioned as the superior war-power branch.",
      },
      {
        issue: "Fiscal authority",
        traditional: "Executive discretion in administering appropriated funds, including historical impoundment fights.",
        blueprint: "Mandatory spending execution that forces the President to spend exactly as a congressional majority directs.",
      },
      {
        issue: "Economic policy",
        traditional: "Executive tariff and trade authority used to protect national sovereignty and bargaining power.",
        blueprint: "Tariff stripping that reclaims taxation and trade leverage for Congress.",
      },
      {
        issue: "Faithful execution",
        traditional: "The Take Care Clause includes presidential discretion in supervising law enforcement.",
        blueprint: "Necessary and Proper power is used to shield career officials from direct executive control.",
      },
    ],
    receipts: [
      {
        id: "raskin-coequal-word",
        speaker: "Rep. Jamie Raskin",
        transcript: "Can We Fix Our Broken Constitution Rep Jamie Raskin.txt",
        locator: "line 17",
        quote: "co-equal is not even a word",
        interpretation:
          "Raskin rejects the ordinary civic shorthand for branch equality before making the case for congressional primacy.",
      },
      {
        id: "raskin-tariffs-budget",
        speaker: "Rep. Jamie Raskin",
        transcript: "Can We Fix Our Broken Constitution Rep Jamie Raskin.txt",
        locator: "line 21",
        quote: "Only Congress could control the budgets and impose taxes and tariffs.",
        interpretation:
          "The transcript directly supports the article's tariff and budget-power plank.",
      },
      {
        id: "raskin-take-care",
        speaker: "Rep. Jamie Raskin",
        transcript: "Trump is trying to trample Congress's power. Not on Jamie Raskin's watch..txt",
        locator: "lines 35-37",
        quote: "the president must take care that the laws are faithfully executed",
        interpretation:
          "The article reads this as a legal hook for congressional and judicial constraint over executive action.",
      },
    ],
    claims: [
      {
        id: "congress-branch-hierarchy",
        status: "direct_quote",
        label: "Branch hierarchy",
        text: "The transcript attacks the idea of three co-equal branches and argues for a stronger congressional center.",
        receiptIds: ["raskin-coequal-word", "raskin-tariffs-budget"],
      },
      {
        id: "congress-executive-clerk",
        status: "interpretation",
        label: "Executive demotion",
        text: "The article interprets this as converting the President from a co-equal executive into a subordinate clerk of Congress.",
        receiptIds: ["raskin-take-care"],
      },
      {
        id: "congress-bureaucratic-shield",
        status: "needs_source",
        label: "Career-official insulation",
        text: "The article's broader claim that Congress would lock in career agents needs additional source work beyond the current clips.",
        receiptIds: [],
      },
    ],
  },
  {
    id: "judicial-purge",
    number: 2,
    shortLabel: "Court",
    title: "Judicial Purge",
    kicker: "Chapter II",
    thesis:
      "The article argues that the Court is treated less as a coordinate branch and more as the last obstacle to be regulated, stripped, expanded, or delegitimized.",
    danger:
      "The alarming point is the escalation ladder: ethics rules, term limits, expansion, jurisdiction stripping, and shadow-docket messaging all point at constraining a hostile Court.",
    articleExcerpt:
      "The Supreme Court is cast as a captured redoubt, and reform becomes a purge of the last institution blocking the blueprint.",
    sourceStatus:
      "Strong transcript support for court expansion, ethics rules, term limits, shadow docket criticism, and jurisdiction stripping.",
    color: "#1d3557",
    comparisonRows: [
      {
        issue: "Ethics code",
        traditional: "Judicial ethics should preserve legitimacy without allowing Congress to command outcomes.",
        blueprint: "Use ethics regulation as a first lever over a Court depicted as corrupt or captured.",
      },
      {
        issue: "Jurisdiction",
        traditional: "Article III courts retain constitutional independence even when Congress sets jurisdiction.",
        blueprint: "Normalize jurisdiction stripping as a weapon against hostile rulings.",
      },
      {
        issue: "Court structure",
        traditional: "Court size and tenure are changed rarely to protect institutional continuity.",
        blueprint: "Treat expansion and term limits as ordinary democratic repair tools.",
      },
      {
        issue: "Shadow docket",
        traditional: "Emergency orders are technical instruments in limited procedural contexts.",
        blueprint: "Turn the shadow docket into proof of illegitimacy and minority-rule lock-in.",
      },
    ],
    receipts: [
      {
        id: "elias-court-menu",
        speaker: "Marc Elias",
        transcript: "How The Supreme Court's Shadow Docket Is Destroying Democracy Dahlia Lithwick.txt",
        locator: "line 34",
        quote: "term limits... an ethics code... a bigger expanded court",
        interpretation:
          "The reform menu named in the transcript matches the article's court-constraint chapter.",
      },
      {
        id: "bowie-jurisdiction",
        speaker: "Nikolas Bowie",
        transcript: "The Supreme Court's Secret Plan to Reshape America Professor Nikolas Bowie.txt",
        locator: "lines 263-275",
        quote: "Congress just stripped the court of jurisdiction",
        interpretation:
          "The transcript cites jurisdiction stripping as historical precedent for checking the Court.",
      },
      {
        id: "lithwick-invisible",
        speaker: "Dahlia Lithwick",
        transcript: "How The Supreme Court's Shadow Docket Is Destroying Democracy Dahlia Lithwick.txt",
        locator: "line 121",
        quote: "invisible ink",
        interpretation:
          "The article uses the shadow-docket critique as part of the legitimacy campaign against the Court.",
      },
    ],
    claims: [
      {
        id: "court-expansion",
        status: "direct_quote",
        label: "Expansion menu",
        text: "Court expansion, ethics rules, and term limits are explicitly discussed in the transcript set.",
        receiptIds: ["elias-court-menu"],
      },
      {
        id: "court-jurisdiction",
        status: "direct_quote",
        label: "Jurisdiction stripping",
        text: "Congressional stripping of jurisdiction is presented as a legitimate historical tool.",
        receiptIds: ["bowie-jurisdiction"],
      },
      {
        id: "court-purge-frame",
        status: "interpretation",
        label: "Purge framing",
        text: "The article's polemic describes those reforms as a purge because they target the Court when it blocks progressive outcomes.",
        receiptIds: ["elias-court-menu", "bowie-jurisdiction", "lithwick-invisible"],
      },
    ],
  },
  {
    id: "nationalized-ballot",
    number: 3,
    shortLabel: "Ballot",
    title: "Nationalized Ballot",
    kicker: "Chapter III",
    thesis:
      "The article presents election federalization as a war on state sovereignty, especially voter ID, citizenship checks, deadlines, and the Electoral College.",
    danger:
      "The reader-facing alarm is the replacement of state-run election integrity rules with national mandates and compact-driven presidential-election redesign.",
    articleExcerpt:
      "The battlefield moves from courtrooms to voter rolls, certification rules, ballot deadlines, and the Electoral College itself.",
    sourceStatus:
      "Transcript support exists for the National Popular Vote compact, Electoral College critique, voter ID dispute, and federal pressure around voting machines.",
    color: "#b7791f",
    comparisonRows: [
      {
        issue: "Voter ID",
        traditional: "States require identification as a ballot-integrity rule.",
        blueprint: "ID rules are treated as suppression and targeted for federal override.",
      },
      {
        issue: "Citizenship verification",
        traditional: "States verify eligibility through registration rules and citizenship checks.",
        blueprint: "Federalized rolls and anti-SAVE Act litigation become the new default.",
      },
      {
        issue: "Ballot deadlines",
        traditional: "Election Day and postmark deadlines supply finality and public confidence.",
        blueprint: "Late-ballot mandates and litigation extend the counting perimeter.",
      },
      {
        issue: "Presidential selection",
        traditional: "The Electoral College preserves the constitutional presidential-selection structure.",
        blueprint: "Use the National Popular Vote compact now, then amend later.",
      },
    ],
    receipts: [
      {
        id: "raskin-electoral-accident",
        speaker: "Rep. Jamie Raskin",
        transcript: "Can We Fix Our Broken Constitution Rep Jamie Raskin.txt",
        locator: "lines 161-163",
        quote: "The Electoral College is just an accident waiting to happen",
        interpretation:
          "The quote directly supports the article's claim that the Electoral College is framed as a danger.",
      },
      {
        id: "raskin-popular-vote",
        speaker: "Rep. Jamie Raskin",
        transcript: "Can We Fix Our Broken Constitution Rep Jamie Raskin.txt",
        locator: "lines 157-159",
        quote: "to use the Electoral College to get to a popular vote",
        interpretation:
          "This supports the article's claim that compact strategy routes around the existing structure.",
      },
      {
        id: "goldman-voting-machines",
        speaker: "Rep. Dan Goldman",
        transcript: "GOP's Voter Suppression Scam EXPOSED Rep. Dan Goldman.txt",
        locator: "lines 175-177",
        quote: "seizing voting machines and voting rolls",
        interpretation:
          "Goldman's amendment is framed as a guardrail against federal seizure of election infrastructure.",
      },
      {
        id: "blumenthal-id",
        speaker: "Sen. Richard Blumenthal",
        transcript: "Republicans Enabling Authoritarian Takeover of DOJ Sen. Richard Blumenthal.txt",
        locator: "line 294",
        quote: "photo ID laws... proof of citizenship registration laws",
        interpretation:
          "The transcript supports the article's claim that ID and citizenship rules are central targets of the dispute.",
      },
    ],
    claims: [
      {
        id: "ballot-npv",
        status: "direct_quote",
        label: "Compact route",
        text: "The National Popular Vote strategy is presented as a route from the Electoral College to popular vote selection.",
        receiptIds: ["raskin-popular-vote", "raskin-electoral-accident"],
      },
      {
        id: "ballot-id",
        status: "direct_quote",
        label: "ID and citizenship fight",
        text: "Voter ID and citizenship-registration rules are named in the transcript dispute.",
        receiptIds: ["blumenthal-id"],
      },
      {
        id: "ballot-late-mandates",
        status: "needs_source",
        label: "Late-ballot mandates",
        text: "The article table names late-ballot mandates, but the current transcript pass needs a precise supporting locator.",
        receiptIds: [],
      },
    ],
  },
  {
    id: "mobilization",
    number: 4,
    shortLabel: "Mobilize",
    title: "3.5% Mobilization",
    kicker: "Chapter IV",
    thesis:
      "The article turns the rhetoric of a popular upsurge into a mobilization chapter, arguing that nonprofits, litigators, academics, and media form the pressure infrastructure.",
    danger:
      "The alarm is a politics of permanent street-level and institutional pressure, not merely persuasion through elections.",
    articleExcerpt:
      "The report calls the 3.5 percent rule a mobilization doctrine and treats the progressive ecosystem as an insurgent support network.",
    sourceStatus:
      "Transcript support exists for popular-upsurge language and institutional mobilization; the 3.5 percent / Chenoweth reference needs another source.",
    color: "#4f5d2f",
    comparisonRows: [
      {
        issue: "Mass pressure",
        traditional: "Elections and civic activism channel disagreement through constitutional institutions.",
        blueprint: "A popular upsurge becomes the engine that forces institutional change.",
      },
      {
        issue: "Legal sector",
        traditional: "Law firms represent clients across partisan lines and protect adversarial process.",
        blueprint: "Legal institutions are pressured to align with the anti-Trump project.",
      },
      {
        issue: "Nonprofits",
        traditional: "Advocacy groups organize around issues within ordinary political competition.",
        blueprint: "Nonprofits become durable infrastructure for litigation, messaging, and pressure campaigns.",
      },
      {
        issue: "Academics",
        traditional: "Scholars analyze institutions and propose reforms.",
        blueprint: "Academic theories become operating manuals for constitutional redesign.",
      },
    ],
    receipts: [
      {
        id: "raskin-popular-upsurge",
        speaker: "Rep. Jamie Raskin",
        transcript: "Can We Fix Our Broken Constitution Rep Jamie Raskin.txt",
        locator: "lines 323-333",
        quote: "a popular upsurge",
        interpretation:
          "This is the strongest transcript anchor for the mobilization chapter.",
      },
      {
        id: "raskin-everything-attack",
        speaker: "Rep. Jamie Raskin",
        transcript: "Can We Fix Our Broken Constitution Rep Jamie Raskin.txt",
        locator: "lines 323-333",
        quote: "everything is under attack",
        interpretation:
          "The quote supports the article's emergency-mobilization framing.",
      },
      {
        id: "elias-law-firms",
        speaker: "Marc Elias",
        transcript: "Why Courts Have Failed the Voting Rights Movement.txt",
        locator: "lines 266-270",
        quote: "pledge pro bono hours to Donald Trump",
        interpretation:
          "Elias treats law-firm alignment as morally and politically significant.",
      },
    ],
    claims: [
      {
        id: "mobilize-upsurge",
        status: "direct_quote",
        label: "Popular upsurge",
        text: "Raskin explicitly calls for a popular upsurge amid institutional emergency language.",
        receiptIds: ["raskin-popular-upsurge", "raskin-everything-attack"],
      },
      {
        id: "mobilize-legal-sector",
        status: "interpretation",
        label: "Pressure infrastructure",
        text: "The article interprets law-firm criticism and allied institutions as part of a permanent pressure network.",
        receiptIds: ["elias-law-firms"],
      },
      {
        id: "mobilize-35",
        status: "needs_source",
        label: "3.5 percent doctrine",
        text: "The Erica Chenoweth / 3.5 percent rule reference appears in the article, but was not located in the transcript folder.",
        receiptIds: [],
      },
    ],
  },
  {
    id: "doj-politicization",
    number: 5,
    shortLabel: "DOJ",
    title: "DOJ Politicization",
    kicker: "Chapter V",
    thesis:
      "The article argues that anti-weaponization rhetoric is inverted into a plan to shield aligned career professionals and extract prosecutorial files for political use.",
    danger:
      "The alarm point is a justice system pulled in two directions at once: insulated from elected control when progressives hold the bureaucracy, but pressed for maximum disclosure and leverage against opponents.",
    articleExcerpt:
      "The final chapter turns to the Department of Justice: certification traps, bureaucratic shields, and the demand to release the Smith materials.",
    sourceStatus:
      "Transcript support exists for the Smith file, volume two, Bondi criticism, and voting-machine seizure guardrails. Some motive claims are interpretive.",
    color: "#633974",
    comparisonRows: [
      {
        issue: "Special counsel files",
        traditional: "Sensitive prosecutorial records are controlled through DOJ process and court orders.",
        blueprint: "Release the Smith materials to keep political and legal pressure alive.",
      },
      {
        issue: "Career officials",
        traditional: "Career staff serve elected administrations while following law and ethics rules.",
        blueprint: "Career actors become protected guardrails against an elected President.",
      },
      {
        issue: "Election infrastructure",
        traditional: "Election administration belongs primarily to states, with limited federal enforcement roles.",
        blueprint: "Federal seizures are blocked, but federal election mandates are still pursued elsewhere.",
      },
      {
        issue: "DOJ oversight",
        traditional: "Congress investigates abuse while respecting executive privilege and prosecutorial independence.",
        blueprint: "Oversight becomes leverage for disclosure, certification fights, and narrative control.",
      },
    ],
    receipts: [
      {
        id: "raskin-volume-two",
        speaker: "Rep. Jamie Raskin",
        transcript: "Trump is trying to trample Congress's power. Not on Jamie Raskin's watch..txt",
        locator: "line 115",
        quote: "time to release volume two",
        interpretation:
          "The transcript supports the article's focus on the unreleased Smith material.",
      },
      {
        id: "elias-smith-file",
        speaker: "Marc Elias",
        transcript: "Trump is trying to trample Congress's power. Not on Jamie Raskin's watch..txt",
        locator: "line 122",
        quote: "the full Smith file",
        interpretation:
          "The transcript directly names the full-file demand.",
      },
      {
        id: "goldman-doj-weaponizing",
        speaker: "Rep. Dan Goldman",
        transcript: "GOP's Voter Suppression Scam EXPOSED Rep. Dan Goldman.txt",
        locator: "line 4",
        quote: "stop presidents weaponizing the Department of Justice",
        interpretation:
          "Goldman's legislation is the direct anchor for the anti-weaponization claim.",
      },
      {
        id: "raskin-doj-leverage",
        speaker: "Rep. Jamie Raskin",
        transcript: "Trump is trying to trample Congress's power. Not on Jamie Raskin's watch..txt",
        locator: "line 129",
        quote: "more leverage with the DOJ",
        interpretation:
          "The article reads this as proof that oversight is also a pressure tool.",
      },
    ],
    claims: [
      {
        id: "doj-smith-release",
        status: "direct_quote",
        label: "Smith disclosure",
        text: "The transcripts explicitly call for volume two and the full Smith file.",
        receiptIds: ["raskin-volume-two", "elias-smith-file"],
      },
      {
        id: "doj-weaponization",
        status: "direct_quote",
        label: "Weaponization bill",
        text: "Goldman is described as backing legislation to stop presidents from weaponizing DOJ.",
        receiptIds: ["goldman-doj-weaponizing"],
      },
      {
        id: "doj-career-shield",
        status: "interpretation",
        label: "Bureaucratic shield",
        text: "The article interprets DOJ guardrail proposals as insulating aligned career professionals from executive control.",
        receiptIds: ["goldman-doj-weaponizing", "raskin-doj-leverage"],
      },
    ],
  },
];

export const chapterMap = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter]));

export const allClaims = chapters.flatMap((chapter) =>
  chapter.claims.map((claim) => ({ ...claim, chapterId: chapter.id })),
);

export const allReceipts = chapters.flatMap((chapter) =>
  chapter.receipts.map((receipt) => ({ ...receipt, chapterId: chapter.id })),
);

export const chapterTakeaways = [
  "The site distinguishes transcript receipts from strategic interpretation.",
  "Every direct quote carries a speaker, transcript file, and locator.",
  "Unsupported article claims remain visible, but are labeled as needing another source.",
  "The blueprint is now a five-chapter guided flow, with the map as navigation rather than the main artifact.",
];

export function getChapterById(id) {
  return chapterMap[id] ?? chapters[0];
}

export function getClaimById(id) {
  return allClaims.find((claim) => claim.id === id) ?? allClaims[0];
}

export function getReceiptsForClaim(chapter, claim) {
  return claim.receiptIds
    .map((receiptId) => chapter.receipts.find((receipt) => receipt.id === receiptId))
    .filter(Boolean);
}

export function getNextChapterId(id) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  return chapters[(index + 1 + chapters.length) % chapters.length].id;
}

export function getPreviousChapterId(id) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  return chapters[(index - 1 + chapters.length) % chapters.length].id;
}

export function searchableChapterText(chapter) {
  return [
    chapter.title,
    chapter.shortLabel,
    chapter.thesis,
    chapter.danger,
    chapter.articleExcerpt,
    chapter.sourceStatus,
    ...chapter.comparisonRows.flatMap((row) => [row.issue, row.traditional, row.blueprint]),
    ...chapter.claims.flatMap((claim) => [claim.label, claim.text, claim.status]),
    ...chapter.receipts.flatMap((receipt) => [
      receipt.speaker,
      receipt.transcript,
      receipt.locator,
      receipt.quote,
      receipt.interpretation,
    ]),
  ]
    .join(" ")
    .toLowerCase();
}
