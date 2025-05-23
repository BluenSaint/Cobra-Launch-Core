use regex::Regex;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ValidationError {
    #[error("Forbidden phrase detected: {0}")]
    ForbiddenPhrase(String),
    #[error("Missing required section: {0}")]
    MissingRequiredSection(String),
    #[error("Invalid format: {0}")]
    InvalidFormat(String),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ValidationResult {
    pub is_valid: bool,
    pub errors: Vec<String>,
    pub warnings: Vec<String>,
}

pub struct DisputeValidator {
    forbidden_phrases: Vec<String>,
    required_sections: Vec<String>,
}

impl DisputeValidator {
    pub fn new() -> Self {
        // Initialize with default FCRA compliance rules
        let forbidden_phrases = vec![
            "I refuse to pay".to_string(),
            "This is fraud".to_string(),
            "You are legally required to".to_string(),
            "I will sue".to_string(),
            "criminal activity".to_string(),
            "I demand immediate".to_string(),
        ];

        let required_sections = vec![
            "personal information".to_string(),
            "account identification".to_string(),
            "dispute reason".to_string(),
        ];

        Self {
            forbidden_phrases,
            required_sections,
        }
    }

    pub fn add_forbidden_phrase(&mut self, phrase: &str) {
        self.forbidden_phrases.push(phrase.to_string());
    }

    pub fn add_required_section(&mut self, section: &str) {
        self.required_sections.push(section.to_string());
    }

    pub fn validate(&self, text: &str) -> ValidationResult {
        let mut errors = Vec::new();
        let mut warnings = Vec::new();
        
        // Check for forbidden phrases
        for phrase in &self.forbidden_phrases {
            let re = Regex::new(&format!(r"(?i)\b{}\b", regex::escape(phrase))).unwrap();
            if re.is_match(text) {
                errors.push(format!("Forbidden phrase detected: '{}'", phrase));
            }
        }
        
        // Check for required sections
        for section in &self.required_sections {
            let re = Regex::new(&format!(r"(?i)\b{}\b", regex::escape(section))).unwrap();
            if !re.is_match(text) {
                warnings.push(format!("Missing recommended section: '{}'", section));
            }
        }
        
        ValidationResult {
            is_valid: errors.is_empty(),
            errors,
            warnings,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_forbidden_phrases() {
        let validator = DisputeValidator::new();
        let text = "I refuse to pay this debt because it is not mine.";
        let result = validator.validate(text);
        assert!(!result.is_valid);
        assert!(!result.errors.is_empty());
    }

    #[test]
    fn test_valid_dispute() {
        let validator = DisputeValidator::new();
        let text = "My personal information: John Doe. I am disputing the account identification 12345 because the dispute reason is that this account does not belong to me.";
        let result = validator.validate(text);
        assert!(result.is_valid);
        assert!(result.errors.is_empty());
    }
}
