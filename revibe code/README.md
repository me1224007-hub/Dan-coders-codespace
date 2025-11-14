# Manav Sampada UP - HRMS Application

A modern, fully-client-side HR Management System built with vanilla HTML, CSS (Tailwind), and JavaScript.

---

## 🚀 UPLOAD TO GITHUB (Quick Start)

```powershell
cd 'G:\revibe code'
git init
git add .
git commit -m "Manav Sampada HRMS prototype"
git remote add origin https://github.com/YOUR-USERNAME/manav-sampada-hrms.git
git branch -M main
git push -u origin main
```

**See**: `GITHUB_UPLOAD_GUIDE.md` for detailed instructions | `QUICK_START.md` for 5-minute guide

---

## Features

### 1. Authentication & Session Management
- **Login Page** (`loginpage.new.html`): Modern redesigned login with rotating background carousel.
- **Seeded Test Accounts**:
  - Employee ID: `EMP001` (Rakesh Kumar - Assistant Officer)
  - Employee ID: `EMP002` (Amit Kumar - Clerk)
- **Client-Side Auth**: Uses browser localStorage to persist session via `HR.currentUser()`.

### 2. Employee Dashboard (`employeedashboard.html`)
- **Dynamic User Profile**: 
  - Displays employee name dynamically from HR mock data.
  - Shows a colorful avatar with employee initials (color varies by employee ID).
- **HR Demo Card** featuring:
  - **Payroll Summary**: Shows total records, gross pay, and net pay.
  - **Salary Slips**: Lists all salary slips with View/JSON/CSV/PDF download options.
  - **Promotions**: Displays promotion history with effective designation.
  - **Actions**: 
    - "Generate Salary Slip" — creates a payroll record and salary slip.
    - "Add Promotion" — records a promotion and updates employee job title.

### 3. Salary Slip Export Options
- **View Modal**: Click "View" to inspect slip details in a modal dialog.
- **JSON Download**: Raw JSON format of the salary slip.
- **CSV Download**: Flattened key/value CSV (for spreadsheets).
- **PDF Download**: Formatted payslip with:
  - Company logo and name.
  - Employee details (name, ID, designation, department).
  - Earnings, deductions breakdown, gross pay, and net pay.
  - Signature lines for employee and authorized signatory.
  - Uses jsPDF + html2canvas (CDN) for client-side PDF generation.

### 4. Leave Application (`leaveapplication.html`)
- **Authentication Overlay**: 
  - Shows an overlay when user is not signed in.
  - Form controls are disabled until authenticated.
  - "Go to Login" and "Check Auth" buttons in the overlay.
- **Leave Form**:
  - Select leave type (Casual, Medical, Earned).
  - Choose from/to dates.
  - Enter reason for leave.
  - Toggle for station leave requirement.
- **Persistent Data**: Submitted leaves are stored in localStorage via `HR.submitLeave()`.

### 5. Shared Navigation
- **Header & Footer**: Centralized templates (`shared-header.html`, `shared-footer.html`).
- **Loader Script** (`shared-nav.js`): Injects header/footer into all pages and highlights active nav links.
- **Pages**: Attendance Management, Admin Panel, and other modules ready for integration.

### 6. HR Mock Backend (`hr-data.js`)
A client-side mock data layer exposing a `window.HR` API:

#### Seeded Data
- **Employees**: Two pre-loaded employees (EMP001, EMP002) with departments, job titles, and reporting managers.
- **Payroll**: Sample payroll record with gross pay, deductions, and net pay.
- **Salary Slips**: Pre-seeded salary slip linked to payroll.

#### API Methods
```javascript
// Authentication
HR.login(empId)                                // Sign in (returns boolean)
HR.logout()                                    // Sign out
HR.currentUser()                               // Get current session employee

// Employee Data
HR.findEmployee(empId)                         // Find employee by ID
HR.getEmployees()                              // List all employees

// Leave Management
HR.submitLeave(application)                    // Submit a leave request
HR.getLeavesForEmployee(empId)                 // Retrieve leaves for an employee

// Payroll & Salary Slips
HR.getPayrollForEmployee(empId)                // List payroll records
HR.addPayrollRecord(record)                    // Create a payroll entry
HR.getSalarySlips(empId)                       // List salary slips
HR.createSalarySlip(empId, slip)               // Generate a salary slip

// Promotions
HR.getPromotions(empId)                        // List promotions
HR.addPromotion(promotion)                     // Record a promotion

// Persistence
// All data is stored in browser localStorage under key: revibe_hr_data_v1
```

## Quick Start

### 1. Serve Locally
From the workspace root (`G:\revibe code`):

```powershell
python -m http.server 8000
```

Then open: `http://localhost:8000/loginpage.new.html`

### 2. Test Workflow

1. **Login**: Use `EMP001` or `EMP002` as Employee ID (no password required for demo).
2. **Dashboard**: 
   - View your name and colorful avatar.
   - Click "Generate Salary Slip" to create a demo payroll entry and slip.
   - Click "View", "JSON", "CSV", or "PDF" on the slip to preview/download.
   - Click "Add Promotion" to record a promotion (updates your job title).
3. **Leave Page**: 
   - Navigate to "Apply for Leave" (via header or leaveapplication.html).
   - Select leave type, dates, and reason.
   - Click "Next Step" (requires authentication).
4. **Attendance & Admin**: 
   - Navigate to other sections; they have placeholder content ready for implementation.

### 3. Clear Session
- To log out, clear browser localStorage (Dev Tools > Application > Local Storage > Clear).
- Refreshing the page without clearing will preserve your session.

## File Structure

```
G:\revibe code\
├── loginpage.new.html              # Modern redesigned login with carousel
├── loginpage.html                  # Original login variant
├── employeedashboard.html          # Main dashboard with HR demo card
├── leaveapplication.html           # Leave application form with auth
├── attendancemanagement.html       # Attendance tracking (placeholder)
├── adminpanel.html                 # Admin controls (placeholder)
├── shared-header.html              # Centralized header template
├── shared-footer.html              # Centralized footer template
├── shared-nav.js                   # Header/footer injector + nav highlighting
├── hr-data.js                      # Mock HR backend (localStorage-based)
├── admin-images.jpg                # Background image for carousel
└── README.md                       # This file
```

## Technical Stack

- **Frontend**: Vanilla HTML, CSS (Tailwind CDN), JavaScript (ES6+).
- **Data Storage**: Browser localStorage (client-side only).
- **PDF Export**: jsPDF + html2canvas (CDN-loaded for client-side generation).
- **Navigation**: Client-side routing via `window.location.href`.

## Development Notes

### localStorage Key
- All HR data is persisted under the key: `revibe_hr_data_v1`.
- Clearing this key resets the mock database to its seed state.

### Seeded Employees
- **EMP001**: Rakesh Kumar, Assistant Officer, Education Department.
- **EMP002**: Amit Kumar, Clerk, Finance Department.

### Extending the System

To add new employees or data:

1. Edit `hr-data.js` and add entries to the `seed` object.
2. Call `save(db)` after modifications to persist to localStorage.
3. Refresh the page to see changes.

Example:
```javascript
HR.findEmployee('EMP001');  // Returns employee object
HR.login('EMP001');         // Log in as EMP001
HR.submitLeave({...});      // Submit a leave request
```

### Known Limitations

- **No server backend**: All data is ephemeral (lost on browser clear or localStorage reset).
- **PDF generation**: Requires CDN access; offline environments will fail.
- **Single-user per session**: Only one employee can be logged in at a time.
- **No authentication**: Demo uses employee ID alone (no password validation).

## Future Enhancements

- Real backend integration (Node.js/Express, Python/Django, etc.).
- User roles & permissions (Admin, Manager, Employee).
- Leave approval workflow with manager review.
- Payroll reports and analytics.
- Multi-language support.
- Dark mode refinements.
- Mobile-responsive improvements.

## License

This is a demonstration/prototype for the Manav Sampada UP HRMS system. Use for educational and internal purposes.

---

**Last Updated**: November 14, 2025

**Status**: ✅ Functional prototype with login, dashboard, leave application, salary slips, and promotions fully integrated.
