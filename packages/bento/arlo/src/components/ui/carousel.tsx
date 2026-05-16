import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Carousel as CoreCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../core/ui/carousel.js";
import * as React from "react";

export const Carousel = createComponent({
  props: z.object({
    orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
    showArrows: z.boolean().default(true),
  }),

  summary: "A carousel component for sliding through content.",
  instructions: [
    "Use this component to display a collection of items in a slider.",
    "Pass children to render as slides.",
    "The `orientation` prop controls the direction of sliding.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreCarousel
        ref={ref}
        orientation={props.orientation}
        className="w-full relative"
      >
        <CarouselContent>
          {React.Children.map(children, (child, index) => (
            <CarouselItem key={index}>{child}</CarouselItem>
          ))}
        </CarouselContent>
        {props.showArrows && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </CoreCarousel>
    );
  },
});
