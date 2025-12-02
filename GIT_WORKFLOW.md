# 🐙 Git Workflow & Best Practices

## Branching Strategy
We follow a simplified Git Flow:

- **`main`**: Production-ready code. Never push directly here.
- **`feature/<name>`**: New features (e.g., `feature/analytics-ui`).
- **`fix/<name>`**: Bug fixes (e.g., `fix/url-validation`).
- **`improve/<name>`**: Refactoring or tech debt (e.g., `improve/error-handling`).

## Commit Messages
Use **Conventional Commits** for clarity:

- `feat: add custom alias support`
- `fix: resolve crash on empty url`
- `docs: update readme installation steps`
- `style: format code with black`
- `refactor: simplify storage service`

## Workflow Example

1. **Start a new feature**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/add-copy-button
   ```

2. **Make changes & Commit**
   ```bash
   git add .
   git commit -m "feat: add copy to clipboard button on result card"
   ```

3. **Simulate & Resolve Conflict (Practice)**
   - Create a conflict by editing the same line in `main` and your branch.
   - Run:
     ```bash
     git checkout main
     # edit file
     git commit -am "chore: change same line"
     git checkout feature/add-copy-button
     git rebase main
     # Fix conflicts in editor
     git add .
     git rebase --continue
     ```

4. **Clean History (Interactive Rebase)**
   If you have messy commits ("wip", "fix", "typo"), squash them:
   ```bash
   git rebase -i HEAD~3
   # Change 'pick' to 'squash' (or 's') for commits you want to merge into the previous one.
   ```

5. **Recover Mistakes (Reflog)**
   If you accidentally reset or lost a commit:
   ```bash
   git reflog
   # Find the HEAD@{n} index of your lost state
   git reset --hard HEAD@{n}
   ```
