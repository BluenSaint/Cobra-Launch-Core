#!/bin/bash

# Security Validation Script for Project Cobra
# This script performs comprehensive security checks on the codebase

echo "Starting security validation for Project Cobra..."
echo "=================================================="
echo ""

# Directory setup
REPORT_DIR="$(pwd)/security/reports"
mkdir -p $REPORT_DIR

# Log file
LOG_FILE="$REPORT_DIR/security_validation_$(date +%Y%m%d_%H%M%S).log"
touch $LOG_FILE

log() {
  echo "[$(date +%Y-%m-%d\ %H:%M:%S)] $1" | tee -a $LOG_FILE
}

log "Security validation started"

# 1. Dependency scanning
log "Running dependency vulnerability scan..."
npm audit --json > "$REPORT_DIR/npm_audit.json" 2>> $LOG_FILE
log "NPM audit completed"

# 2. Static code analysis
log "Running static code analysis..."

# ESLint security rules
log "Running ESLint with security rules..."
npx eslint --no-eslintrc -c .eslintrc.security.json --ext .js,.jsx,.ts,.tsx . -f json > "$REPORT_DIR/eslint_security.json" 2>> $LOG_FILE

# SonarQube-like analysis
log "Running SonarQube-like analysis..."
npx jscpd . --ignore "node_modules/**" --reporters "json" -o "$REPORT_DIR/code_duplications.json" 2>> $LOG_FILE

log "Static code analysis completed"

# 3. Secret scanning
log "Scanning for secrets and credentials..."
npx detect-secrets scan . --exclude-files "node_modules/*" > "$REPORT_DIR/secrets_scan.json" 2>> $LOG_FILE
log "Secret scanning completed"

# 4. Check for security headers
log "Checking security headers configuration..."
grep -r "Content-Security-Policy\|X-XSS-Protection\|X-Content-Type-Options\|Strict-Transport-Security" --include="*.ts" --include="*.js" . > "$REPORT_DIR/security_headers.txt" 2>> $LOG_FILE
log "Security headers check completed"

# 5. Check for proper authentication
log "Validating authentication mechanisms..."
grep -r "JwtAuthGuard\|AdminGuard" --include="*.ts" . > "$REPORT_DIR/auth_guards.txt" 2>> $LOG_FILE
log "Authentication validation completed"

# 6. Check for CSRF protection
log "Checking CSRF protection..."
grep -r "csrf" --include="*.ts" --include="*.js" . > "$REPORT_DIR/csrf_protection.txt" 2>> $LOG_FILE
log "CSRF check completed"

# 7. Check for SQL injection protection
log "Checking SQL injection protection..."
grep -r "typeorm" --include="*.ts" . | grep -v "Repository" > "$REPORT_DIR/sql_injection_check.txt" 2>> $LOG_FILE
log "SQL injection check completed"

# 8. Check for proper error handling
log "Analyzing error handling patterns..."
grep -r "try\|catch\|throw new" --include="*.ts" . > "$REPORT_DIR/error_handling.txt" 2>> $LOG_FILE
log "Error handling analysis completed"

# 9. Check for logging practices
log "Analyzing logging practices..."
grep -r "logger\|console.log" --include="*.ts" --include="*.js" . > "$REPORT_DIR/logging_practices.txt" 2>> $LOG_FILE
log "Logging analysis completed"

# 10. Generate security report summary
log "Generating security report summary..."

echo "# Project Cobra Security Validation Report" > "$REPORT_DIR/security_summary.md"
echo "Generated on: $(date)" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## Dependency Vulnerabilities" >> "$REPORT_DIR/security_summary.md"
echo "See detailed report in npm_audit.json" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## Static Code Analysis" >> "$REPORT_DIR/security_summary.md"
echo "See detailed reports in eslint_security.json and code_duplications.json" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## Secret Detection" >> "$REPORT_DIR/security_summary.md"
echo "See detailed report in secrets_scan.json" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## Security Headers" >> "$REPORT_DIR/security_summary.md"
echo "See detailed findings in security_headers.txt" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## Authentication Mechanisms" >> "$REPORT_DIR/security_summary.md"
echo "See detailed findings in auth_guards.txt" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## CSRF Protection" >> "$REPORT_DIR/security_summary.md"
echo "See detailed findings in csrf_protection.txt" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## SQL Injection Protection" >> "$REPORT_DIR/security_summary.md"
echo "See detailed findings in sql_injection_check.txt" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## Error Handling" >> "$REPORT_DIR/security_summary.md"
echo "See detailed findings in error_handling.txt" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## Logging Practices" >> "$REPORT_DIR/security_summary.md"
echo "See detailed findings in logging_practices.txt" >> "$REPORT_DIR/security_summary.md"
echo "" >> "$REPORT_DIR/security_summary.md"

echo "## Recommendations" >> "$REPORT_DIR/security_summary.md"
echo "1. Review and address all dependency vulnerabilities" >> "$REPORT_DIR/security_summary.md"
echo "2. Implement missing security headers" >> "$REPORT_DIR/security_summary.md"
echo "3. Ensure consistent error handling across all modules" >> "$REPORT_DIR/security_summary.md"
echo "4. Review and improve logging practices" >> "$REPORT_DIR/security_summary.md"
echo "5. Conduct regular security audits" >> "$REPORT_DIR/security_summary.md"

log "Security report summary generated at $REPORT_DIR/security_summary.md"

log "Security validation completed"
echo ""
echo "Security validation completed. Reports available in $REPORT_DIR"
echo "=================================================="
