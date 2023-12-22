export const requiredRule = [
  (v: any) =>
    ![null, undefined, ''].includes(v) || 'Dieses Feld muss gefüllt sein',
]
export const usernameRules = [
  ...requiredRule,
  (v: string) => !!v || 'Username darf nicht leer sein',
  (v: string) =>
    /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(v)
    || 'Username muss validieren',
]
export const passwordRules = [
  ...requiredRule,
  (v: string) => !!v || 'Password darf nicht leer sein',
  (v: string) =>
    /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(
      v,
    )
    || 'Password muss mehr als 6 Buchstabieren. Geben Sie mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen ein',
]
export const confirmPasswordRules = [
  ...passwordRules,
]
export const emailRules = [
  ...requiredRule,
  (v: string) => !!v || 'E-mail darf nicht leer sein',
  (v: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v,
    ) || 'E-mail muss validieren',
]
