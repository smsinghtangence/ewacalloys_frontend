// Contact form rules, shared by the form (instant feedback) and /api/contact (the check that can't be skipped).
// Strapi's contact-submission controller runs the same rules again before saving.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Letters (any language), spaces and the punctuation real names use.
const NAME_PATTERN = /^[\p{L}][\p{L} .'-]*$/u;
// Digits with an optional leading +, and spaces, dashes or brackets between them.
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

export const CONTACT_FIELDS = ["name", "phone", "email", "country", "interestedIn", "message"];
export const MESSAGE_MAX_LENGTH = 2000;

export function normalizeContact(values) {
  const text = (key) => (typeof values?.[key] === "string" ? values[key].trim() : "");
  return {
    name: text("name").replace(/\s+/g, " "),
    phone: text("phone"),
    email: text("email").toLowerCase(),
    country: text("country"),
    interestedIn: text("interestedIn"),
    message: text("message"),
  };
}

// Returns the error message for one field, or "" when it's valid.
export function validateContactField(field, value) {
  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (value.length < 2 || value.length > 100) return "Name must be between 2 and 100 characters.";
      if (!NAME_PATTERN.test(value)) return "Name can only contain letters, spaces, and . ' -";
      return "";
    case "phone": {
      if (!value) return "Please enter your phone number.";
      const digits = value.replace(/\D/g, "");
      if (!PHONE_PATTERN.test(value) || digits.length < 7 || digits.length > 15) {
        return "Please enter a valid phone number (7–15 digits).";
      }
      return "";
    }
    case "email":
      if (!value) return "Please enter your email address.";
      if (value.length > 254 || !EMAIL_PATTERN.test(value)) return "Please enter a valid email address.";
      return "";
    case "country":
      return value ? "" : "Please select your country.";
    case "interestedIn":
      return value ? "" : "Please select what you are interested in.";
    case "message":
      if (!value) return "Please enter your message.";
      if (value.length < 10) return "Message must be at least 10 characters.";
      if (value.length > MESSAGE_MAX_LENGTH) return `Message must be under ${MESSAGE_MAX_LENGTH} characters.`;
      return "";
    default:
      return "";
  }
}

// Returns { field: message } for every invalid field; an empty object means the form is valid.
export function validateContact(values) {
  const normalized = normalizeContact(values);
  const errors = {};
  for (const field of CONTACT_FIELDS) {
    const message = validateContactField(field, normalized[field]);
    if (message) errors[field] = message;
  }
  return errors;
}
