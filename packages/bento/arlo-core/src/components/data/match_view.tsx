import * as React from "react";

export type MatchViewCase<K extends PropertyKey> = {
    /** The key that should match `value` (strict equality). */
    when: K;
    /** Render function for this case. */
    render: () => React.ReactNode;
};

export type MatchViewProps<K extends PropertyKey> = {
    /** Current value to match against cases. */
    value: K | null | undefined;
    /** Cases to match; first match wins. */
    cases: ReadonlyArray<MatchViewCase<K>>;
    /** Optional fallback when no case matches (or value is null/undefined). */
    fallback?: () => React.ReactNode;
};

/**
 * MatchView
 * A tiny "pattern match" renderer: picks the first case whose `when === value` and renders it.
 */
export function MatchView<K extends PropertyKey>({
    value,
    cases,
    fallback,
}: MatchViewProps<K>) {
    if (value == null) return fallback ? fallback() : null;

    const hit = cases.find((c) => c.when === value);
    return hit ? hit.render() : fallback ? fallback() : null;
}

/**
 * Helper to get strong typing on `cases` without `as const` noise.
 *
 * Usage:
 *   const cases = matchCases([
 *     { when: "loading", render: () => <Loading/> },
 *     { when: "ready", render: () => <Ready/> },
 *   ] as const);
 */
export function matchCases<const K extends PropertyKey>(
    cases: ReadonlyArray<MatchViewCase<K>>,
) {
    return cases;
}
