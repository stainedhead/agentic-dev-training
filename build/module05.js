const pptxgen = require("pptxgenjs");
const { C, shadow, icon } = require("./shared");
const {
  FaVial, FaCheckCircle, FaLayerGroup, FaLink,
  FaFlask, FaCodeBranch, FaShieldAlt, FaBug,
  FaClipboardList, FaCog, FaCheck, FaExclamationTriangle,
} = require("react-icons/fa");

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Module 5: Automated Testing";
  pres.author = "Enterprise Architect Training Series";

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x: 0.4, y: 0.32, w: 9.2, h: 0.35, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 4, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.82, w: 1.5, h: 0.38, fill: { color: C.accent } });
    s.addText("MODULE 05", { x: 0.4, y: 0.82, w: 1.5, h: 0.38, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    s.addText("Automated\nTesting", { x: 0.4, y: 1.38, w: 7.0, h: 1.9, fontSize: 52, color: C.white, bold: true, margin: 0 });
    s.addText("TDD, test coverage, and the testing pyramid: how agents make comprehensive testing economically viable", { x: 0.4, y: 3.38, w: 7.0, h: 0.65, fontSize: 16, color: C.iceBlue, italic: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.1, w: 3.5, h: 0.04, fill: { color: C.accent } });
    s.addText([
      { text: "Duration: ", options: { bold: true, color: C.muted } },
      { text: "75–90 min  ", options: { color: C.muted } },
      { text: "  |  ", options: { color: C.muted } },
      { text: "Level: ", options: { bold: true, color: C.muted } },
      { text: "Intermediate", options: { color: C.muted } }
    ], { x: 0.4, y: 4.28, w: 5, h: 0.38, fontSize: 13, margin: 0 });

    // Right visual — testing pyramid
    s.addShape(pres.shapes.RECTANGLE, { x: 7.1, y: 0.55, w: 2.55, h: 4.8, fill: { color: C.mid, transparency: 25 }, shadow: shadow() });
    s.addText("TESTING\nPYRAMID", { x: 7.1, y: 0.62, w: 2.55, h: 0.55, fontSize: 9, color: C.iceBlue, bold: true, charSpacing: 1, align: "center", margin: 0 });

    const layers = [
      { label: "E2E Tests",          sub: "Slow · Selective · Governed",  color: C.red,    w: 1.5,  x: 7.93 },
      { label: "Functional / UI",    sub: "Contract & behaviour coverage", color: C.amber,  w: 1.9,  x: 7.73 },
      { label: "Integration Tests",  sub: "Components working together",   color: C.teal,   w: 2.18, x: 7.59 },
      { label: "Unit Tests",         sub: "Isolated · Fast · Deterministic", color: C.green, w: 2.5,  x: 7.43 },
    ];
    let ly = 1.3;
    for (let i = 0; i < layers.length; i++) {
      const l = layers[i];
      s.addShape(pres.shapes.RECTANGLE, { x: l.x, y: ly, w: l.w, h: 0.76, fill: { color: l.color, transparency: 18 } });
      s.addText(l.label, { x: l.x, y: ly + 0.04, w: l.w, h: 0.3, fontSize: 8.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(l.sub,   { x: l.x, y: ly + 0.38, w: l.w, h: 0.3, fontSize: 7,   color: C.pale,  align: "center", margin: 0 });
      ly += 0.82;
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Objectives
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("LEARNING OBJECTIVES", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("By the end of this module you will be able to:", { x: 0.35, y: 0.9, w: 9.3, h: 0.28, fontSize: 11, color: C.muted, italic: true, margin: 0 });

    const objs = [
      { icon: FaVial,         color: C.accent, title: "Apply TDD with an agent",              body: "Run the Red-Green-Refactor cycle with the agent as primary test and implementation author. Know what each step requires from the human and what the agent produces." },
      { icon: FaCheckCircle,  color: C.teal,   title: "Set and enforce the 85% threshold",    body: "Configure coverage gates in CI. Write acceptance criteria precise enough to drive test generation. Understand why the threshold is a floor, not a quality measure." },
      { icon: FaLayerGroup,   color: C.green,  title: "Apply the full testing pyramid",        body: "Distinguish unit, integration, functional, and regression tests. Know what each layer verifies and when to write each. Keep all layers in sync with agent-driven changes." },
      { icon: FaLink,         color: C.steel,  title: "Govern E2E test scope and ownership",  body: "Scope E2E tests to flows that justify the maintenance cost. Establish cross-team ownership agreements before writing tests that traverse another team's system." },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 2.0, w = 4.55, h = 1.82;
      const o = objs[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: o.color } });
      const ic = await icon(o.icon, "#" + o.color);
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.22, w: 0.4, h: 0.4 });
      s.addText(o.title, { x: x + 0.7, y: y + 0.18, w: w - 0.85, h: 0.42, fontSize: 12.5, color: C.navy, bold: true, margin: 0 });
      s.addText(o.body,  { x: x + 0.7, y: y + 0.64, w: w - 0.85, h: 1.05, fontSize: 11, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 3 — The Testing Foundation
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("THE TESTING FOUNDATION  —  WHY THE ECONOMICS CHANGED", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    // Quote banner
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.78, w: 9.3, h: 0.9, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("TDD was always correct. Teams did not adopt it because the economics were wrong. Agents fix the economics.\nThe question is no longer 'who has time to write tests?' It is 'are your ACs precise enough to generate them?'", {
      x: 0.6, y: 0.84, w: 8.8, h: 0.76,
      fontSize: 13.5, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
    });

    // Two columns: before / after
    const cols = [
      { x: 0.35, color: C.red,   heading: "BEFORE AGENTS",   items: [
        { label: "Tests took longer than code",    body: "Writing a thorough test suite for a feature routinely cost 2–3× the time to write the feature itself." },
        { label: "Coverage drifted downward",      body: "Every delivery sprint, tests were the first cut. Coverage trends only go one direction under pressure." },
        { label: "Regression was manual",          body: "Senior engineers spent significant time manually verifying that changes had not broken existing behaviour." },
        { label: "TDD was a discipline",           body: "Requiring the test first required habitual discipline most teams could not sustain under pressure." },
      ]},
      { x: 5.1,  color: C.green, heading: "WITH AGENTS",     items: [
        { label: "Tests are written at code speed", body: "An agent given an AC produces a comprehensive test suite — happy path, errors, edge cases — in seconds." },
        { label: "Coverage is maintained by default", body: "The agent is instructed never to reduce coverage below the threshold. It generates tests alongside every new branch." },
        { label: "Regression is automated",        body: "The agent writes a regression test before fixing a bug. The suite accumulates; no manual verification required." },
        { label: "TDD is the default",             body: "An agent given an AC writes the failing test first. Red-Green-Refactor is not a discipline — it is an instruction." },
      ]},
    ];

    for (let ci = 0; ci < cols.length; ci++) {
      const col = cols[ci];
      s.addShape(pres.shapes.RECTANGLE, { x: col.x, y: 1.82, w: 4.55, h: 3.6, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: col.x, y: 1.82, w: 4.55, h: 0.38, fill: { color: col.color, transparency: 22 } });
      s.addText(col.heading, { x: col.x + 0.12, y: 1.82, w: 4.3, h: 0.38, fontSize: 10, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
      for (let ii = 0; ii < col.items.length; ii++) {
        const item = col.items[ii];
        const y = 2.3 + ii * 0.78;
        s.addShape(pres.shapes.RECTANGLE, { x: col.x + 0.14, y: y + 0.05, w: 0.08, h: 0.08, fill: { color: col.color } });
        s.addText(item.label, { x: col.x + 0.32, y: y,       w: 4.1, h: 0.28, fontSize: 10.5, color: col.color === C.red ? C.amber : C.pale, bold: true, margin: 0 });
        s.addText(item.body,  { x: col.x + 0.32, y: y + 0.3, w: 4.1, h: 0.42, fontSize: 9.5, color: C.pale, margin: 0 });
      }
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — TDD: Red → Green → Refactor
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("TDD  —  RED → GREEN → REFACTOR", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Write a failing test first. Make it pass with the minimum code. Then improve the implementation — with the test as your safety net.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    // Three step cards
    const steps = [
      {
        n: "1", color: C.red, label: "RED", sub: "Write a failing test",
        humanDoes: "Provide the AC and specify the scenario",
        agentDoes: "Writes the test, names it to describe behaviour, verifies it fails",
        code: "it('returns 400 when email is missing', async () => {\n  const res = await post('/contact', { name: 'Alice' });\n  expect(res.status).toBe(400);\n  expect(res.body.error).toBe('Email is required');\n});\n// → FAIL: expected 400, received 200",
      },
      {
        n: "2", color: C.green, label: "GREEN", sub: "Make the test pass",
        humanDoes: "Reviews that the implementation is minimal and correct",
        agentDoes: "Writes the simplest code that makes the test pass — not the best code",
        code: "function validateContact(body) {\n  if (!body.email) {\n    return { status: 400, error: 'Email is required' };\n  }\n  return { status: 200 };\n}\n// → PASS: all assertions met",
      },
      {
        n: "3", color: C.accent, label: "REFACTOR", sub: "Improve without breaking",
        humanDoes: "Decides which improvements matter (naming, structure, patterns)",
        agentDoes: "Refactors implementation, re-runs full suite after each change",
        code: "const ERRORS = { MISSING_EMAIL: 'Email is required' };\n\nfunction validateContact({ email } = {}) {\n  if (!email) throw new ValidationError(ERRORS.MISSING_EMAIL);\n}\n// → PASS: refactored, test unchanged",
      },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const x = 0.35 + i * 3.18;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 3.02, h: 4.18, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 3.02, h: 0.52, fill: { color: st.color, transparency: 15 } });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 1.34, w: 0.38, h: 0.38, fill: { color: st.color } });
      s.addText(st.n, { x: x + 0.1, y: 1.34, w: 0.38, h: 0.38, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.label, { x: x + 0.56, y: 1.32, w: 2.3, h: 0.3, fontSize: 12, color: C.navy, bold: true, valign: "middle", margin: 0 });
      s.addText(st.sub,   { x: x + 0.56, y: 1.6,  w: 2.3, h: 0.2, fontSize: 9,  color: C.muted, margin: 0 });

      s.addText("Human:", { x: x + 0.14, y: 1.9, w: 0.55, h: 0.22, fontSize: 9, color: C.navy, bold: true, margin: 0 });
      s.addText(st.humanDoes, { x: x + 0.72, y: 1.9, w: 2.2, h: 0.22, fontSize: 9, color: C.text, margin: 0 });
      s.addText("Agent:", { x: x + 0.14, y: 2.15, w: 0.55, h: 0.22, fontSize: 9, color: C.accent, bold: true, margin: 0 });
      s.addText(st.agentDoes, { x: x + 0.72, y: 2.15, w: 2.2, h: 0.22, fontSize: 9, color: C.text, margin: 0 });

      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 2.5, w: 2.82, h: 0.18, fill: { color: C.navy, transparency: 88 } });
      s.addText("EXAMPLE", { x: x + 0.1, y: 2.5, w: 2.82, h: 0.18, fontSize: 8, color: C.muted, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 2.7, w: 2.82, h: 2.62, fill: { color: C.navy, transparency: 5 } });
      s.addText(st.code, { x: x + 0.18, y: 2.72, w: 2.66, h: 2.58, fontSize: 8, color: C.pale, fontFace: "Consolas", valign: "top", margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — Unit Testing: What Makes a Good Unit Test
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("UNIT TESTING  —  WHAT MAKES A GOOD UNIT TEST", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    // Three properties left column
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.78, w: 4.55, h: 4.55, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("THE THREE PROPERTIES", { x: 0.5, y: 0.88, w: 4.0, h: 0.3, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 2, margin: 0 });

    const props = [
      { color: C.accent, label: "Isolated",        body: "No database, file system, network, or external service. All dependencies mocked or stubbed. If the test needs a running database to pass, it is not a unit test." },
      { color: C.green,  label: "Fast",             body: "Milliseconds per test. A full suite of hundreds of tests completes in seconds. Slow tests do not get run — they get skipped under pressure, defeating the purpose." },
      { color: C.teal,   label: "Deterministic",    body: "Same code, same result, every time. Time-dependent tests, random-seed tests, or tests depending on external state are fragile and do not belong in the unit suite." },
    ];
    for (let i = 0; i < props.length; i++) {
      const p = props[i];
      const y = 1.28 + i * 1.32;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.06, h: 1.08, fill: { color: p.color } });
      s.addText(p.label, { x: 0.7, y: y + 0.02, w: 4.0, h: 0.32, fontSize: 12.5, color: p.color, bold: true, margin: 0 });
      s.addText(p.body,  { x: 0.7, y: y + 0.36, w: 4.05, h: 0.7, fontSize: 10, color: C.pale, margin: 0 });
    }

    // Right column — test naming + behaviour vs implementation
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.78, w: 4.55, h: 2.1, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("TEST BEHAVIOUR, NOT IMPLEMENTATION", { x: 5.26, y: 0.88, w: 4.2, h: 0.3, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 2, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 5.24, y: 1.22, w: 4.24, h: 0.42, fill: { color: C.red, transparency: 82 } });
    s.addText("// Tests implementation — BRITTLE", { x: 5.32, y: 1.22, w: 4.1, h: 0.2, fontSize: 8.5, color: C.red, fontFace: "Consolas", margin: 0 });
    s.addText("it('calls validateEmail() before DB', ...)", { x: 5.32, y: 1.44, w: 4.1, h: 0.18, fontSize: 8.5, color: C.pale, fontFace: "Consolas", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 5.24, y: 1.72, w: 4.24, h: 0.42, fill: { color: C.green, transparency: 82 } });
    s.addText("// Tests behaviour — ROBUST", { x: 5.32, y: 1.72, w: 4.1, h: 0.2, fontSize: 8.5, color: C.green, fontFace: "Consolas", margin: 0 });
    s.addText("it('rejects form with invalid email', ...)", { x: 5.32, y: 1.94, w: 4.1, h: 0.18, fontSize: 8.5, color: C.pale, fontFace: "Consolas", margin: 0 });

    // Naming convention card
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 2.98, w: 4.55, h: 2.35, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("TEST NAMING CONVENTION", { x: 5.26, y: 3.08, w: 4.2, h: 0.3, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 2, margin: 0 });

    const names = [
      { good: true,  name: "returns 401 when the token has expired" },
      { good: true,  name: "returns empty array when no records match the query" },
      { good: false, name: "test auth error case" },
      { good: false, name: "it works correctly" },
    ];
    for (let i = 0; i < names.length; i++) {
      const n = names[i];
      const y = 3.46 + i * 0.44;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.24, y: y + 0.04, w: 0.22, h: 0.22, fill: { color: n.good ? C.green : C.red } });
      s.addText(n.good ? "✓" : "✕", { x: 5.24, y: y + 0.04, w: 0.22, h: 0.22, fontSize: 9, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(n.name, { x: 5.52, y, w: 4.0, h: 0.3, fontSize: 9, color: n.good ? C.pale : C.muted, fontFace: "Consolas", valign: "middle", margin: 0 });
    }
    s.addText("A failing test with a clear name tells you immediately what behaviour broke.", { x: 5.1, y: 5.2, w: 4.55, h: 0.28, fontSize: 9.5, color: C.iceBlue, italic: true, margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — Test Coverage: The 85% Target
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("TEST COVERAGE  —  THE 85% TARGET", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Coverage is a floor, not a quality measure. The threshold catches the absence of tests — code review enforces their quality.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11, color: C.muted, italic: true, margin: 0 });

    // Coverage zones
    const zones = [
      { range: "< 85%",   color: C.red,    label: "DANGER ZONE",     body: "Regression risk increases sharply. Changes to untested code produce silent regressions. Refactoring is dangerous. Merge blocked by CI." },
      { range: "85–95%",  color: C.green,  label: "PRODUCTIVE ZONE", body: "Effort per new tested line is manageable. Protection is substantial. Teams in this range report confident refactoring and low regression rates." },
      { range: "> 95%",   color: C.amber,  label: "DIMINISHING RETURNS", body: "Marginal coverage often covers code that is genuinely difficult to test (infra error paths, third-party error handling). Tests written here are often brittle." },
    ];
    for (let i = 0; i < zones.length; i++) {
      const z = zones[i];
      const x = 0.35 + i * 3.18;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 3.02, h: 1.52, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 3.02, h: 0.42, fill: { color: z.color, transparency: 15 } });
      s.addText(z.range, { x: x + 0.12, y: 1.28, w: 0.88, h: 0.42, fontSize: 14, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(z.label, { x: x + 1.08, y: 1.3,  w: 1.82, h: 0.38, fontSize: 9,  color: C.white, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
      s.addText(z.body,  { x: x + 0.14, y: 1.76, w: 2.78, h: 0.98, fontSize: 10, color: C.muted, margin: 0 });
    }

    // CI config example
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.95, w: 4.75, h: 2.72, fill: { color: C.navy }, shadow: shadow() });
    s.addText("COVERAGE GATE IN CI  —  jest (package.json)", { x: 0.5, y: 3.04, w: 4.4, h: 0.26, fontSize: 9, color: C.iceBlue, bold: true, charSpacing: 1, margin: 0 });
    s.addText(`"jest": {
  "coverageThreshold": {
    "global": {
      "branches":   85,
      "functions":  85,
      "lines":      85,
      "statements": 85
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{js,ts}",
    "!src/**/*.spec.*"
  ]
}`, { x: 0.5, y: 3.34, w: 4.5, h: 2.22, fontSize: 9, color: C.pale, fontFace: "Consolas", valign: "top", margin: 0 });

    // Agent instruction card
    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 2.95, w: 4.4, h: 2.72, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 2.95, w: 4.4, h: 0.36, fill: { color: C.accent, transparency: 18 } });
    s.addText("CLAUDE.md INSTRUCTION FOR COVERAGE", { x: 5.38, y: 2.95, w: 4.1, h: 0.36, fontSize: 9, color: C.white, bold: true, charSpacing: 1, valign: "middle", margin: 0 });

    const instructions = [
      { color: C.accent, text: "Never reduce test coverage below 85% in any PR." },
      { color: C.teal,   text: "Add tests for every new branch you introduce — including error paths." },
      { color: C.green,  text: "When changing existing code, verify that current tests still cover the changed lines." },
      { color: C.amber,  text: "If a line is genuinely untestable, add a coverage-ignore comment and note why in the PR." },
    ];
    for (let i = 0; i < instructions.length; i++) {
      const ins = instructions[i];
      const y = 3.42 + i * 0.56;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.38, y: y + 0.1, w: 0.06, h: 0.36, fill: { color: ins.color } });
      s.addText(ins.text, { x: 5.54, y, w: 3.98, h: 0.5, fontSize: 10, color: C.text, valign: "middle", margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — The AC-to-Test Pipeline
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("THE AC-TO-TEST PIPELINE  —  SPEC TO CODE TO COVERAGE", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    // Pipeline flow
    const pipeline = [
      { label: "PRD / Spec",           sub: "Module 04",    color: C.steel,  detail: "Acceptance Criteria live here — the authoritative source of what must be tested" },
      { label: "AC Extracted",         sub: "Human curates", color: C.accent, detail: "Human ensures AC is specific, measurable, unambiguous, and bounded — testable AC" },
      { label: "Tests Generated",      sub: "Agent writes",  color: C.teal,   detail: "Agent produces test files: one test per AC statement, covering happy path, errors, and edges" },
      { label: "Code Implemented",     sub: "Agent (TDD)",   color: C.green,  detail: "Agent writes minimum code to pass tests (Green step). No new code without a passing test." },
      { label: "CI Gate",              sub: "Automated",     color: C.amber,  detail: "Tests run + coverage threshold enforced. PR blocked if below 85% or any test fails." },
    ];

    for (let i = 0; i < pipeline.length; i++) {
      const p = pipeline[i];
      const y = 0.84 + i * 0.9;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.78, fill: { color: C.mid, transparency: i % 2 === 0 ? 18 : 35 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 2.25, h: 0.78, fill: { color: p.color, transparency: 22 } });
      s.addText(p.label, { x: 0.5, y, w: 2.05, h: 0.42, fontSize: 11, color: C.white, bold: true, valign: "bottom", margin: 0 });
      s.addText(p.sub,   { x: 0.5, y: y + 0.44, w: 2.05, h: 0.28, fontSize: 9, color: C.iceBlue, valign: "top", margin: 0 });
      s.addText("→", { x: 2.65, y, w: 0.4, h: 0.78, fontSize: 18, color: p.color, align: "center", valign: "middle", margin: 0 });
      s.addText(p.detail, { x: 3.1, y, w: 6.42, h: 0.78, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }

    // Testable AC table at bottom
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.22, w: 9.3, h: 0.28, fill: { color: C.accent, transparency: 70 } });
    s.addText("What makes AC testable:  specific  ·  measurable  ·  unambiguous  ·  bounded  —  vague AC produces wrong tests at machine speed", {
      x: 0.35, y: 5.22, w: 9.3, h: 0.28,
      fontSize: 10, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — Integration and Functional Testing
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("INTEGRATION & FUNCTIONAL TESTING  —  COMPONENTS WORKING TOGETHER", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });

    // Two columns
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.96, w: 4.55, h: 4.4, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.96, w: 4.55, h: 0.42, fill: { color: C.teal, transparency: 20 } });
    s.addText("INTEGRATION TESTS", { x: 0.5, y: 0.96, w: 4.2, h: 0.42, fontSize: 11, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const integrationItems = [
      { label: "What they verify",  body: "Components working together: service + database, service + external API, two services communicating over a message bus." },
      { label: "How they differ",   body: "Where unit tests mock all dependencies, integration tests use real instances (or close approximations). They verify the interfaces, not the logic." },
      { label: "When to write",     body: "For every interface between components — data access layer, API client, event consumer. Not for business logic (that is unit tests)." },
      { label: "Speed",             body: "Seconds per test. Run in CI, but not in the fast pre-commit hook. Keep the pre-commit hook to unit tests only." },
    ];
    for (let i = 0; i < integrationItems.length; i++) {
      const it = integrationItems[i];
      const y = 1.48 + i * 0.82;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y + 0.06, w: 0.06, h: 0.58, fill: { color: C.teal } });
      s.addText(it.label, { x: 0.68, y, w: 4.08, h: 0.28, fontSize: 11, color: C.navy, bold: true, margin: 0 });
      s.addText(it.body,  { x: 0.68, y: y + 0.3, w: 4.08, h: 0.5, fontSize: 9.5, color: C.muted, margin: 0 });
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.96, w: 4.55, h: 4.4, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.96, w: 4.55, h: 0.42, fill: { color: C.accent, transparency: 20 } });
    s.addText("FUNCTIONAL TESTS", { x: 5.25, y: 0.96, w: 4.2, h: 0.42, fontSize: 11, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const functionalItems = [
      { label: "What they verify",  body: "User-facing behaviour from the outside. An API's functional tests verify the contract — request shape, response shape, status codes, and error messages — as a black box." },
      { label: "API contract tests", body: "Verify that the API's published contract is met, regardless of internal implementation. These tests survive refactoring; they break only when the contract changes." },
      { label: "Keeping in sync",   body: "Agent instruction: when changing an interface, update integration and functional tests in the same PR. A PR that changes an API response without updating the contract test is incomplete." },
      { label: "Sync rule in CLAUDE.md", body: "\"When you change an interface, update the integration and functional tests that cover it. Never leave contract tests inconsistent with the implementation.\"" },
    ];
    for (let i = 0; i < functionalItems.length; i++) {
      const it = functionalItems[i];
      const y = 1.48 + i * 0.82;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.24, y: y + 0.06, w: 0.06, h: 0.58, fill: { color: C.accent } });
      s.addText(it.label, { x: 5.42, y, w: 4.08, h: 0.28, fontSize: 11, color: C.navy, bold: true, margin: 0 });
      s.addText(it.body,  { x: 5.42, y: y + 0.3, w: 4.08, h: 0.5, fontSize: 9.5, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — Regression Testing
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("REGRESSION TESTING  —  THE ACCUMULATED SAFETY NET", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    // Definition banner
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.78, w: 9.3, h: 0.72, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("A regression test is a test written because a bug was found. Every test in the regression suite corresponds to a real problem that once reached production. Over time, it becomes the most specific and battle-tested part of the test suite.", {
      x: 0.55, y: 0.84, w: 8.9, h: 0.6,
      fontSize: 11.5, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
    });

    // Workflow cards
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.62, w: 9.3, h: 0.34, fill: { color: C.accent, transparency: 72 } });
    s.addText("AGENT-ASSISTED REGRESSION WORKFLOW", { x: 0.35, y: 1.62, w: 9.3, h: 0.34, fontSize: 10, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const workflow = [
      { n: "1", color: C.red,    label: "Bug reported",        body: "Bug arrives via issue, alert, or customer report. Agent reads the bug report and the relevant code." },
      { n: "2", color: C.amber,  label: "Failing test written", body: "Agent writes a test that reproduces the bug. The test must fail before any fix is written — this confirms the bug is understood." },
      { n: "3", color: C.green,  label: "Bug fixed",            body: "Agent fixes the bug. The regression test turns green. Suite runs — no existing tests broken." },
      { n: "4", color: C.accent, label: "Test committed",       body: "Regression test is committed alongside the fix. The bug can never return silently — the test will catch it." },
    ];
    for (let i = 0; i < workflow.length; i++) {
      const w = workflow[i];
      const x = 0.35 + i * 2.38;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.06, w: 2.22, h: 3.28, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.06, w: 2.22, h: 0.44, fill: { color: w.color, transparency: 15 } });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 2.1, w: 0.34, h: 0.34, fill: { color: w.color } });
      s.addText(w.n, { x: x + 0.1, y: 2.1, w: 0.34, h: 0.34, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(w.label, { x: x + 0.52, y: 2.1, w: 1.6, h: 0.4, fontSize: 10, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(w.body, { x: x + 0.14, y: 2.58, w: 1.98, h: 2.64, fontSize: 10, color: C.pale, margin: 0 });
      if (i < 3) {
        s.addText("→", { x: x + 2.22, y: 3.28, w: 0.16, h: 0.4, fontSize: 18, color: w.color, align: "center", valign: "middle", margin: 0 });
      }
    }

    // CLAUDE.md instruction
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.22, w: 9.3, h: 0.28, fill: { color: C.accent, transparency: 70 } });
    s.addText("CLAUDE.md rule: When fixing a bug, always write a regression test that reproduces the bug before implementing the fix. No fix without a test.", {
      x: 0.35, y: 5.22, w: 9.3, h: 0.28,
      fontSize: 10, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — End-to-End Testing: Scope and Governance
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("END-TO-END TESTING  —  SCOPE AND GOVERNANCE", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("E2E tests are the most expensive tests you can write. Use them selectively. Govern them explicitly.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    // Cost panel left
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 4.55, h: 2.08, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 4.55, h: 0.38, fill: { color: C.red, transparency: 18 } });
    s.addText("WHY E2E TESTS ARE EXPENSIVE", { x: 0.5, y: 1.28, w: 4.2, h: 0.38, fontSize: 10, color: C.white, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
    const costs = [
      { c: C.red,   t: "Slow",       b: "Minutes per test. A full E2E suite can take hours to run." },
      { c: C.amber, t: "Brittle",    b: "Any change in UI, API contract, or data model can break the test." },
      { c: C.steel, t: "Cross-team", b: "A test traversing another team's system will break when they change theirs." },
    ];
    for (let i = 0; i < costs.length; i++) {
      const co = costs[i];
      const y = 1.76 + i * 0.52;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y + 0.1, w: 0.06, h: 0.3, fill: { color: co.c } });
      s.addText(co.t, { x: 0.68, y, w: 0.7, h: 0.28, fontSize: 11, color: co.c, bold: true, margin: 0 });
      s.addText(co.b, { x: 1.44, y, w: 3.3, h: 0.28, fontSize: 10, color: C.muted, valign: "middle", margin: 0 });
    }

    // When to use / not use
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.28, w: 4.55, h: 2.08, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.28, w: 4.55, h: 0.38, fill: { color: C.green, transparency: 18 } });
    s.addText("WHEN E2E COVERAGE IS WARRANTED", { x: 5.25, y: 1.28, w: 4.2, h: 0.38, fontSize: 10, color: C.white, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
    const when = [
      "Core user journeys — if broken, the product is unusable",
      "Flows with regulatory obligations (payment, data handling)",
      "High-impact cross-team integrations that have previously broken",
    ];
    const whenNot = [
      "Edge cases / error paths — unit and integration tests cover these better",
      "New features before the implementation is stable",
      "Flows already fully covered by functional contract tests",
    ];
    for (let i = 0; i < when.length; i++) {
      const y = 1.76 + i * 0.52;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.24, y: y + 0.1, w: 0.06, h: 0.3, fill: { color: C.green } });
      s.addText(when[i], { x: 5.42, y, w: 4.08, h: 0.44, fontSize: 10, color: C.muted, valign: "middle", margin: 0 });
    }

    // Governance model
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.48, w: 9.3, h: 1.98, fill: { color: C.navy, transparency: 5 }, shadow: shadow() });
    s.addText("CROSS-TEAM OWNERSHIP MODEL", { x: 0.55, y: 3.56, w: 9.0, h: 0.3, fontSize: 10.5, color: C.iceBlue, bold: true, charSpacing: 2, margin: 0 });

    const govRules = [
      { color: C.accent, rule: "Before writing an E2E test that traverses another team's system — get explicit agreement from that team that they will help maintain it." },
      { color: C.teal,   rule: "Document ownership in the test file. Each team is responsible for fixing E2E failures caused by their own changes." },
      { color: C.green,  rule: "Review the E2E suite quarterly. Prune untended tests; renegotiate ownership for suites that have changed in scope." },
      { color: C.amber,  rule: "Unowned E2E tests are a smell. Either assign ownership — or delete them. An unowned test that breaks blocks everyone." },
    ];
    for (let i = 0; i < govRules.length; i++) {
      const gr = govRules[i];
      const y = 3.96 + i * 0.36;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y + 0.08, w: 0.06, h: 0.22, fill: { color: gr.color } });
      s.addText(gr.rule, { x: 0.68, y, w: 8.82, h: 0.32, fontSize: 10, color: C.pale, valign: "middle", margin: 0 });
    }

    // Not warranted footnote
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.28, w: 9.3, h: 0.28, fill: { color: C.muted, transparency: 80 } });
    s.addText("Not warranted:  " + whenNot.join("  ·  "), {
      x: 0.35, y: 5.28, w: 9.3, h: 0.28,
      fontSize: 9, color: C.text, italic: true, align: "center", valign: "middle", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("LAB EXERCISE", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Use a real project, a representative sample repository, or the training sample codebase", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const steps = [
      {
        n: "1", min: "10 min", color: C.accent,
        title: "Write three testable ACs",
        desc: "Take a feature from a current project. Rewrite three ACs using the testable format: specific, measurable, unambiguous, bounded. For each AC, write the test name (not code) that would verify it. Do the names make sense without reading the AC? If not, the AC needs to be more specific.",
      },
      {
        n: "2", min: "12 min", color: C.teal,
        title: "Apply the TDD cycle",
        desc: "Choose one testable AC. Write the failing test (Red) — verify it fails for the right reason. Write the minimum code to pass it (Green). Refactor the implementation without touching the test. If using an agent, instruct it to follow the TDD cycle explicitly and review each step.",
      },
      {
        n: "3", min: "10 min", color: C.green,
        title: "Audit coverage and the DoD gate",
        desc: "Run the test suite with coverage. What is the current percentage? Write (or find) the CI configuration that enforces the 85% threshold. Identify one area below 60%: what AC would drive tests to bring it above 85%?",
      },
      {
        n: "4", min: "8 min", color: C.steel,
        title: "Scope your E2E tests",
        desc: "Identify three user journeys. For each: does it warrant E2E coverage? Apply the criteria — core flow, regulatory obligation, high-impact integration. For each that does: who owns it? If it crosses another team's boundary, is there an agreement? Mark unowned tests for governance review.",
      },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const y = 1.28 + i * 1.0;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.9, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.52, h: 0.9, fill: { color: st.color } });
      s.addText(st.n, { x: 0.35, y, w: 0.52, h: 0.9, fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.title, { x: 0.98, y: y + 0.04, w: 2.4, h: 0.3, fontSize: 12, color: C.navy, bold: true, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.98, y: y + 0.38, w: 0.75, h: 0.22, fill: { color: st.color, transparency: 80 } });
      s.addText(st.min, { x: 0.98, y: y + 0.38, w: 0.75, h: 0.22, fontSize: 10, color: st.color, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.desc, { x: 1.86, y: y + 0.06, w: 7.68, h: 0.78, fontSize: 10, color: C.muted, valign: "middle", margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 12 — Discussion + Key Takeaways + Next Module
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.mid } });
    s.addText("MODULE 05  —  DISCUSSION & KEY TAKEAWAYS", { x: 0.4, y: 0, w: 9.2, h: 0.72, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });

    // Left — discussion questions
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.88, w: 4.55, h: 4.28, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("DISCUSSION", { x: 0.55, y: 1.0, w: 3.5, h: 0.35, fontSize: 11, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    const questions = [
      "Your team has been told to reach 85% coverage. How do you distinguish tests that genuinely add protection from tests written only to inflate the number? What would you put in your test review checklist?",
      "Think of a bug that reached production in the last year. Would a regression test have caught it? What would the AC that drove that test have looked like?",
      "Where in your current codebase do you have E2E tests that cross another team's boundary? Is there an explicit ownership agreement? What happens when they break?",
      "TDD has been the recommended practice for 25 years. What has prevented your team from adopting it? Does that barrier still exist if the agent writes the tests?",
    ];

    for (let i = 0; i < questions.length; i++) {
      const y = 1.46 + i * 0.94;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.28, h: 0.28, fill: { color: C.accent } });
      s.addText("Q" + (i + 1), { x: 0.5, y, w: 0.28, h: 0.28, fontSize: 9, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(questions[i], { x: 0.9, y, w: 3.85, h: 0.84, fontSize: 10, color: C.pale, valign: "middle", margin: 0 });
    }

    // Right — key takeaways
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.88, w: 4.55, h: 4.28, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("KEY TAKEAWAYS", { x: 5.3, y: 1.0, w: 3.5, h: 0.35, fontSize: 11, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    const takeaways = [
      { color: C.accent, text: "TDD was always correct. Agents fix the economics. The failing test first is now the default, not the discipline." },
      { color: C.teal,   text: "The human's job is not to write tests — it is to write AC precise enough to generate them. AC quality is the binding constraint." },
      { color: C.green,  text: "85% coverage is a DoD gate enforced in CI. Coverage is a floor for protection; code review is where test quality is enforced." },
      { color: C.amber,  text: "When fixing a bug, the regression test comes before the fix. No bug is fixed without a test that proves it cannot return silently." },
      { color: C.steel,  text: "E2E tests require explicit cross-team ownership agreements before being written. An unowned E2E test is a liability, not an asset." },
    ];

    for (let i = 0; i < takeaways.length; i++) {
      const t = takeaways[i];
      const y = 1.46 + i * 0.76;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y, w: 0.06, h: 0.65, fill: { color: t.color } });
      s.addText(t.text, { x: 5.42, y, w: 4.1, h: 0.65, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }

    // Next module banner
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.3, w: 10, h: 0.325, fill: { color: C.accent } });
    s.addText("NEXT  ·  Module 06: Spec-Driven Development & PRDs  —  Writing specs that agents can execute", {
      x: 0.4, y: 5.3, w: 9.2, h: 0.325,
      fontSize: 11, color: C.white, bold: true, valign: "middle", margin: 0
    });
  }

  await pres.writeFile({ fileName: "Module_05_Automated_Testing.pptx" });
  console.log("✅ Module 5 written");
}

build().catch(console.error);
