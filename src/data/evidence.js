/**
 * @typedef {Object} Signal
 * @property {string} id
 * @property {string} speaker
 * @property {string} quote
 * @property {string} interpretation
 *
 * @typedef {Object} Claim
 * @property {string} id
 * @property {string} label
 * @property {string} text
 *
 * @typedef {Object} ComparisonRow
 * @property {string} issue
 * @property {string} traditional
 * @property {string} blueprint
 * @property {string} result
 *
 * @typedef {Object} Chapter
 * @property {string} id
 * @property {number} number
 * @property {string} shortLabel
 * @property {string} title
 * @property {string} kicker
 * @property {string} thesis
 * @property {string} move
 * @property {string} publicFrame
 * @property {string} actualEffect
 * @property {string} whyMatters
 * @property {string} howFits
 * @property {string} danger
 * @property {string} consequence
 * @property {string} articleExcerpt
 * @property {string} pullQuote
 * @property {{theySay: string, patternShows: string}} counterFrame
 * @property {string} color
 * @property {ComparisonRow[]} comparisonRows
 * @property {Signal[]} signals
 * @property {Claim[]} claims
 */

/** @type {Chapter[]} */
export const chapters = [
  {
    id: "congressional-supremacy",
    number: 1,
    shortLabel: "Congress",
    title: "Congressional Supremacy",
    kicker: "Move I",
    thesis:
      "This is the opening move: redefine the Constitution so Congress becomes the command center and the elected executive becomes something closer to an administrative subordinate.",
    move:
      "Shift the center of constitutional gravity toward Congress and away from independent executive judgment.",
    publicFrame:
      "They call it restoring democratic accountability and preventing presidential abuse.",
    actualEffect:
      "It narrows the executive into a compliance office while congressional majorities set the terms of action.",
    whyMatters:
      "Checks and balances fail when one branch gets to define the job description of the others.",
    howFits:
      "If Congress becomes the command center, later moves against the Court, election rules, and enforcement agencies become easier to justify.",
    danger:
      "The danger is not oversight. It is the claim that the familiar three-branch balance is a myth, paired with a program to strip executive discretion over war, tariffs, spending, and faithful execution.",
    consequence: "Checks weakened",
    articleExcerpt:
      "If the branches are no longer co-equal, every later move becomes easier to justify: Congress commands, the President complies, and bureaucracy becomes the enforcement layer.",
    pullQuote:
      "The first move is always conceptual: change what the Constitution is said to mean, then change what power is allowed to do.",
    counterFrame: {
      theySay: "Congress is simply reclaiming power that presidents have taken for themselves.",
      patternShows:
        "The reform does not stop at accountability. It recasts executive independence as a defect to be corrected.",
    },
    color: "#9f2f2f",
    comparisonRows: [
      {
        issue: "National security",
        traditional: "The President acts as the national executive voice in strategy and crisis response.",
        blueprint: "Congress is positioned as the superior war-power branch.",
        result: "Crisis authority becomes slower, narrower, and more dependent on legislative permission.",
      },
      {
        issue: "Fiscal authority",
        traditional: "The executive administers appropriated funds with limited discretion.",
        blueprint: "Mandatory spending execution forces the President to spend as Congress directs.",
        result: "The executive loses leverage over the machinery it is elected to run.",
      },
      {
        issue: "Economic policy",
        traditional: "Trade and tariff tools can be used as executive bargaining power.",
        blueprint: "Tariff authority is pulled back into congressional control.",
        result: "Economic pressure tools become legislative weapons instead of national executive tools.",
      },
    ],
    signals: [
      {
        id: "raskin-coequal-word",
        speaker: "Rep. Jamie Raskin",
        quote: "co-equal is not even a word",
        interpretation:
          "The ordinary civic shorthand for branch equality is challenged before the argument for congressional primacy begins.",
      },
      {
        id: "raskin-tariffs-budget",
        speaker: "Rep. Jamie Raskin",
        quote: "Only Congress could control the budgets and impose taxes and tariffs.",
        interpretation:
          "The point is not a narrow budget dispute. It is a claim that economic leverage should move back under congressional command.",
      },
    ],
    claims: [
      {
        id: "congress-branch-hierarchy",
        label: "Branch hierarchy",
        text: "The familiar three-branch balance is treated as a misunderstanding, clearing space for congressional dominance.",
      },
      {
        id: "congress-executive-clerk",
        label: "Executive demotion",
        text: "Executive authority is narrowed until the President mainly carries out commands written elsewhere.",
      },
      {
        id: "congress-bureaucratic-shield",
        label: "Bureaucratic lock-in",
        text: "Career officials become harder for elected leadership to redirect, making the bureaucracy its own power center.",
      },
    ],
  },
  {
    id: "judicial-purge",
    number: 2,
    shortLabel: "Court",
    title: "Judicial Purge",
    kicker: "Move II",
    thesis:
      "Once the executive is weakened, the Court becomes the next obstacle. The plan is to regulate it, shame it, strip it, expand it, or make its rulings easier to defy.",
    move:
      "Turn judicial independence into a political problem and judicial reform into a tool for pressure.",
    publicFrame:
      "They call it ethics, accountability, democracy repair, and modernization.",
    actualEffect:
      "The Court is treated as legitimate only when it permits the project to advance.",
    whyMatters:
      "Rights are fragile when the branch meant to protect limits can be punished for enforcing them.",
    howFits:
      "A weakened Court removes the main institutional barrier to congressional dominance and election-rule redesign.",
    danger:
      "The escalation ladder runs through ethics rules, term limits, expansion, jurisdiction stripping, and emergency-order delegitimization.",
    consequence: "Courts conditional",
    articleExcerpt:
      "The Court is cast not as an independent branch, but as a captured redoubt that must be brought to heel before the rest of the project can move.",
    pullQuote:
      "The plan does not need to abolish judicial review if it can make judicial resistance too costly to survive.",
    counterFrame: {
      theySay: "Court reform is needed because the current Court is captured and anti-democratic.",
      patternShows:
        "The pressure always intensifies when the Court blocks progressive outcomes, which makes reform look like outcome control.",
    },
    color: "#1d3557",
    comparisonRows: [
      {
        issue: "Ethics code",
        traditional: "Ethics rules protect legitimacy without dictating outcomes.",
        blueprint: "Ethics regulation becomes a first lever over disfavored justices.",
        result: "Judicial independence is chilled by political recusal and legitimacy fights.",
      },
      {
        issue: "Jurisdiction",
        traditional: "Article III courts remain available for constitutional limits.",
        blueprint: "Jurisdiction stripping removes key questions from review.",
        result: "Major reforms can be insulated from the branch designed to test them.",
      },
      {
        issue: "Court structure",
        traditional: "Size and tenure change rarely to protect continuity.",
        blueprint: "Expansion and term limits become ordinary tools of repair.",
        result: "The Court can be rebuilt when it refuses the movement's agenda.",
      },
    ],
    signals: [
      {
        id: "elias-court-menu",
        speaker: "Marc Elias",
        quote: "term limits... an ethics code... a bigger expanded court",
        interpretation:
          "The reform menu is not cosmetic. It is a menu of pressure points over the institution that can still say no.",
      },
      {
        id: "bowie-jurisdiction",
        speaker: "Nikolas Bowie",
        quote: "Congress just stripped the court of jurisdiction",
        interpretation:
          "Jurisdiction stripping becomes the constitutional vocabulary for removing questions from the Court's reach.",
      },
    ],
    claims: [
      {
        id: "court-expansion",
        label: "Expansion menu",
        text: "Expansion, ethics rules, and term limits are presented as normal repairs rather than power plays.",
      },
      {
        id: "court-jurisdiction",
        label: "Jurisdiction stripping",
        text: "Congressional stripping of jurisdiction is presented as a legitimate historical tool.",
      },
      {
        id: "court-purge-frame",
        label: "Purge logic",
        text: "The reforms become a purge when they are aimed at outcomes first and institutional independence second.",
      },
    ],
  },
  {
    id: "nationalized-ballot",
    number: 3,
    shortLabel: "Ballot",
    title: "Nationalized Ballot",
    kicker: "Move III",
    thesis:
      "The third move is control over election rules: voter ID, citizenship checks, deadlines, voting machines, voter rolls, and the Electoral College.",
    move:
      "Move election administration away from state control and into national legal, bureaucratic, and litigation pressure.",
    publicFrame:
      "They call it voting access, anti-suppression, and protecting democracy.",
    actualEffect:
      "Rules that define the electorate are centralized, litigated, and recast as civil-rights commands.",
    whyMatters:
      "If the rules of voting are controlled from above, consent becomes easier to manufacture and harder to contest.",
    howFits:
      "Election-rule control protects every other move by shaping who can remove the people advancing it.",
    danger:
      "The danger is the replacement of state-run election integrity rules with national mandates and compact-driven presidential-election redesign.",
    consequence: "Election rules centralized",
    articleExcerpt:
      "When election administration is centralized, the fight is no longer only over persuasion. It is over the machinery that decides who votes, how votes count, and who settles disputes.",
    pullQuote:
      "Control the rules around the vote, and you do not need to persuade every voter. You can shape the battlefield itself.",
    counterFrame: {
      theySay: "Federal action is needed to stop voter suppression and make every vote count.",
      patternShows:
        "The same reforms weaken state safeguards, extend litigation over outcomes, and redirect presidential selection away from the existing structure.",
    },
    color: "#b7791f",
    comparisonRows: [
      {
        issue: "Voter ID",
        traditional: "States require identification as a ballot-integrity rule.",
        blueprint: "ID rules are treated as suppression and targeted for override.",
        result: "Eligibility safeguards become suspect by default.",
      },
      {
        issue: "Citizenship checks",
        traditional: "States verify voter eligibility through registration rules.",
        blueprint: "Citizenship verification is framed as exclusion.",
        result: "The boundary of the electorate becomes a national political fight.",
      },
      {
        issue: "Presidential selection",
        traditional: "The Electoral College preserves the federal election structure.",
        blueprint: "Compact strategy routes around the system while amendment remains out of reach.",
        result: "The presidency moves closer to national popular administration without constitutional consensus.",
      },
    ],
    signals: [
      {
        id: "raskin-electoral-accident",
        speaker: "Rep. Jamie Raskin",
        quote: "The Electoral College is just an accident waiting to happen",
        interpretation:
          "The Electoral College is framed as the problem so bypassing it can be sold as the solution.",
      },
      {
        id: "blumenthal-id",
        speaker: "Sen. Richard Blumenthal",
        quote: "photo ID laws... proof of citizenship registration laws",
        interpretation:
          "ID and citizenship rules sit at the center of the fight because they decide the boundary of the electorate.",
      },
    ],
    claims: [
      {
        id: "ballot-npv",
        label: "Compact route",
        text: "The National Popular Vote strategy is presented as a route from the Electoral College to popular vote selection.",
      },
      {
        id: "ballot-id",
        label: "ID and citizenship fight",
        text: "Voter ID and citizenship checks are recast as suppression, making federal override easier to defend.",
      },
      {
        id: "ballot-late-mandates",
        label: "Deadline erosion",
        text: "Deadline certainty gives way to a broader counting perimeter that can be litigated after Election Day.",
      },
    ],
  },
  {
    id: "mobilization",
    number: 4,
    shortLabel: "Mobilize",
    title: "3.5% Mobilization",
    kicker: "Move IV",
    thesis:
      "The fourth move is outside pressure: nonprofits, litigators, academics, media allies, and protest networks pushing institutions until they bend.",
    move:
      "Build a permanent pressure infrastructure that can force institutional change without winning every formal contest.",
    publicFrame:
      "They call it civic engagement, democracy defense, and people-powered resistance.",
    actualEffect:
      "Institutions face coordinated pressure from litigation, media narratives, academic theories, and street mobilization.",
    whyMatters:
      "Self-government is distorted when institutions respond more to pressure campaigns than to constitutional limits.",
    howFits:
      "Mobilization supplies the outside force that makes court pressure, election-rule fights, and enforcement leverage politically sustainable.",
    danger:
      "The danger is a politics of permanent street-level and institutional pressure, not merely persuasion through elections.",
    consequence: "Pressure normalized",
    articleExcerpt:
      "This is how the plan gets force without winning every vote: create a permanent pressure campaign that makes institutional resistance politically unbearable.",
    pullQuote:
      "The pressure campaign is the engine. It keeps every institutional fight moving after the formal vote is over.",
    counterFrame: {
      theySay: "Mass mobilization is ordinary democratic participation in a moment of crisis.",
      patternShows:
        "The mobilization is paired with institutional redesign, litigation pressure, and demands for permanent power shifts.",
    },
    color: "#4f5d2f",
    comparisonRows: [
      {
        issue: "Mass pressure",
        traditional: "Elections and civic activism channel disagreement through constitutional institutions.",
        blueprint: "A popular upsurge becomes the engine that forces institutional change.",
        result: "Institutions are judged by whether they yield to the movement.",
      },
      {
        issue: "Legal sector",
        traditional: "Law firms protect adversarial process across partisan lines.",
        blueprint: "Legal institutions are pressured to align with the anti-Trump project.",
        result: "Representation itself becomes a political loyalty test.",
      },
      {
        issue: "Academics",
        traditional: "Scholars analyze institutions and propose reforms.",
        blueprint: "Academic theories become operating manuals for constitutional redesign.",
        result: "Theory becomes permission structure for sweeping power changes.",
      },
    ],
    signals: [
      {
        id: "raskin-popular-upsurge",
        speaker: "Rep. Jamie Raskin",
        quote: "a popular upsurge",
        interpretation:
          "The phrase captures the role mass pressure plays in forcing institutional change.",
      },
      {
        id: "raskin-everything-attack",
        speaker: "Rep. Jamie Raskin",
        quote: "everything is under attack",
        interpretation:
          "Emergency language is the fuel. If everything is under attack, every pressure tactic can be sold as defense.",
      },
    ],
    claims: [
      {
        id: "mobilize-upsurge",
        label: "Popular upsurge",
        text: "A popular upsurge is framed as necessary amid institutional emergency language.",
      },
      {
        id: "mobilize-legal-sector",
        label: "Pressure infrastructure",
        text: "Law firms, advocacy groups, academics, and media figures become part of the same pressure network.",
      },
      {
        id: "mobilize-35",
        label: "Mobilization doctrine",
        text: "The 3.5 percent idea matters because it treats sustained mobilization as a way to force government change.",
      },
    ],
  },
  {
    id: "doj-politicization",
    number: 5,
    shortLabel: "DOJ",
    title: "DOJ Politicization",
    kicker: "Move V",
    thesis:
      "The final move is justice-system leverage: protect aligned career power, expose opponents, and keep investigations alive as political weapons.",
    move:
      "Use the justice system as a pressure instrument while insulating aligned bureaucratic power from elected control.",
    publicFrame:
      "They call it stopping weaponization, protecting career professionals, and enforcing accountability.",
    actualEffect:
      "Justice power is shielded when it serves the movement and exposed when it can damage opponents.",
    whyMatters:
      "The rule of law collapses when enforcement becomes a factional tool rather than a neutral limit.",
    howFits:
      "Enforcement leverage protects the whole plan by punishing resistance and preserving pressure after elections and court fights.",
    danger:
      "The danger is a justice system pulled in two directions at once: insulated from elected control when useful, but pressed for maximum disclosure and leverage against opponents.",
    consequence: "Opposition targetable",
    articleExcerpt:
      "When the same movement demands independence for its allies and maximum exposure for its enemies, the justice system stops looking neutral.",
    pullQuote:
      "The final move is not persuasion. It is leverage: make resistance risky and compliance easier.",
    counterFrame: {
      theySay: "Guardrails are needed so presidents cannot turn law enforcement into a personal weapon.",
      patternShows:
        "The guardrail argument becomes selective when it protects aligned officials while demanding exposure and pressure against opponents.",
    },
    color: "#633974",
    comparisonRows: [
      {
        issue: "Special counsel files",
        traditional: "Sensitive prosecutorial records stay constrained by process and court orders.",
        blueprint: "Release targeted material to keep political and legal pressure alive.",
        result: "Closed investigative material becomes public leverage.",
      },
      {
        issue: "Career officials",
        traditional: "Career staff serve elected administrations while following law and ethics rules.",
        blueprint: "Career actors become protected guardrails against an elected President.",
        result: "The permanent bureaucracy gains independence from democratic accountability.",
      },
      {
        issue: "Oversight",
        traditional: "Congress investigates abuse while respecting prosecutorial independence.",
        blueprint: "Oversight becomes leverage for disclosure and narrative control.",
        result: "Law enforcement fights become permanent political campaigns.",
      },
    ],
    signals: [
      {
        id: "raskin-volume-two",
        speaker: "Rep. Jamie Raskin",
        quote: "time to release volume two",
        interpretation:
          "The Smith material becomes a political instrument, not merely a closed prosecutorial record.",
      },
      {
        id: "elias-smith-file",
        speaker: "Marc Elias",
        quote: "the full Smith file",
        interpretation:
          "The demand for the full file keeps the pressure cycle alive.",
      },
    ],
    claims: [
      {
        id: "doj-smith-release",
        label: "Smith disclosure",
        text: "The Smith materials are treated as weapons for public pressure after the prosecution fight.",
      },
      {
        id: "doj-weaponization",
        label: "Weaponization bill",
        text: "Anti-weaponization language becomes a way to define which uses of DOJ power are legitimate.",
      },
      {
        id: "doj-career-shield",
        label: "Bureaucratic shield",
        text: "Guardrails can become shields when they protect aligned officials from elected accountability.",
      },
    ],
  },
];

export const chapterMap = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter]));

export const patternSteps = [
  {
    label: "Redefine power",
    text: "Make congressional command sound like constitutional restoration.",
  },
  {
    label: "Pressure the Court",
    text: "Turn judicial independence into a barrier to democracy.",
  },
  {
    label: "Control election rules",
    text: "Move the rules of voting away from state-level limits.",
  },
  {
    label: "Mobilize outside force",
    text: "Use pressure campaigns to make resistance politically costly.",
  },
  {
    label: "Use enforcement leverage",
    text: "Keep opponents exposed while shielding aligned power.",
  },
];

export const casePillars = [
  {
    title: "Not isolated",
    text: "Each reform looks narrower when viewed alone. Together, they point in the same direction: more centralized power and fewer independent limits.",
  },
  {
    title: "Sequenced",
    text: "The order matters. Redefine power first, pressure institutions next, then protect the result through elections, mobilization, and enforcement.",
  },
  {
    title: "Designed to endure",
    text: "The goal is not one policy win. It is a structure that survives elections by changing who holds power and who can challenge it.",
  },
];

export const dangerCards = [
  {
    title: "Checks weakened",
    text: "A system built on separated powers becomes a hierarchy with Congress and aligned institutions at the top.",
  },
  {
    title: "Election rules centralized",
    text: "State safeguards become obstacles, and national pressure decides which rules are legitimate.",
  },
  {
    title: "Courts conditional",
    text: "Judicial independence is respected only when the Court reaches acceptable outcomes.",
  },
  {
    title: "Bureaucracy insulated",
    text: "Permanent officials gain protection from elected leadership while still shaping policy outcomes.",
  },
  {
    title: "Opposition targetable",
    text: "Justice and oversight tools become pressure systems against political enemies.",
  },
];

export const counterFrames = chapters.map((chapter) => ({
  id: chapter.id,
  title: chapter.shortLabel,
  color: chapter.color,
  ...chapter.counterFrame,
}));

export const chapterTakeaways = [
  "The plan starts by redefining power.",
  "It pressures the institutions that can still say no.",
  "It changes the rules that decide who governs next.",
  "It uses pressure and enforcement to make the shift last.",
];

export function getChapterById(id) {
  return chapterMap[id] ?? chapters[0];
}

export function getNextChapterId(id) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  return chapters[(index + 1 + chapters.length) % chapters.length].id;
}

export function getPreviousChapterId(id) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  return chapters[(index - 1 + chapters.length) % chapters.length].id;
}
