# Python script for violation detection in credit reports
# This script will be called by the OCR service to detect FCRA/FDCPA violations

import sys
import json
import re
from typing import List, Dict, Any

def detect_violations(text: str, structured_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Detect potential FCRA/FDCPA violations in credit report text
    
    Args:
        text: The full OCR text from the credit report
        structured_data: Structured data extracted from the OCR process
        
    Returns:
        List of detected violations with metadata
    """
    violations = []
    text_lower = text.lower()
    
    # FCRA Violations
    
    # Check for outdated negative information (7-year rule)
    match = re.search(r'(bankruptcy|charge[-\s]off|collection).{0,50}(7|seven) years', text_lower)
    if match:
        violations.append({
            "type": "FCRA",
            "title": "Outdated Negative Information",
            "description": "Credit report contains negative information older than 7 years, which violates the FCRA's time limitation on reporting negative information.",
            "regulationReference": "15 U.S.C. § 1681c(a)",
            "severity": "high",
            "confidence": 0.85,
            "metadata": {
                "matchedText": match.group(0) # Use the match object here
            }
        })
    
    # Check for bankruptcy reporting beyond 10 years
    if re.search(r'bankruptcy.{0,50}(1[0-9]|[2-9][0-9]) years', text_lower):
        violations.append({
            "type": "FCRA",
            "title": "Outdated Bankruptcy Information",
            "description": "Credit report contains bankruptcy information older than 10 years, which exceeds the FCRA's time limitation.",
            "regulationReference": "15 U.S.C. § 1681c(a)(1)",
            "severity": "high",
            "confidence": 0.9,
            "metadata": {
                "matchedText": re.search(r'bankruptcy.{0,100}(1[0-9]|[2-9][0-9]) years', text_lower).group(0)
            }
        })
    
    # Check for unauthorized inquiries
    if re.search(r'inquiry.{0,50}(not authorized|without permission|unauthorized)', text_lower):
        violations.append({
            "type": "FCRA",
            "title": "Unauthorized Inquiry",
            "description": "Credit report shows inquiries that were not authorized by the consumer, which may violate the FCRA's permissible purpose requirement.",
            "regulationReference": "15 U.S.C. § 1681b",
            "severity": "high",
            "confidence": 0.8,
            "metadata": {
                "matchedText": re.search(r'inquiry.{0,100}(not authorized|without permission|unauthorized)', text_lower).group(0)
            }
        })
    
    # Check for accounts not belonging to consumer
    if re.search(r'(not mine|not my account|wrong account|identity theft)', text_lower):
        violations.append({
            "type": "FCRA",
            "title": "Account Not Belonging to Consumer",
            "description": "Credit report contains accounts that may not belong to the consumer, which violates the FCRA's accuracy requirements.",
            "regulationReference": "15 U.S.C. § 1681e(b)",
            "severity": "high",
            "confidence": 0.75,
            "metadata": {
                "matchedText": re.search(r'(not mine|not my account|wrong account|identity theft).{0,100}', text_lower).group(0)
            }
        })
    
    # FDCPA Violations
    
    # Check for improper debt validation
    if re.search(r'(no validation|never received validation|failed to validate)', text_lower):
        violations.append({
            "type": "FDCPA",
            "title": "Failure to Validate Debt",
            "description": "Debt collector may have failed to properly validate the debt as required by the FDCPA.",
            "regulationReference": "15 U.S.C. § 1692g",
            "severity": "medium",
            "confidence": 0.7,
            "metadata": {
                "matchedText": re.search(r'(no validation|never received validation|failed to validate).{0,100}', text_lower).group(0)
            }
        })
    
    # Check for collection of unauthorized fees
    if re.search(r'(unauthorized fee|excessive fee|illegal fee|improper charge)', text_lower):
        violations.append({
            "type": "FDCPA",
            "title": "Unauthorized Fees",
            "description": "Debt collector may have attempted to collect unauthorized fees, interest, or charges not permitted by law or the original agreement.",
            "regulationReference": "15 U.S.C. § 1692f(1)",
            "severity": "medium",
            "confidence": 0.75,
            "metadata": {
                "matchedText": re.search(r'(unauthorized fee|excessive fee|illegal fee|improper charge).{0,100}', text_lower).group(0)
            }
        })
    
    # Check for re-aging of debt
    if re.search(r'(re-?aged|changed date|altered date|manipulated date)', text_lower):
        violations.append({
            "type": "FDCPA",
            "title": "Re-aging of Debt",
            "description": "Debt collector may have re-aged the debt by changing dates to extend the time the debt can remain on credit reports.",
            "regulationReference": "15 U.S.C. § 1692e(2)(A)",
            "severity": "high",
            "confidence": 0.8,
            "metadata": {
                "matchedText": re.search(r'(re-?aged|changed date|altered date|manipulated date).{0,100}', text_lower).group(0)
            }
        })
    
    # Check structured data for additional violations
    if structured_data and "accounts" in structured_data:
        for account in structured_data["accounts"]:
            # Check for closed accounts still reporting as open
            if account.get("status", "").lower() == "closed" and "open" in account.get("status", "").lower():
                violations.append({
                    "type": "FCRA",
                    "title": "Inaccurate Account Status",
                    "description": "Account is reported as open when it should be closed, violating FCRA accuracy requirements.",
                    "regulationReference": "15 U.S.C. § 1681e(b)",
                    "severity": "medium",
                    "confidence": 0.85,
                    "metadata": {
                        "accountNumber": account.get("accountNumber", "Unknown"),
                        "creditor": account.get("creditor", "Unknown")
                    }
                })
    
    return violations

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python violation_detector.py <input_json_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    
    try:
        with open(input_file, 'r') as f:
            data = json.load(f)
        
        text = data.get("text", "")
        structured_data = data.get("structuredData", {})
        
        violations = detect_violations(text, structured_data)
        print(json.dumps(violations))
    except Exception as e:
        print(json.dumps([{
            "type": "ERROR",
            "title": "Processing Error",
            "description": f"Error processing document: {str(e)}",
            "severity": "low",
            "confidence": 0.5
        }]))
