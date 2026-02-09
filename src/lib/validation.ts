// Anti-spam validation for phone and email

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "tempmail.com", "guerrillamail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
  "dispostable.com", "trashmail.com", "fakeinbox.com", "maildrop.cc",
  "10minutemail.com", "temp-mail.org", "getnada.com",
];

const FAKE_EMAIL_PATTERNS = [
  /^test@test\./i,
  /^aaa@aaa\./i,
  /^abc@abc\./i,
  /^fake@/i,
  /^asdf@/i,
  /^qwerty@/i,
  /^noreply@/i,
  /^no@no\./i,
];

export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");

  if (digits.length < 9) {
    return "Il numero di telefono deve avere almeno 9 cifre.";
  }

  // All same digits
  if (/^(\d)\1+$/.test(digits)) {
    return "Inserisci un numero di telefono valido.";
  }

  // Repeating pattern (e.g. 123123123)
  for (let len = 1; len <= 4; len++) {
    const pattern = digits.substring(0, len);
    if (pattern.repeat(Math.ceil(digits.length / len)).substring(0, digits.length) === digits) {
      return "Inserisci un numero di telefono valido.";
    }
  }

  // Sequential digits (ascending or descending)
  let ascending = true;
  let descending = true;
  for (let i = 1; i < digits.length; i++) {
    if (parseInt(digits[i]) !== (parseInt(digits[i - 1]) + 1) % 10) ascending = false;
    if (parseInt(digits[i]) !== (parseInt(digits[i - 1]) - 1 + 10) % 10) descending = false;
  }
  if (ascending || descending) {
    return "Inserisci un numero di telefono valido.";
  }

  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return null; // optional field

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Inserisci un indirizzo email valido.";
  }

  const domain = email.split("@")[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return "Non accettiamo email temporanee. Usa un indirizzo email reale.";
  }

  for (const pattern of FAKE_EMAIL_PATTERNS) {
    if (pattern.test(email)) {
      return "Inserisci un indirizzo email reale.";
    }
  }

  return null;
}
