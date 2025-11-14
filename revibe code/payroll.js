{
  "payrollManagementModule": {
    "version": "1.0",
    "description": "JSON data model for payroll management system integration",
    "components": {
      "employeeRecords": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "employeeId": { "type": "string", "description": "Unique ID" },
            "name": { "type": "string" },
            "role": { "type": "string" },
            "payType": { "type": "string", "enum": ["hourly", "salaried"] },
            "hourlyRate": { "type": "number", "nullable": true },
            "salary": { "type": "number", "nullable": true },
            "hoursWorked": { "type": "number" },
            "overtimeHours": { "type": "number" },
            "benefits": {
              "type": "array",
              "items": { "type": "string", "examples": ["health_insurance", "401k"] }
            },
            "deductions": {
              "type": "object",
              "properties": {
                "preTax": { "type": "number" },
                "postTax": { "type": "number" }
              }
            },
            "taxInfo": {
              "type": "object",
              "properties": {
                "federalWithholding": { "type": "number" },
                "stateWithholding": { "type": "number" },
                "fica": { "type": "number" }
              }
            }
          },
          "required": ["employeeId", "name", "payType"]
        }
      },
      "payrollProcess": {
        "type": "object",
        "properties": {
          "schedule": { "type": "string", "enum": ["weekly", "bi-weekly", "semi-monthly", "monthly"] },
          "steps": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "stepName": { "type": "string", "examples": ["prePayroll", "processing", "postPayroll"] },
                "actions": { "type": "array", "items": { "type": "string" } }
              }
            },
            "examples": [
              {
                "stepName": "prePayroll",
                "actions": ["collectTimesheets", "verifyData", "updateEmployeeInfo"]
              },
              {
                "stepName": "processing",
                "actions": ["calculateGrossPay", "applyDeductions", "withholdTaxes", "computeNetPay"]
              },
              {
                "stepName": "postPayroll",
                "actions": ["disbursePayments", "generatePayStubs", "fileTaxes", "updateRecords"]
              }
            ]
          }
        }
      },
      "complianceRules": {
        "type": "object",
        "properties": {
          "federal": {
            "type": "object",
            "properties": {
              "minWage": { "type": "number", "default": 7.25 },
              "overtimeRate": { "type": "number", "default": 1.5 },
              "ficaRate": { "type": "number", "default": 7.65 }
            }
          },
          "stateSpecific": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "state": { "type": "string" },
                "minWage": { "type": "number" },
                "additionalRules": { "type": "string" }
              }
            }
          },
          "recordRetentionYears": { "type": "number", "default": 3 }
        }
      },
      "calculations": {
        "type": "object",
        "properties": {
          "grossPayFormula": { "type": "string", "description": "(hoursWorked * hourlyRate) + (overtimeHours * hourlyRate * 1.5) + bonuses" },
          "netPayFormula": { "type": "string", "description": "grossPay - preTaxDeductions - taxes - postTaxDeductions" }
        }
      },
      "integrations": {
        "type": "array",
        "items": { "type": "string", "examples": ["hrSystem", "timeTrackingApi", "accountingSoftware"] }
      }
    },
    "functions": {
      "runPayroll": {
        "description": "Sample pseudo-code for running payroll",
        "code": "function runPayroll(employees) { let totalPayroll = 0; employees.forEach(emp => { let gross = calculateGross(emp); let net = calculateNet(gross, emp.deductions, emp.taxInfo); totalPayroll += net; }); return totalPayroll; }"
      }
    }
  }
}