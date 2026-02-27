---
description: How to push updated code to GitHub
---

Follow these steps to push your latest changes to GitHub:

1. **Open your terminal** in the root directory of your project (`d:\FINAL-GREEN-CART`).

2. **Stage all changes**:
   ```bash
   git add .
   ```

3. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "Enhance UI: Remove dark mode, refine navbar, and standardize premium headings"
   ```

4. **Verify your branch**:
   Ensure you are on the `main` branch.
   ```bash
   git branch
   ```

5. **Push to GitHub**:
   ```bash
   git push origin main
   ```

> [!TIP]
> If you encounter an error during push, you might need to pull the latest changes from the remote first using `git pull origin main`.
