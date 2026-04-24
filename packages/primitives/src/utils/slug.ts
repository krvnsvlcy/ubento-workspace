const adjectives = [
  "cool",
  "smart",
  "fast",
  "brave",
  "bright",
  "calm",
  "eager",
  "fancy",
  "grand",
  "happy",
  "jolly",
  "kind",
  "lucky",
  "noble",
  "proud",
  "quick",
  "sharp",
  "super",
  "tough",
  "vivid",
  "wild",
  "young",
  "bold",
  "clear",
  "fresh",
  "great",
  "light",
  "merry",
  "prime",
  "quiet",
  "sleek",
  "solid",
  "swift",
  "vast",
  "wise",
  "zealous",
  "agile",
  "basic",
  "clean",
  "daily",
  "elite",
  "final",
  "giant",
  "hardy",
  "inner",
  "just",
  "keen",
  "loyal",
  "magic",
  "neat",
];

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function generateSlug(name?: string): string {
  const base = name ? slugify(name) : "";
  const filteredBase = base.length >= 3 ? base : "";

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  if (filteredBase) {
    return filteredBase;
  }

  // Generate a random name if no valid base
  const randomName = ["app", "project", "site", "web", "hub"][
    Math.floor(Math.random() * 5)
  ];
  return `${adjective}-${randomName}-${Math.floor(Math.random() * 1000)}`;
}
