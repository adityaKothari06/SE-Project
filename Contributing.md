# Contributing to Zero-Waste Pantry (ZWP)

Thank you for your interest in contributing! 
This document provides guidelines to help you collaborate effectively on this project.

---

## 📌 Contribution Workflow

### 1. Fork & Clone the Repository
```bash
git clone https://github.com/adityaKothari06/SE-Project
cd SE-project
```
## 2. Setup Frontend Locally (First Time Only)

```bash
cd frontend
npm install
npm start
```

### 3. Create a New Branch

🚫 Never work on main branch
```bash
git checkout -b feature/your-feature-name
```

Examples:
- `feature/login-page`
- `feature/event-form`
- `bugfix/reservation-error`

### 4. Make Your Changes
- Follow project structure
- Write clean and readable code
- Keep changes focused (one feature per branch)

### 5. Commit Your Changes
```bash
git add .
git commit -m "Add: short description of your changes"
```
**✅ Good Commit Messages:**
- Add login validation
- Fix reservation bug
- Update UI for event cards
**❌ Bad Commit Messages:**
- changes
- fix
- done

### 6. Push Your Branch 
```bash
git push origin feature/your-feature-name```

### 6. Create a Pull Request (PR)
Go to GitHub, click "Compare & Pull Request" and add a clear description of:
- What you implemented 
- Why it was needed 
- Any screenshots (if UI)

🔄 **Keeping Your Branch Updated**
```bash
git checkout main
git pull origin main
git checkout your-branch
git merge main```

## 📂 Project Guidelines 
**Frontend (React):**
- Use reusable components 
- Maintain clean folder structure 
- Use proper state management (hooks/context)
**Backend (Flask ):**
- Follow REST API structure 
- Use meaningful route names 
- Validate all inputs 

## 🧪 Code Quality Standards 
- Write modular code 
- Avoid unnecessary duplication 
- Use meaningful variable/function names 
- Comment complex logic 

## 🐛 Reporting Issues 
eWhen creating an issue, include:
e - Description of the problem  
e - Steps to reproduce  
e - Expected vs actual behavior  
e - Screenshots (if applicable)
disclaimer: Please ensure all information is accurate and detailed.
'things to avoid:
t ❌ Pushing directly to main  
t ❌ Large, unrelated changes in one PR  
t ❌ Breaking existing functionality  
t ❌ Ignoring merge conflicts
