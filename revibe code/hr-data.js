(function(){
  'use strict';
  // Simple client-side HR data layer using localStorage as a mock DB
  const KEY = 'revibe_hr_data_v1';
  const CURRENT_USER_KEY = 'revibe_hr_current_user';

  const seed = {
    employees: [
      { employeeId: 'EMP001', fullName: 'Rakesh Kumar', jobTitle: 'Assistant Officer', department: { name: 'Education', id: 'DEPT-EDU', managerId: 'MGR001' }, location: 'Lucknow', employmentType: 'Permanent', startDate: '2019-08-01', reportingManager: { managerId: 'MGR001', managerName: 'Anjali Verma' }, responsibilities: [], skills: ['MS Office'], certifications: [], performanceMetrics: { lastReviewDate: '2024-10-01', rating: 4 }, updateHistory: [], complianceNotes: '' },
      { employeeId: 'EMP002', fullName: 'Amit Kumar', jobTitle: 'Clerk', department: { name: 'Finance', id: 'DEPT-FIN', managerId: 'MGR002' }, location: 'Lucknow', employmentType: 'Contract', startDate: '2021-05-10', reportingManager: { managerId: 'MGR002', managerName: 'Rohan Singh' }, responsibilities: [], skills: [], certifications: [], performanceMetrics: {}, updateHistory: [], complianceNotes: '' }
    ],
    leaves: [
      // example leave
    ],
    payroll: [
      // payroll records (sample)
      { id: 'P' + Date.now(), employeeId: 'EMP001', periodStart: '2025-10-01', periodEnd: '2025-10-31', grossPay: 50000, deductions: { tax: 5000, other: 1000 }, netPay: 44000 }
    ],
    salarySlips: [
      {
        id: 'S' + (Date.now()-1000),
        employeeId: 'EMP001',
        jobProfile: { role: { title: 'Assistant Officer', level: 'L2', code: 'AO-001' }, updated: false },
        department: { name: 'Education', id: 'DEPT-EDU', managerId: 'MGR001' },
        responsibilities: [{ description: 'Core admin tasks', kpi: 'Timely processing', updated: false }],
        skills: ['MS Office'],
        effectiveDate: '2025-10-01',
        lastUpdated: new Date().toISOString(),
        auditLog: [],
        approvalStatus: 'Approved',
        comments: '',
        status: 'Active',
        archived: false
      }
    ],
    promotions: [
      // example promotion history
    ],
    chatbot: {
      chatbotName: 'HR Assistant',
      intents: []
    },
    settings: { version: '1.0' }
  };

  function load() {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return JSON.parse(JSON.stringify(seed));
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn('HR data corrupted, re-seeding.');
      localStorage.setItem(KEY, JSON.stringify(seed));
      return JSON.parse(JSON.stringify(seed));
    }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  const db = load();

  const HR = {
    _db: db,
    findEmployee(empId) {
      return this._db.employees.find(e => e.employeeId === String(empId)) || null;
    },
    getEmployees() { return this._db.employees.slice(); },
    login(empId) {
      const emp = this.findEmployee(empId);
      if (!emp) return false;
      localStorage.setItem(CURRENT_USER_KEY, emp.employeeId);
      return true;
    },
    logout() {
      localStorage.removeItem(CURRENT_USER_KEY);
    },
    currentUser() {
      const id = localStorage.getItem(CURRENT_USER_KEY);
      if (!id) return null;
      return this.findEmployee(id);
    },
    submitLeave(application) {
      application.id = 'L' + Date.now();
      application.createdAt = new Date().toISOString();
      this._db.leaves.push(application);
      save(this._db);
      return application;
    },
    getLeavesForEmployee(empId) {
      return this._db.leaves.filter(l => l.employeeId === empId);
    },
    /* Payroll & Salary Slip APIs */
    getPayrollForEmployee(empId) {
      return this._db.payroll.filter(p => p.employeeId === empId);
    },
    addPayrollRecord(record) {
      record.id = 'P' + Date.now();
      this._db.payroll.push(record);
      save(this._db);
      return record;
    },
    getSalarySlips(empId) {
      return this._db.salarySlips.filter(s => s.employeeId === empId);
    },
    createSalarySlip(empId, slip) {
      const base = this.findEmployee(empId) || {};
      const newSlip = Object.assign({ id: 'S' + Date.now(), employeeId: empId, createdAt: new Date().toISOString(), approvalStatus: 'Pending', status: 'Active' }, slip);
      this._db.salarySlips.push(newSlip);
      save(this._db);
      return newSlip;
    },
    /* Promotion APIs */
    getPromotions(empId) {
      return this._db.promotions.filter(p => p.employeeId === empId);
    },
    addPromotion(promo) {
      promo.id = 'PR' + Date.now();
      this._db.promotions.push(promo);
      // also update employee jobTitle if provided
      const emp = this.findEmployee(promo.employeeId);
      if (emp && promo.afterPromotion && promo.afterPromotion.designation) {
        emp.jobTitle = promo.afterPromotion.designation;
        emp.updateHistory = emp.updateHistory || [];
        emp.updateHistory.push({ updateDate: new Date().toISOString(), changedBy: promo.approvals?.hr || 'system', changes: 'Promotion applied' });
      }
      save(this._db);
      return promo;
    },
    /* Chatbot placeholder */
    getChatbot() { return this._db.chatbot || null; },
    ensureSeeded() { /* noop - already seeded on load */ }
  };

  // expose globally
  window.HR = HR;
  // initialize
  HR.ensureSeeded();
})();
