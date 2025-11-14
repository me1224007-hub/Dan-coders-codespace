hr chatbot json prompt {
  "chatbotName": "HRAssistantBot",
  "version": "1.0",
  "description": "Automated HR support for leaves, salary, profiles, and other services",
  "intents": [
    {
      "intentName": "LeavesQuery",
      "trainingPhrases": [
        "How many leave days do I have?",
        "Request PTO",
        "Check vacation balance"
      ],
      "responses": [
        "You have {leave_balance} days left. Would you like to request time off?"
      ],
      "parameters": [
        {
          "name": "leave_type",
          "type": "string",
          "prompt": "What type of leave? (e.g., vacation, sick)"
        }
      ],
      "integration": {
        "api": "hris/leaves",
        "method": "GET",
        "auth": "OAuth"
      }
    },
    {
      "intentName": "SalaryQuery",
      "trainingPhrases": [
        "What's my salary?",
        "View payslip",
        "Tax deduction details"
      ],
      "responses": [
        "Your current salary is {salary_amount}. Here's your latest payslip: {payslip_link}."
      ],
      "parameters": [
        {
          "name": "period",
          "type": "date",
          "prompt": "For which pay period?"
        }
      ],
      "integration": {
        "api": "payroll/salary",
        "method": "POST",
        "auth": "API_Key"
      }
    },
    {
      "intentName": "ProfileUpdate",
      "trainingPhrases": [
        "Update my profile",
        "Change address",
        "Edit emergency contact"
      ],
      "responses": [
        "Profile updated successfully. Confirmation: {update_details}."
      ],
      "parameters": [
        {
          "name": "field",
          "type": "string",
          "prompt": "What would you like to update? (e.g., address, phone)"
        },
        {
          "name": "value",
          "type": "string",
          "prompt": "Enter the new value:"
        }
      ],
      "integration": {
        "api": "employee/profile",
        "method": "PUT",
        "auth": "JWT"
      }
    },
    {
      "intentName": "OtherHRServices",
      "trainingPhrases": [
        "Benefits enrollment",
        "Company policy on remote work",
        "Training programs"
      ],
      "responses": [
        "For {service_type}, here's the info: {details}. Need more help?"
      ],
      "parameters": [
        {
          "name": "service_type",
          "type": "string",
          "prompt": "What HR service do you need? (e.g., benefits, policy)"
        }
      ],
      "integration": {
        "api": "hr/services",
        "method": "GET",
        "auth": "Basic"
      }
    }
  ],
  "fallbackIntent": {
    "name": "DefaultFallback",
    "responses": [
      "I'm sorry, I didn't understand that. Transferring to a human agent..."
    ]
  },
  "settings": {
    "nlpProvider": "Dialogflow",
    "deploymentPlatforms": ["Slack", "Teams", "Web"],
    "security": {
      "encryption": true,
      "compliance": ["GDPR", "HIPAA"]
    },
    "analytics": true
  }
}