import { validateCpf } from '../src/utils/validateCpf';

test.each(["97456321558", "71428793860", "87748248800"])(
  "Deve testar um cpf válido: %s",
  (cpf: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(true);
  }
);

test.each([null, undefined, "11111111111", "111", "1111111111111111"])(
  "Deve testar um cpf inválido: %s",
  (cpf: any) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  }
);
test.each([
  "12345678901",
  "00000000000",
  "11111111111",
  "22222222222",
  "33333333333",
  "44444444444",
  "55555555555",
  "66666666666",
  "77777777777",
  "88888888888",
  "99999999999"
])(
  "Deve testar um cpf com todos os dígitos iguais: %s",
  (cpf: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  }
);