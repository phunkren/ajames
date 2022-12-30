
One of my favourite talks to come out of ReactFest London was Siddharth Kshetrapal’s [presentation on the frontend workflow](https://www.youtube.com/watch?v=bLgZwFRYTJ4). As he explained that design systems can fall short due to miscommunication amongst the project disciplines, I was reminded of a similar experience with a designer on a React project. We were discussing the inconsistencies in vertical rhythm between his design and the application’s frontend build. To illustrate his point, he opened the design in Sketch and enabled the grid view.


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/765c189a-0577-457d-9c77-e53b963fa3df/sketch-design-grid.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T115209Z&X-Amz-Expires=3600&X-Amz-Signature=39eeba8777106a3be9d9a8cd72699439798e5a5a3326048cf711b4ae3c164c46&X-Amz-SignedHeaders=host&x-id=GetObject)


1.1: Sketch’s design grid


Sketch’s grid is a visual overlay allowing designers to create a high precision layout. I assumed that constant spacing between components would result in consistent vertical rhythm, yet the demonstration highlighted that despite the components being evenly distributed on the page, their respective content was not.


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/08652dc5-a3f7-4a09-8ac9-ebcd82ba1075/vertical-rhythm.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T115209Z&X-Amz-Expires=3600&X-Amz-Signature=60a24d334cbdf26a040ac3385fd50aeb97daa82c55cc47334009b8c8d59fcc5c&X-Amz-SignedHeaders=host&x-id=GetObject)


1.2: Vertical rhythm example


Since the application was designed with a grid overlay, I put together a similar treatment for the frontend by adding a styled component to the application root. The grid will sit on top of the entire application, and so is fixed to the viewport using `position: fixed` with a high `z-index` and `pointer-events` disabled.


The grid is generated using a [repeating-linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-linear-gradient) on the component’s `background` property. The grid lines are comprised of two sections: an opaque coloured grid line, and a transparent interval. Custom props allow the consumer to configure the color, width, interval and direction of each line, with default values serving as a fallback (the values below emulate a 12 column vertical grid layout).


```javascript
import styled from 'styled-components';
import { rgba } from 'polished';

export const GridOverlay = styled.div(
  ({
    color = 'black',
    width = `${100 / 12}%`,
    interval = `${100 / 12}%`,
    direction = 'vertical',
  }) => css`
    ${position('fixed', '0', '0', '0', '0')};
    background: repeating-linear-gradient(
      ${direction === 'vertical' ? '-90deg' : '0'},
      ${rgba(color, 0.2)},
      ${rgba(color, 0.2)} ${width},
      transparent ${width},
      transparent calc(${width} + ${interval})
    );
    pointer-events: none;
    z-index: 999;
  `,
);
```


With the overlay in place, we can now accurately compare the vertical rhythm of our Sketch design with the production build, and edge a little closer to pixel perfect design (if that’s your bag). To demonstrate the output, I quickly added the overlay to a personal site. `direction="horizontal"` emulates Sketch’s regular grid, where `direction="vertical"` resembles the layout grid.


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4cf79f51-282d-4a78-8823-8689b2c20879/grid-overlay-horizontal.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T115209Z&X-Amz-Expires=3600&X-Amz-Signature=64adc2c48a95a5505c32c2ca5a12919121436ab6a0343a712dfd48151eff5b12&X-Amz-SignedHeaders=host&x-id=GetObject)


1.3: Grid overlay (horizontal)


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1d064ef9-c647-4e87-a8ba-e6bf6e150b95/grid-overlay-vertical.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221230T115209Z&X-Amz-Expires=3600&X-Amz-Signature=9ff25d35af47bbc2c05582b3fb0c859d75edfd0796c23f255380455b37e3063b&X-Amz-SignedHeaders=host&x-id=GetObject)


1.4: Grid overlay (vertical)


The overlay brought with it a sense of accomplishment. Aside from the obvious functional benefit, we took the time to understand each other’s approach to the project and optimised the workflow as a result. Each of these progressions, however minor, further enriches a formulated middle ground where I believe lies a truly collaborative effort and yields the best results.

