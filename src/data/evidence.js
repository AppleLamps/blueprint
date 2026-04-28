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
 * @typedef {Object} Directive
 * @property {string} title
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
 * @property {string} strategicImperative
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
 * @property {Directive[]} operationalDirectives
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
      "The first move is to turn Congress into the command center and make the presidency answer to a legislative majority instead of the whole constitutional structure.",
    strategicImperative:
      "The case frames the modern presidency as the gateway to personal rule: spending discretion, tariff power, domestic military authority, and control over personnel all become threats that must be brought under legislative command.",
    move:
      "Shift the center of constitutional gravity toward Congress and away from independent executive judgment.",
    publicFrame:
      "They call it restoring checks and balances, protecting the power of the purse, and stopping presidential abuse.",
    actualEffect:
      "It narrows the executive into a compliance office while congressional majorities set the terms of spending, trade, enforcement, and crisis response.",
    whyMatters:
      "Checks and balances fail when one branch gets to define the job description of the others.",
    howFits:
      "If Congress becomes the command center, later moves against the Court, election rules, and enforcement agencies become easier to justify.",
    danger:
      "The danger is not oversight. It is the claim that the familiar three-branch balance is a myth, paired with a program to strip executive discretion over war, tariffs, spending, and faithful execution.",
    consequence: "Checks weakened",
    articleExcerpt:
      "This is the constitutional setup move. Once executive independence is treated as the problem, every later power transfer can be sold as democratic repair.",
    pullQuote:
      "The first move is always conceptual: change what the Constitution is said to mean, then change what power is allowed to do.",
    counterFrame: {
      theySay: "Congress is simply reclaiming power that presidents have taken for themselves.",
      patternShows:
        "The reform does not stop at accountability. It recasts executive independence as a defect to be corrected.",
    },
    color: "#9f2f2f",
    operationalDirectives: [
      {
        title: "Impoundment reform",
        text: "Force the executive to spend as Congress directs, removing a major lever presidents use to shape policy after appropriations pass.",
      },
      {
        title: "Tariff reclamation",
        text: "Pull trade and tariff authority back into Congress so economic pressure tools are legislative weapons, not executive bargaining power.",
      },
      {
        title: "Domestic military restrictions",
        text: "Narrow domestic deployment authority so the presidency cannot use emergency language to move force inside the country.",
      },
    ],
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
        id: "elias-props",
        speaker: "Marc Elias",
        quote: "Speaker Johnson and Leader Thune are mere props",
        interpretation:
          "The presidency is framed as having swallowed Congress, which creates the rhetorical opening for congressional supremacy.",
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
    strategicImperative:
      "The goal is a structural flip: weaken the Court's ability to stop federal legislation while portraying state-level election fights as the real constitutional emergency.",
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
    operationalDirectives: [
      {
        title: "Court expansion",
        text: "Dilute a hostile majority by changing the size of the institution instead of waiting for ordinary turnover.",
      },
      {
        title: "Mandatory ethics code",
        text: "Use legitimacy and recusal fights to keep pressure on disfavored justices and decisions.",
      },
      {
        title: "Term limits",
        text: "Convert lifetime tenure into a rotating political calendar, making the Court easier to plan around.",
      },
      {
        title: "Jurisdiction stripping",
        text: "Use congressional control over federal jurisdiction to move key questions out of judicial reach.",
      },
    ],
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
        id: "lithwick-unbounded",
        speaker: "Dahlia Lithwick",
        quote: "No Supreme Court in the world is as unbounded",
        interpretation:
          "The Court is framed as uniquely dangerous, creating permission for unusually aggressive pressure tactics.",
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
        label: "Review contained",
        text: "The Court keeps its name, but the most threatening disputes can be routed away from it.",
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
    strategicImperative:
      "State election authority is portrayed as a suppression machine, which makes federal control sound like rescue rather than takeover.",
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
    operationalDirectives: [
      {
        title: "Federal registration floor",
        text: "Use national standards to make state registration rules answer to federal civil-rights enforcement.",
      },
      {
        title: "Block citizenship barriers",
        text: "Treat documentary proof requirements as tools that burden students, married women, and other targeted groups.",
      },
      {
        title: "Defend birthright citizenship",
        text: "Keep citizenship status from becoming a backdoor fight over who belongs in the electorate.",
      },
      {
        title: "Protect urban power centers",
        text: "Frame federal or state pressure on major cities as intimidation of the voters who decide national power.",
      },
    ],
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
        id: "elias-save-act",
        speaker: "Marc Elias",
        quote: "The SAVE Act is a voter suppression bill",
        interpretation:
          "Citizenship verification is not treated as a neutral safeguard; it is framed as the front edge of exclusion.",
      },
      {
        id: "raskin-electoral-accident",
        speaker: "Rep. Jamie Raskin",
        quote: "The Electoral College is just an accident waiting to happen",
        interpretation:
          "The Electoral College is framed as the problem so bypassing it can be sold as the solution.",
      },
    ],
    claims: [
      {
        id: "ballot-federal-floor",
        label: "Federal floor",
        text: "The national standard sounds neutral, but it shifts election-rule authority upward.",
      },
      {
        id: "ballot-id",
        label: "ID and citizenship fight",
        text: "Voter ID and citizenship checks are recast as suppression, making federal override easier to defend.",
      },
      {
        id: "ballot-urban-targets",
        label: "City pressure",
        text: "Major cities become the emotional center of the argument because they carry electoral power.",
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
    strategicImperative:
      "Institutional change needs force from outside the institutions. The 3.5 percent idea turns a focused minority into the mandate for constitutional redesign.",
    move:
      "Build a permanent pressure infrastructure that can force institutional change without winning every formal contest.",
    publicFrame:
      "They call it civic courage, democracy defense, and people-powered resistance.",
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
    operationalDirectives: [
      {
        title: "Litigation networks",
        text: "Use aligned nonprofits and legal groups to challenge every opposing action and keep the institutions under pressure.",
      },
      {
        title: "Independent media",
        text: "Move around legacy gatekeepers through direct channels that repeat the same emergency frame to a committed audience.",
      },
      {
        title: "Long fight discipline",
        text: "Treat the project as generational so losses become proof of the need to continue, not reasons to stop.",
      },
    ],
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
        id: "ben-ghiat-long-fight",
        speaker: "Ruth Ben-Ghiat",
        quote: "We are in for a long fight",
        interpretation:
          "The project is framed as a durable movement, not a single election cycle or policy dispute.",
      },
      {
        id: "raskin-popular-upsurge",
        speaker: "Rep. Jamie Raskin",
        quote: "a popular upsurge",
        interpretation:
          "The phrase captures the role mass pressure plays in forcing institutional change.",
      },
    ],
    claims: [
      {
        id: "mobilize-upsurge",
        label: "Popular upsurge",
        text: "A focused minority is treated as enough to create a mandate for institutional change.",
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
    strategicImperative:
      "The justice system becomes the plan's shield and sword: shield aligned officials from elected control, then use disclosure, investigations, and ethics language to keep opponents exposed.",
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
    operationalDirectives: [
      {
        title: "Career official protections",
        text: "Make prosecutors, agents, inspectors, and civil servants harder for elected leadership to remove or redirect.",
      },
      {
        title: "Special counsel independence",
        text: "Keep politically explosive investigations alive by insulating them from presidential command.",
      },
      {
        title: "Ethics-first resistance",
        text: "Elevate resignations, refusals, and internal dissent as proof that professional judgment outranks political orders.",
      },
      {
        title: "Data and disclosure fights",
        text: "Turn voter data, investigative files, and oversight demands into permanent leverage contests.",
      },
    ],
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
        id: "prosecutors-obedience",
        speaker: "New York prosecutors",
        quote: "obedience supersedes all else",
        interpretation:
          "The conflict is framed as law versus loyalty, which makes career resistance sound like the only ethical option.",
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
        id: "doj-career-shield",
        label: "Bureaucratic shield",
        text: "Guardrails can become shields when they protect aligned officials from elected accountability.",
      },
      {
        id: "doj-weaponization",
        label: "Weaponization bill",
        text: "Anti-weaponization language becomes a way to define which uses of DOJ power are legitimate.",
      },
      {
        id: "doj-leverage",
        label: "Enforcement leverage",
        text: "Investigations, data demands, resignations, and disclosures become tools for permanent pressure.",
      },
    ],
  },
];

export const chapterMap = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter]));

export const strategicOverview = {
  title: "A five-part machine",
  body: [
    "The case is not that every proposal is identical. It is that they move in the same direction: away from state-based and executive-heavy limits, toward centralized power backed by mobilization and insulated enforcement.",
    "The legal theory underneath it is a structural flip: weaken the Court's ability to stop federal legislation while strengthening federal power over state election rules.",
  ],
  machine: [
    "Mobilization creates the mandate.",
    "Congress claims the authority.",
    "Court pressure clears the path.",
    "Election rules protect the majority.",
    "Justice leverage preserves the result.",
  ],
};

export const pressureMarkers = [
  {
    label: "The theory",
    title: "Horizontal review versus vertical review",
    text: "The Court is accused of policing Congress too aggressively while failing to police state election rules aggressively enough.",
  },
  {
    label: "The institutional target",
    title: "Turn independence into obstruction",
    text: "Executive discretion, judicial review, state election authority, and prosecutorial hierarchy are reframed as threats to democracy.",
  },
  {
    label: "The durability play",
    title: "Protect the new center",
    text: "Once authority moves upward, mobilization and enforcement power make the new arrangement harder to reverse.",
  },
];

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

export const counterFrames = [
  {
    id: "voter-id",
    title: "Voter ID",
    color: "#b7791f",
    theySay: "Voter ID prevents fraud.",
    patternShows:
      "The fight is used to treat state eligibility rules as suppression and invite federal override.",
  },
  {
    id: "save-act",
    title: "SAVE Act",
    color: "#b7791f",
    theySay: "Proof of citizenship protects elections.",
    patternShows:
      "The birth-certificate barrier becomes a national fight over who is allowed into the electorate.",
  },
  {
    id: "personnel",
    title: "Personnel",
    color: "#633974",
    theySay: "Personnel is policy.",
    patternShows:
      "Personnel becomes power when career actors can resist elected leadership while still shaping outcomes.",
  },
  {
    id: "shadow-orders",
    title: "Emergency orders",
    color: "#1d3557",
    theySay: "Emergency orders are procedural.",
    patternShows:
      "Emergency procedure becomes a legitimacy fight whenever the Court blocks the preferred result.",
  },
  {
    id: "congress",
    title: "Congress",
    color: "#9f2f2f",
    theySay: "This is just restoring Congress.",
    patternShows:
      "The restoration frame becomes a path to making the presidency subordinate to legislative command.",
  },
];

export const actorMap = [
  {
    name: "Marc Elias / Democracy Docket",
    role: "Litigation and election-rule strategy",
    text: "Frames voter ID, citizenship checks, court pressure, and federal voting standards as connected democracy-defense fights.",
  },
  {
    name: "Nikolas Bowie",
    role: "Constitutional theory",
    text: "Supplies the structural argument for congressional supremacy and for limiting the Court's ability to obstruct federal legislation.",
  },
  {
    name: "Dahlia Lithwick",
    role: "Court legitimacy pressure",
    text: "Turns the Court's authority into the public problem and helps make reform feel like rescue rather than control.",
  },
  {
    name: "Ruth Ben-Ghiat",
    role: "Movement discipline",
    text: "Places the fight in a long-game framework where sustained civic pressure becomes the required response.",
  },
  {
    name: "Democracy Forward",
    role: "Legal pressure network",
    text: "Represents the litigation model: challenge, delay, publicize, and keep institutional pressure active.",
  },
];

export const sharpestDetails = [
  {
    label: "Zero-sum elections",
    text: "The election fight is openly treated as winner-take-all politics, which explains why control of rules matters so much.",
  },
  {
    label: "Congress as prop",
    text: "The argument that Congress has become a prop creates the opening for a much more aggressive legislative supremacy model.",
  },
  {
    label: "Unbounded Court",
    text: "Calling the Court uniquely unbounded prepares the audience to accept expansion, term limits, ethics pressure, or jurisdiction limits.",
  },
  {
    label: "Birth-certificate barrier",
    text: "The fight over proof of citizenship lets the plan tie voting rules to citizenship, identity, and federal enforcement.",
  },
  {
    label: "Obedience versus ethics",
    text: "Justice-system resistance is framed as professional ethics, making career power look more legitimate than elected control.",
  },
  {
    label: "The long fight",
    text: "The plan is built to survive losses by treating every defeat as more proof that the institutions must be remade.",
  },
];

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
