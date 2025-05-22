// Google Vision OCR script for Project Cobra
// This script will be called by the OCR service as a fallback option

import sys
import json
import os
import re
from typing import Dict, Any, List

def simulate_google_vision_ocr(document_path: str) -> Dict[str, Any]:
    """
    Simulate Google Vision OCR processing
    
    In a production environment, this would use the Google Vision API client.
    For development purposes, this provides a simulated response.
    
    Args:
        document_path: Path to the document file
        
    Returns:
        Dictionary with OCR results
    """
    # Check if file exists
    if not os.path.exists(document_path):
        return {
            "text": "",
            "structuredData": {},
            "confidence": 0
        }
    
    # In a real implementation, we would call:
    # from google.cloud import vision
    # client = vision.ImageAnnotatorClient()
    # with open(document_path, 'rb') as image_file:
    #     content = image_file.read()
    # image = vision.Image(content=content)
    # response = client.document_text_detection(image=image)
    
    # For simulation, we'll extract some basic text based on the filename
    filename = os.path.basename(document_path).lower()
    
    # Simulate different types of credit reports
    if "experian" in filename or "exp" in filename:
        return simulate_experian_report()
    elif "equifax" in filename or "eqfx" in filename:
        return simulate_equifax_report()
    elif "transunion" in filename or "tu" in filename:
        return simulate_transunion_report()
    else:
        # Generic credit report simulation
        return simulate_generic_report()

def simulate_experian_report() -> Dict[str, Any]:
    """Simulate Experian credit report OCR results"""
    text = """
    EXPERIAN CREDIT REPORT
    
    Personal Information:
    Name: JOHN Q CONSUMER
    SSN: XXX-XX-1234
    Address: 123 MAIN ST, ANYTOWN, CA 90210
    
    Account Information:
    
    Account #: 1234567890
    Creditor: BANK OF AMERICA
    Account Type: Credit Card
    Balance: $5,432.10
    Status: Open/Current
    Payment History: Current for last 24 months
    
    Account #: 9876543210
    Creditor: CHASE BANK
    Account Type: Auto Loan
    Balance: $12,345.67
    Status: Open/Current
    Payment History: Current for last 36 months
    
    Inquiries:
    05/15/2025 - CAPITAL ONE
    03/10/2025 - DISCOVER FINANCIAL
    
    Public Records:
    None
    """
    
    structured_data = {
        "personalInfo": {
            "name": "JOHN Q CONSUMER",
            "ssn": "XXX-XX-1234",
            "address": "123 MAIN ST, ANYTOWN, CA 90210"
        },
        "accounts": [
            {
                "accountNumber": "1234567890",
                "creditor": "BANK OF AMERICA",
                "accountType": "Credit Card",
                "balance": "$5,432.10",
                "status": "Open/Current"
            },
            {
                "accountNumber": "9876543210",
                "creditor": "CHASE BANK",
                "accountType": "Auto Loan",
                "balance": "$12,345.67",
                "status": "Open/Current"
            }
        ],
        "inquiries": [
            {
                "date": "05/15/2025",
                "creditor": "CAPITAL ONE"
            },
            {
                "date": "03/10/2025",
                "creditor": "DISCOVER FINANCIAL"
            }
        ],
        "publicRecords": []
    }
    
    return {
        "text": text,
        "structuredData": structured_data,
        "confidence": 0.92
    }

def simulate_equifax_report() -> Dict[str, Any]:
    """Simulate Equifax credit report OCR results"""
    text = """
    EQUIFAX CREDIT REPORT
    
    Consumer Information:
    Name: JANE R SMITH
    SSN: XXX-XX-5678
    Address: 456 OAK AVE, SOMEWHERE, NY 10001
    
    Account Information:
    
    Account #: 1111222233334444
    Lender: CITIBANK
    Type: Credit Card
    Balance: $2,345.67
    Status: Closed
    
    Account #: 5555666677778888
    Lender: WELLS FARGO
    Type: Mortgage
    Balance: $245,678.90
    Status: Open/Current
    
    Account #: 9999000011112222
    Lender: STUDENT LOAN CORP
    Type: Student Loan
    Balance: $35,000.00
    Status: Open/Current
    
    Inquiries:
    04/20/2025 - AMERICAN EXPRESS
    02/15/2025 - SYNCHRONY BANK
    
    Public Records:
    None
    """
    
    structured_data = {
        "personalInfo": {
            "name": "JANE R SMITH",
            "ssn": "XXX-XX-5678",
            "address": "456 OAK AVE, SOMEWHERE, NY 10001"
        },
        "accounts": [
            {
                "accountNumber": "1111222233334444",
                "creditor": "CITIBANK",
                "accountType": "Credit Card",
                "balance": "$2,345.67",
                "status": "Closed"
            },
            {
                "accountNumber": "5555666677778888",
                "creditor": "WELLS FARGO",
                "accountType": "Mortgage",
                "balance": "$245,678.90",
                "status": "Open/Current"
            },
            {
                "accountNumber": "9999000011112222",
                "creditor": "STUDENT LOAN CORP",
                "accountType": "Student Loan",
                "balance": "$35,000.00",
                "status": "Open/Current"
            }
        ],
        "inquiries": [
            {
                "date": "04/20/2025",
                "creditor": "AMERICAN EXPRESS"
            },
            {
                "date": "02/15/2025",
                "creditor": "SYNCHRONY BANK"
            }
        ],
        "publicRecords": []
    }
    
    return {
        "text": text,
        "structuredData": structured_data,
        "confidence": 0.89
    }

def simulate_transunion_report() -> Dict[str, Any]:
    """Simulate TransUnion credit report OCR results"""
    text = """
    TRANSUNION CREDIT REPORT
    
    Personal Information:
    Name: ROBERT T JOHNSON
    SSN: XXX-XX-9012
    Address: 789 PINE ST, ELSEWHERE, TX 75001
    
    Account Information:
    
    Account #: ABCD1234567890
    Creditor: DISCOVER
    Type: Credit Card
    Balance: $1,234.56
    Status: Open/Current
    
    Account #: EFGH9876543210
    Creditor: TOYOTA FINANCIAL
    Type: Auto Loan
    Balance: $18,765.43
    Status: Open/Current
    
    Account #: IJKL5555666677
    Creditor: COLLECTION AGENCY INC
    Type: Collection
    Balance: $567.89
    Status: Closed
    Original Creditor: MEDICAL CLINIC
    
    Inquiries:
    05/01/2025 - LENDING CLUB
    04/15/2025 - BEST BUY CREDIT
    
    Public Records:
    None
    """
    
    structured_data = {
        "personalInfo": {
            "name": "ROBERT T JOHNSON",
            "ssn": "XXX-XX-9012",
            "address": "789 PINE ST, ELSEWHERE, TX 75001"
        },
        "accounts": [
            {
                "accountNumber": "ABCD1234567890",
                "creditor": "DISCOVER",
                "accountType": "Credit Card",
                "balance": "$1,234.56",
                "status": "Open/Current"
            },
            {
                "accountNumber": "EFGH9876543210",
                "creditor": "TOYOTA FINANCIAL",
                "accountType": "Auto Loan",
                "balance": "$18,765.43",
                "status": "Open/Current"
            },
            {
                "accountNumber": "IJKL5555666677",
                "creditor": "COLLECTION AGENCY INC",
                "accountType": "Collection",
                "balance": "$567.89",
                "status": "Closed",
                "originalCreditor": "MEDICAL CLINIC"
            }
        ],
        "inquiries": [
            {
                "date": "05/01/2025",
                "creditor": "LENDING CLUB"
            },
            {
                "date": "04/15/2025",
                "creditor": "BEST BUY CREDIT"
            }
        ],
        "publicRecords": []
    }
    
    return {
        "text": text,
        "structuredData": structured_data,
        "confidence": 0.91
    }

def simulate_generic_report() -> Dict[str, Any]:
    """Simulate a generic credit report OCR results"""
    text = """
    CREDIT REPORT
    
    Personal Information:
    Name: SAMPLE CONSUMER
    SSN: XXX-XX-0000
    Address: 100 CREDIT LANE, REPORTVILLE, FL 33333
    
    Account Information:
    
    Account #: 1122334455
    Creditor: MAJOR BANK
    Type: Credit Card
    Balance: $3,500.00
    Status: Open/Current
    
    Account #: 5544332211
    Creditor: AUTO FINANCE CO
    Type: Auto Loan
    Balance: $15,000.00
    Status: Open/Current
    
    Account #: 9988776655
    Creditor: COLLECTIONS R US
    Type: Collection
    Balance: $750.00
    Status: Open
    Original Creditor: CELL PHONE COMPANY
    
    Inquiries:
    05/10/2025 - CREDIT CARD BANK
    04/05/2025 - DEPARTMENT STORE
    
    Public Records:
    None
    """
    
    structured_data = {
        "personalInfo": {
            "name": "SAMPLE CONSUMER",
            "ssn": "XXX-XX-0000",
            "address": "100 CREDIT LANE, REPORTVILLE, FL 33333"
        },
        "accounts": [
            {
                "accountNumber": "1122334455",
                "creditor": "MAJOR BANK",
                "accountType": "Credit Card",
                "balance": "$3,500.00",
                "status": "Open/Current"
            },
            {
                "accountNumber": "5544332211",
                "creditor": "AUTO FINANCE CO",
                "accountType": "Auto Loan",
                "balance": "$15,000.00",
                "status": "Open/Current"
            },
            {
                "accountNumber": "9988776655",
                "creditor": "COLLECTIONS R US",
                "accountType": "Collection",
                "balance": "$750.00",
                "status": "Open",
                "originalCreditor": "CELL PHONE COMPANY"
            }
        ],
        "inquiries": [
            {
                "date": "05/10/2025",
                "creditor": "CREDIT CARD BANK"
            },
            {
                "date": "04/05/2025",
                "creditor": "DEPARTMENT STORE"
            }
        ],
        "publicRecords": []
    }
    
    return {
        "text": text,
        "structuredData": structured_data,
        "confidence": 0.85
    }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({
            "text": "",
            "structuredData": {},
            "confidence": 0
        }))
        sys.exit(1)
    
    document_path = sys.argv[1]
    result = simulate_google_vision_ocr(document_path)
    print(json.dumps(result))
