type Headers = Record<string, string>;

// To properly merge headers, we have to make sure to take casing into account.
// For example, `content-type` and `Content-Type` are the same header, even
// though they have different casing. This utility ensures headers are case-
// insensitively merged together

export const mergeHeaders = (...headers: (Headers | undefined)[]) => {
  return headers
    .filter(Boolean)
    .reduce<Headers>(
      (memo, headers) => ({ ...memo, ...normalizeHeaders(headers) }),
      {}
    );
};

const normalizeHeaders = (headers: Record<string, string> | undefined) => {
  if (!headers) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(headers).map(([name, value]) => {
      return [name.toLowerCase(), value];
    })
  );
};
