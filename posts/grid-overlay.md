
One of my favourite talks from ReactFest London was Siddharth Kshetrapal's [presentation on the frontend workflow](https://www.youtube.com/watch?v=bLgZwFRYTJ4). Their discussion about how design systems can be undermined by misunderstandings between project disciplines reminded me of a similar experience I had with a designer on a React project. We were discussing the inconsistencies in vertical rhythm between their design and the application's frontend build. To illustrate their point, they opened the design in Sketch and enabled the grid view.


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/765c189a-0577-457d-9c77-e53b963fa3df/sketch-design-grid.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230102T214938Z&X-Amz-Expires=3600&X-Amz-Signature=af852e6d7d4da563213de3cd6a5b6e97a045a63f0880453ed99e541c42bc208e&X-Amz-SignedHeaders=host&x-id=GetObject)


1.1: Sketch’s design grid


Sketch's grid is a visual overlay that enables designers to create a highly precise layout. I had assumed that constant spacing between components would result in consistent vertical rhythm, but the demonstration showed that even though the components were evenly distributed on the page, their respective content was not.


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/08652dc5-a3f7-4a09-8ac9-ebcd82ba1075/vertical-rhythm.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230102T214938Z&X-Amz-Expires=3600&X-Amz-Signature=cb0955dc47b520e62870b611565d0f5b387cd62834baf19d0bddcb9f0feb0ab2&X-Amz-SignedHeaders=host&x-id=GetObject)


1.2: Vertical rhythm example


To address the issue of inconsistent vertical rhythm, I created a similar treatment for the frontend by adding a styled component to the application root. The grid would sit on top of the entire application, fixed to the viewport using **`position: fixed`** with a high **`z-index`** and **`pointer-events`** disabled.


The grid was generated using a [**repeating-linear-gradient**](https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-linear-gradient) on the component's **`background`** property. The grid lines were made up of two sections: an opaque coloured grid line and a transparent interval. Custom props allowed the consumer to configure the colour, width, interval, and direction of each line, with default values serving as a fallback (the values below emulate a 12-column vertical grid layout).


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


With the overlay in place, we were able to more accurately compare the vertical rhythm of our Sketch design with the production build and edge closer to pixel-perfect design (if that's your goal). To demonstrate the output, I quickly added the overlay to a personal site. Setting **`direction="horizontal"`** emulates Sketch's regular grid, while **`direction="vertical"`** resembles the layout grid.


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4cf79f51-282d-4a78-8823-8689b2c20879/grid-overlay-horizontal.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230102T214938Z&X-Amz-Expires=3600&X-Amz-Signature=9325fa506d80f4224a311fa308d382ba27cbadc4b01a73678c0b24ee6572878d&X-Amz-SignedHeaders=host&x-id=GetObject)


1.3: Grid overlay (horizontal)


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1d064ef9-c647-4e87-a8ba-e6bf6e150b95/grid-overlay-vertical.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230102T214938Z&X-Amz-Expires=3600&X-Amz-Signature=d36c18d4d36368d45ff478b1ce2d49618c0c79e1e6469cfb84221c66ff79377f&X-Amz-SignedHeaders=host&x-id=GetObject)


1.4: Grid overlay (vertical)


Adding the grid overlay to the application was a rewarding experience. In addition to its practical value, it also helped us to understand each other's approaches to the project and improve the workflow as a result. It's these small progressions that lead to truly collaborative efforts and produce the best results.

