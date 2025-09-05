
export const validateSubscriptionId = (id: string): boolean => {
  if (!id || typeof id !== 'string') return false;
  
  const trimmedId = id.trim();
  
  return trimmedId.length >= 3 && trimmedId.length <= 50;
};


export const validateGateId = (gateId: string): boolean => {
  if (!gateId || typeof gateId !== 'string') return false;
  const trimmedId = gateId.trim();
  return /^[a-zA-Z0-9-_]+$/.test(trimmedId) && trimmedId.length >= 1 && trimmedId.length <= 20;
};


export const validateZoneId = (zoneId: string): boolean => {
  if (!zoneId || typeof zoneId !== 'string') return false;
  
  const trimmedId = zoneId.trim();
  return /^[a-zA-Z0-9-_]+$/.test(trimmedId) && trimmedId.length >= 1 && trimmedId.length <= 20;
};

export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 100);
};

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  const digitsOnly = phone.replace(/\D/g, '');
  
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
};
