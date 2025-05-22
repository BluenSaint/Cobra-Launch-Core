#!/bin/bash

# Compliance Validation Script for Project Cobra
# This script checks for compliance with various standards and regulations

echo "Starting compliance validation for Project Cobra..."
echo "==================================================="
echo ""

# Directory setup
REPORT_DIR="$(pwd)/security/reports"
mkdir -p $REPORT_DIR

# Log file
LOG_FILE="$REPORT_DIR/compliance_validation_$(date +%Y%m%d_%H%M%S).log"
touch $LOG_FILE

log() {
  echo "[$(date +%Y-%m-%d\ %H:%M:%S)] $1" | tee -a $LOG_FILE
}

log "Compliance validation started"

# 1. GDPR Compliance Check
log "Checking GDPR compliance..."
mkdir -p "$REPORT_DIR/gdpr"

# Check for privacy policy
log "Checking for privacy policy..."
find . -type f -name "*.md" -o -name "*.tsx" -o -name "*.ts" | xargs grep -l "privacy policy" > "$REPORT_DIR/gdpr/privacy_policy_references.txt" 2>> $LOG_FILE

# Check for data retention policies
log "Checking for data retention policies..."
find . -type f -name "*.ts" | xargs grep -l "retention\|delete after\|expire" > "$REPORT_DIR/gdpr/data_retention_references.txt" 2>> $LOG_FILE

# Check for consent mechanisms
log "Checking for consent mechanisms..."
find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "consent\|opt-in\|accept terms" > "$REPORT_DIR/gdpr/consent_mechanisms.txt" 2>> $LOG_FILE

# Check for data subject rights
log "Checking for data subject rights implementation..."
find . -type f -name "*.ts" | xargs grep -l "right to access\|right to be forgotten\|data export" > "$REPORT_DIR/gdpr/data_subject_rights.txt" 2>> $LOG_FILE

log "GDPR compliance check completed"

# 2. FCRA Compliance Check (specific to credit repair industry)
log "Checking FCRA compliance..."
mkdir -p "$REPORT_DIR/fcra"

# Check for dispute handling mechanisms
log "Checking for dispute handling mechanisms..."
find . -type f -name "*.ts" | xargs grep -l "dispute\|investigation\|verification" > "$REPORT_DIR/fcra/dispute_handling.txt" 2>> $LOG_FILE

# Check for credit bureau communication
log "Checking for credit bureau communication..."
find . -type f -name "*.ts" | xargs grep -l "equifax\|experian\|transunion\|credit bureau" > "$REPORT_DIR/fcra/credit_bureau_communication.txt" 2>> $LOG_FILE

# Check for consumer disclosure
log "Checking for consumer disclosure..."
find . -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "disclosure\|consumer rights\|fcra rights" > "$REPORT_DIR/fcra/consumer_disclosure.txt" 2>> $LOG_FILE

log "FCRA compliance check completed"

# 3. WCAG Accessibility Check
log "Checking WCAG accessibility compliance..."
mkdir -p "$REPORT_DIR/accessibility"

# Check for alt text on images
log "Checking for alt text on images..."
find . -type f -name "*.tsx" -o -name "*.jsx" | xargs grep -l "alt=" > "$REPORT_DIR/accessibility/alt_text.txt" 2>> $LOG_FILE

# Check for ARIA attributes
log "Checking for ARIA attributes..."
find . -type f -name "*.tsx" -o -name "*.jsx" | xargs grep -l "aria-" > "$REPORT_DIR/accessibility/aria_attributes.txt" 2>> $LOG_FILE

# Check for semantic HTML
log "Checking for semantic HTML..."
find . -type f -name "*.tsx" -o -name "*.jsx" | xargs grep -l "<nav\|<main\|<header\|<footer\|<aside\|<section\|<article" > "$REPORT_DIR/accessibility/semantic_html.txt" 2>> $LOG_FILE

log "WCAG accessibility check completed"

# 4. PCI DSS Compliance Check (for payment processing)
log "Checking PCI DSS compliance..."
mkdir -p "$REPORT_DIR/pci_dss"

# Check for credit card data handling
log "Checking for credit card data handling..."
find . -type f -name "*.ts" -o -name "*.tsx" | xargs grep -l "credit card\|card number\|cvv\|expiry" > "$REPORT_DIR/pci_dss/credit_card_handling.txt" 2>> $LOG_FILE

# Check for Stripe integration (compliant payment processor)
log "Checking for Stripe integration..."
find . -type f -name "*.ts" | xargs grep -l "stripe" > "$REPORT_DIR/pci_dss/stripe_integration.txt" 2>> $LOG_FILE

log "PCI DSS compliance check completed"

# 5. Generate compliance report summary
log "Generating compliance report summary..."

echo "# Project Cobra Compliance Validation Report" > "$REPORT_DIR/compliance_summary.md"
echo "Generated on: $(date)" >> "$REPORT_DIR/compliance_summary.md"
echo "" >> "$REPORT_DIR/compliance_summary.md"

echo "## GDPR Compliance" >> "$REPORT_DIR/compliance_summary.md"
echo "- Privacy Policy References: $(wc -l < "$REPORT_DIR/gdpr/privacy_policy_references.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "- Data Retention Policies: $(wc -l < "$REPORT_DIR/gdpr/data_retention_references.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "- Consent Mechanisms: $(wc -l < "$REPORT_DIR/gdpr/consent_mechanisms.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "- Data Subject Rights: $(wc -l < "$REPORT_DIR/gdpr/data_subject_rights.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "" >> "$REPORT_DIR/compliance_summary.md"

echo "## FCRA Compliance" >> "$REPORT_DIR/compliance_summary.md"
echo "- Dispute Handling Mechanisms: $(wc -l < "$REPORT_DIR/fcra/dispute_handling.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "- Credit Bureau Communication: $(wc -l < "$REPORT_DIR/fcra/credit_bureau_communication.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "- Consumer Disclosure: $(wc -l < "$REPORT_DIR/fcra/consumer_disclosure.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "" >> "$REPORT_DIR/compliance_summary.md"

echo "## WCAG Accessibility" >> "$REPORT_DIR/compliance_summary.md"
echo "- Alt Text on Images: $(wc -l < "$REPORT_DIR/accessibility/alt_text.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "- ARIA Attributes: $(wc -l < "$REPORT_DIR/accessibility/aria_attributes.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "- Semantic HTML: $(wc -l < "$REPORT_DIR/accessibility/semantic_html.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "" >> "$REPORT_DIR/compliance_summary.md"

echo "## PCI DSS Compliance" >> "$REPORT_DIR/compliance_summary.md"
echo "- Credit Card Data Handling: $(wc -l < "$REPORT_DIR/pci_dss/credit_card_handling.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "- Stripe Integration: $(wc -l < "$REPORT_DIR/pci_dss/stripe_integration.txt" || echo 0) found" >> "$REPORT_DIR/compliance_summary.md"
echo "" >> "$REPORT_DIR/compliance_summary.md"

echo "## Recommendations" >> "$REPORT_DIR/compliance_summary.md"
echo "1. Ensure comprehensive privacy policy is in place" >> "$REPORT_DIR/compliance_summary.md"
echo "2. Implement clear data retention policies" >> "$REPORT_DIR/compliance_summary.md"
echo "3. Enhance consent mechanisms for user data" >> "$REPORT_DIR/compliance_summary.md"
echo "4. Verify all FCRA requirements are met for dispute handling" >> "$REPORT_DIR/compliance_summary.md"
echo "5. Improve accessibility features for WCAG compliance" >> "$REPORT_DIR/compliance_summary.md"
echo "6. Ensure no direct handling of credit card data (use Stripe)" >> "$REPORT_DIR/compliance_summary.md"

log "Compliance report summary generated at $REPORT_DIR/compliance_summary.md"

log "Compliance validation completed"
echo ""
echo "Compliance validation completed. Reports available in $REPORT_DIR"
echo "==================================================="
