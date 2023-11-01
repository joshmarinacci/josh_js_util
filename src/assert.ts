export function equals_any<V>(a: V, b: V) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return equals_array(a as any[], b as any[]);
  }
  return a === b;
}
export function equals_array(a1: any[], b1: any[]): boolean {
  if (a1.length !== b1.length) return false;
  for (let i = 0; i < a1.length; i++) {
    let a = a1[i];
    let b = b1[i];
    if (!equals_any(a, b)) return false;
  }
  return true;
}
export function assert_eq<V>(message: string, a: V, b: V) {
  let matched = equals_any(a, b);
  if (!matched) {
    console.error(`${message} failed`, a, "not equal to", b);
    throw new Error(`${message}`);
  }
  console.info("PASSED:", message);
}
