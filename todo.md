# MonkeyType Clone - Development To-Do List

## **Phase 1: Setup & Initial Structure**
### **Day 1**
1. **Project Setup**
   - [x] Initialize React app using `create-react-app` or Vite.
   - [x] Install dependencies:
     ```bash
     npm install react-icons framer-motion (optional)
     ```
   - [x] Set up Git repository and basic file structure.

2. **Static Data**
   - [x] Create `words.js` with a list of 200+ common lowercase words:
     ```js
     export const words = ["hello", "world", "react", ...];
     ```

3. **Basic Components**
   - [x] Create placeholder components:
     - `App.jsx` (Root)
     - `StartScreen.jsx`
     - `TestScreen.jsx`
     - `ResultsScreen.jsx`
     - `WordDisplay.jsx`

---

## **Phase 2: Core Functionality**
### **Day 2-3**
1. **State Management**
   - [x] Define state variables in `App.jsx`:
     ```js
     const [testDuration, setTestDuration] = useState(15);
     const [isTestRunning, setIsTestRunning] = useState(false);
     // ... (add others from PRD)
     ```

2. **Start Screen**
   - [x] Implement timer selection (15s/30s/60s) with radio buttons.
   - [x] Add "Start Test" button to trigger `startTest(duration)`.

3. **Test Screen**
   - [x] Build `WordDisplay` component to render words with:
     - Green (`correct`), red (`incorrect`), underline (`active`).
   - [x] Add hidden `<input>` to capture keyboard events.
   - [x] Implement `handleKeyDown` logic:
     - Track `correctChars`/`incorrectChars`.
     - Allow backspace corrections.

4. **Timer Logic**
   - [x] Count down from selected duration using `setInterval`.
   - [x] Auto-end test when `timeLeft === 0`.

---

## **Phase 3: Styling & Polish**
### **Day 4**
1. **Themes**
   - [x] Add CSS variables for dark/light mode:
     ```css
     :root { --bg: #1e1e1e; --text: #e6e6e6; }
     [data-theme="light"] { --bg: #fff; --text: #000; }
     ```
   - [x] Create a theme toggle button (using `react-icons`).

2. **Responsive Design**
   - [x] Ensure UI works on mobile (min-width: 320px).

3. **Results Screen**
   - [x] Display WPM, accuracy, and character stats.
   - [x] Add "Try Again" button to reset state.

---

## **Phase 4: Testing & Deployment**
### **Day 5**
1. **Edge Cases**
   - [ ] Test fast typing (ensure no crashes).
   - [ ] Verify backspace behavior.

2. **Deployment**
   - [ ] Deploy to Vercel/Netlify:
     ```bash
     npm run build
     ```
   - [ ] Configure CI/CD (if needed).

---

## **Bonus Tasks (If Time Permits)**
- [ ] Add a caret (blinking cursor) to indicate typing position.
- [ ] Store past results in `localStorage`.
- [ ] Add subtle animations (e.g., timer pulse).

---

## **Checklist Progress**
- Phase 1: ✅  
- Phase 2: ✅  
- Phase 3: ✅  
- Phase 4: ⏳ (In Progress)  
