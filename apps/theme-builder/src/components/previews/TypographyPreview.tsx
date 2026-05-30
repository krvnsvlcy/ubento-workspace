import {
  Card,
  Code,
  Heading,
  InlineCode,
  Overline,
  Text,
  tones,
} from "@ubento/bento.arlo-core";

export default function TypographyPreview() {
  return (
    <div className="space-y-8 @container">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Heading level="h1">Typography Specimen</Heading>
          <Text shade="subtle">
            Visual breakdown of headings, prose sizing, font weights, tones, and
            inline/block code components.
          </Text>
        </div>
      </div>

      {/* Grid Layout to Showcase Typography */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6">
        {/* Column 1: Headings & Hierarchy */}
        <div className="flex flex-col gap-6">
          <Card variant="outline" padding="md" gap={20}>
            <div>
              <Heading level="h2">Heading Hierarchy</Heading>
              <Text shade="subtle">
                Structural titles using standard heading levels
              </Text>
            </div>
            <hr />

            <div className="space-y-4">
              <div className="space-y-1">
                <Overline>Heading 1</Overline>
                <Heading level="h1">H1 Main Section Title</Heading>
              </div>
              <hr />

              <div className="space-y-1">
                <Overline>Heading 2</Overline>
                <Heading level="h2">H2 Subsection Title</Heading>
              </div>
              <hr />

              <div className="space-y-1">
                <Overline>Heading 3</Overline>
                <Heading level="h3">H3 Minor Section Header</Heading>
              </div>

              <hr />

              <div className="space-y-1">
                <Overline>Heading 4</Overline>
                <Heading level="h4">H4 Small Meta Title</Heading>
              </div>
            </div>
          </Card>

          <Card variant="outline" padding="md" gap={16}>
            <div>
              <Heading level="h2">Code Elements</Heading>
              <Text shade="subtle">Block and inline code rendering styles</Text>
            </div>
            <hr />

            <div className="space-y-3">
              <Text size="sm">
                You can import components directly from{" "}
                <InlineCode>@ubento/bento.arlo-core</InlineCode> and use theme
                presets.
              </Text>

              <div className="space-y-1">
                <Overline>Code Block</Overline>
                <Code>{`import { Heading } from "@ubento/bento.arlo-core";\n\nexport default function Section() {\n  return (\n    <Heading level="display">Hello Bento</Heading>\n  );\n}`}</Code>
              </div>
            </div>
          </Card>
        </div>

        {/* Column 2: Text Sizing & Weight */}
        <div className="flex flex-col gap-6">
          <Card variant="outline" padding="md" gap={20}>
            <div>
              <Heading level="h2">Body Text Sizing</Heading>
              <Text shade="subtle">Prose sizes from extra large to small</Text>
            </div>
            <hr />

            <div className="space-y-4">
              <div className="space-y-1">
                <Overline>Extra Large (xl)</Overline>
                <Text size="xl">
                  Ubento theme builder lets you design premium component tokens
                  effortlessly.
                </Text>
              </div>
              <hr />

              <div className="space-y-1">
                <Overline>Large (lg)</Overline>
                <Text size="lg">
                  Ubento theme builder lets you design premium component tokens
                  effortlessly.
                </Text>
              </div>
              <hr />

              <div className="space-y-1">
                <Overline>Medium / Default (md)</Overline>
                <Text size="md">
                  Ubento theme builder lets you design premium component tokens
                  effortlessly.
                </Text>
              </div>
              <hr />

              <div className="space-y-1">
                <Overline>Small (sm)</Overline>
                <Text size="sm">
                  Ubento theme builder lets you design premium component tokens
                  effortlessly.
                </Text>
              </div>
            </div>
          </Card>

          <Card variant="outline" padding="md" gap={20}>
            <div>
              <Heading level="h2">Font Weights</Heading>
              <Text shade="subtle">Visual weight matrix</Text>
            </div>
            <hr />

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-semibold text-content-muted">
                  Regular
                </span>
                <Text weight="regular" size="lg">
                  Regular 400 Weight
                </Text>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-semibold text-content-muted">
                  Medium
                </span>
                <Text weight="medium" size="lg">
                  Medium 500 Weight
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-content-muted">
                  Semibold
                </span>
                <Text weight="semibold" size="lg">
                  Semibold 600 Weight
                </Text>
              </div>
            </div>
          </Card>
        </div>

        {/* Column 3: Tone & Shade Matrix */}
        <div className="flex flex-col gap-6">
          <Card variant="outline" padding="md" gap={20}>
            <div>
              <Heading level="h2">Shade Variations</Heading>
              <Text shade="subtle">
                Foreground opacity variations based on context
              </Text>
            </div>
            <hr />

            <div className="space-y-4">
              <div className="space-y-1">
                <Overline>Default</Overline>
                <Text shade="default">
                  This is the default text color shade.
                </Text>
                <Heading level="h3" shade="default">
                  Heading default shade
                </Heading>
              </div>
              <hr />

              <div className="space-y-1">
                <Overline>Subtle</Overline>
                <Text shade="subtle">
                  This is a subtle text color shade (75% opacity).
                </Text>
                <Heading level="h3" shade="subtle">
                  Heading subtle shade
                </Heading>
              </div>
              <hr />

              <div className="space-y-1">
                <Overline>Muted</Overline>
                <Text shade="muted">
                  This is a muted text color shade (50% opacity).
                </Text>
                <Heading level="h3" shade="muted">
                  Heading muted shade
                </Heading>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card variant="outline" padding="md" gap={20}>
        <div>
          <Heading level="h2">Tones</Heading>
          <Text shade="subtle">Semantic tone values applied to typography</Text>
        </div>
        <hr />

        <div className="grid grid-cols-4 gap-4">
          {tones.map((tone) => (
            <div
              className="space-y-1 bg-surface p-4 rounded-xl"
              data-tone={tone}
            >
              <Overline>{tone}</Overline>
              <Text shade="default">{tone}</Text>
              <Heading level="h3" shade="default">
                {tone}
              </Heading>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
