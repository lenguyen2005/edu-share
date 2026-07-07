export const COMMENT_QUERY_KEYS = {
  all: ["comments"] as const,

  byDocument(documentId: string) {
    return [...this.all, documentId] as const;
  },
};