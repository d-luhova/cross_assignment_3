const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿА-Яа-яІіЇїЄєҐґ'’ -]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

export function getNameError(name: string) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Name is required.";
  }

  if (trimmedName.length < 2 || trimmedName.length > 40) {
    return "Name must be 2-40 characters.";
  }

  if (!NAME_PATTERN.test(trimmedName)) {
    return "Use only letters, spaces, hyphen or apostrophe.";
  }

  return "";
}

export function getPhoneError(phone: string) {
  const trimmedPhone = phone.trim();
  const digitCount = trimmedPhone.replace(/\D/g, "").length;

  if (!trimmedPhone) {
    return "Phone is required.";
  }

  if (!PHONE_PATTERN.test(trimmedPhone)) {
    return "Use only digits, +, spaces, brackets or hyphen.";
  }

  if (digitCount < 7 || digitCount > 15) {
    return "Phone must contain 7-15 digits.";
  }

  if (trimmedPhone.length > 20) {
    return "Phone must be no longer than 20 characters.";
  }

  return "";
}
