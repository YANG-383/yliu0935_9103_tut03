# yliu0935_9103_tut03
## Part 1: Imaging Technique Inspiration
We chose Wheels of Fortune by Pacita Abad. This work uses repeated concentric circles and dotted textures to create a strong rhythm and dynamics, which gave us a good design inspiration. One of my inspirations came from the kaleidoscope I played with when I was a child, which uses the mirror principle to change a part of the image to present a rich changing effect. Another is the striped texture that often appears in science fiction movies, which creates a deep science fiction feeling through dense lines.

![Kaleidoscope Demo](assets/Kaleidoscope-screenshot.png)
![Another Demo](assets/maravilha-roda-movimento-luzes-com-cifrao.jpg)

## Part 2: Coding Technique Exploration
By treating the artwork as a texture and drawing a ring of triangular slices whose number and radii respond to user input, one can reveal segments of the image in a rhythmic, kaleidoscopic way. Sampling pixel colors for each slice ensures the triangles reflect the original painting, while smoothly interpolating between inner and outer boundaries creates pulsing motion. Mapping interactive control to pointer movement adjusts segment density in real-time. This technology can be used to achieve interesting interactions and rich visual experiences.

Reference example:[Triangle Strip](https://p5js.org/examples/angles-and-motion-triangle-strip/)

![Code screenshot](assets/code.png)