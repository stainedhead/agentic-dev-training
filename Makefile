SLIDES_DIR := slides
BUILD_DIR  := build
NODE       := node
NPM        := npm

SENTINEL   := $(BUILD_DIR)/.npm_installed
SHARED     := $(BUILD_DIR)/shared.js

# ── Slide targets (slides/ ← build/moduleNN.js ← modules/NN-*.md) ───────────

$(SLIDES_DIR)/Module_01_Chat_vs_Agents_v2.pptx: modules/01-chat-vs-agents.md $(BUILD_DIR)/module01.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module01.js && cp Module_01_Chat_vs_Agents_v2.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_02_Core_Concepts.pptx: modules/02-core-concepts.md $(BUILD_DIR)/module02.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module02.js && cp Module_02_Core_Concepts.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_03_Context_Engineering.pptx: modules/03-context-engineering.md $(BUILD_DIR)/module03.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module03.js && cp Module_03_Context_Engineering.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_04_SDD_PRDs.pptx: modules/04-prd-and-sdd.md $(BUILD_DIR)/module04.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module04.js && cp Module_04_SDD_PRDs.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_05_Testing_CICD.pptx: modules/05-review-cycles.md $(BUILD_DIR)/module05.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module05.js && cp Module_05_Testing_CICD.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_06_Review_Hygiene.pptx: modules/06-observability-reliability-security.md $(BUILD_DIR)/module06.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module06.js && cp Module_06_Review_Hygiene.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_07_Observability.pptx: modules/07-finops.md $(BUILD_DIR)/module07.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module07.js && cp Module_07_Observability.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_08_Security.pptx: modules/08-design-reviews.md $(BUILD_DIR)/module08.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module08.js && cp Module_08_Security.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_09_FinOps.pptx: modules/09-finops.md $(BUILD_DIR)/module09.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module09.js && cp Module_09_FinOps.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_10_Design_Reviews.pptx: modules/10-design-reviews.md $(BUILD_DIR)/module10.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module10.js && cp Module_10_Design_Reviews.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_11_Product_First.pptx: modules/11-product-first-engineering.md $(BUILD_DIR)/module11.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module11.js && cp Module_11_Product_First.pptx ../$(SLIDES_DIR)/

$(SLIDES_DIR)/Module_12_Three_Person_Team.pptx: modules/12-three-person-team.md $(BUILD_DIR)/module12.js $(SHARED) | $(SENTINEL)
	cd $(BUILD_DIR) && $(NODE) module12.js && cp Module_12_Three_Person_Team.pptx ../$(SLIDES_DIR)/

# ── Aggregates ───────────────────────────────────────────────────────────────

ALL_SLIDES := \
  $(SLIDES_DIR)/Module_01_Chat_vs_Agents_v2.pptx \
  $(SLIDES_DIR)/Module_02_Core_Concepts.pptx \
  $(SLIDES_DIR)/Module_03_Context_Engineering.pptx \
  $(SLIDES_DIR)/Module_04_SDD_PRDs.pptx \
  $(SLIDES_DIR)/Module_05_Testing_CICD.pptx \
  $(SLIDES_DIR)/Module_06_Review_Hygiene.pptx \
  $(SLIDES_DIR)/Module_07_Observability.pptx \
  $(SLIDES_DIR)/Module_08_Security.pptx \
  $(SLIDES_DIR)/Module_09_FinOps.pptx \
  $(SLIDES_DIR)/Module_10_Design_Reviews.pptx \
  $(SLIDES_DIR)/Module_11_Product_First.pptx \
  $(SLIDES_DIR)/Module_12_Three_Person_Team.pptx

.PHONY: all clean install

all: $(ALL_SLIDES)

# ── npm install (only when package files change) ─────────────────────────────

$(SENTINEL): $(BUILD_DIR)/package.json $(BUILD_DIR)/package-lock.json
	cd $(BUILD_DIR) && $(NPM) install
	@touch $@

install: $(SENTINEL)

# ── Clean ────────────────────────────────────────────────────────────────────

clean:
	rm -f $(SLIDES_DIR)/*.pptx
	rm -f $(BUILD_DIR)/*.pptx
	@echo "Slides removed. Run 'make all' to rebuild."

clean-all: clean
	rm -f $(SENTINEL)
	@echo "node_modules sentinel removed. Run 'make install' to reinstall."
