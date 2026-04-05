# Download the push script I generated, OR just run these commands:

# 1. Create the repo
gh repo create stainedhead/agentic-dev-training \
  --public \
  --description "Agentic Development Training Programme"

# 2. Clone it
gh repo clone stainedhead/agentic-dev-training

# 3. Put your files in it and push
cd agentic-dev-training
git add -A
git commit -m "feat: initial release of Enterprise Agentic Development Training Programme"
git push --set-upstream origin main