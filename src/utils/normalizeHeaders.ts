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

export default normalizeHeaders;
