const salaryslips = {
  employeeId: "EMP67890",
  jobProfile: {
    role: {
      title: "Senior Software Engineer",
      level: "L4",
      code: "SSE-004",
      updated: true,
      previousTitle: "Software Engineer",
      updateReason: "Promotion after annual review"
    },
    department: {
      name: "Product Development",
      id: "DEPT-PD-02",
      managerId: "MGR123",
      updated: true,
      previousName: "Engineering",
      updateReason: "Departmental reorganization"
    },
    responsibilities: [
      {
        description: "Lead development of core features",
        kpi: "Deliver 4 features per quarter",
        updated: true,
        previousDescription: "Contribute to feature development",
        updateReason: "Expanded scope with promotion"
      },
      {
        description: "Mentor junior team members",
        kpi: "Conduct bi-weekly code reviews",
        updated: false
      },
      {
        description: "Collaborate with cross-functional teams",
        kpi: "Attend weekly stakeholder meetings",
        updated: false
      }
    ],
    skills: [
      "Python",
      "AWS",
      "Agile Methodology"
    ],
    effectiveDate: "2025-11-01",
    lastUpdated: "2025-11-14T14:45:00Z"
  },
  auditLog: [
    {
      updatedBy: "HR_Manager_User789",
      timestamp: "2025-11-13T10:15:00Z",
      changes: [
        {
          field: "role.title",
          oldValue: "Software Engineer",
          newValue: "Senior Software Engineer"
        },
        {
          field: "department.name",
          oldValue: "Engineering",
          newValue: "Product Development"
        },
        {
          field: "responsibilities[0].description",
          oldValue: "Contribute to feature development",
          newValue: "Lead development of core features"
        }
      ],
      approvalStatus: "Approved",
      comments: "Changes aligned with performance appraisal"
    }
  ],
  status: "Active - Updated",
  archived: false
};

export default salaryslips;
