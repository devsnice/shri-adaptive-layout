/**
 * It's my test solution of processing video with WebGL
 * https://www.youtube.com/watch?v=_ZQOUQsw_YI - interesting video about webgl
 * and yes, it works, but there's a problem with quality of video
 */
class WebglVideo {
  constructor({ video, videoPlayer }) {
    this.video = video;
    this.videoPlayer = videoPlayer;
    this.stopVideo = false;

    this.canvas = null;
  }

  calculateBrightness(value) {
    // от -0.5 до 0.5, 0 - картинка без изменений
    return (value - 50) / 100;
  }

  show({ webglInited, brightness }) {
    if (!webglInited) {
      this.canvas = document.createElement("canvas");

      this.canvas.style.width = "auto";
      this.canvas.style.height = "100%";

      this.videoPlayer.appendChild(this.canvas);
    } else {
      this.stopVideo = true;
    }

    const gl = this.canvas.getContext("webgl");

    // Create new program using gsls
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(255, 255, 255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertShaderSource = `
        attribute vec2 position;
        varying vec2 texCoords;
        
        void main() {
          texCoords = (position + 1.0) / 2.0;
          texCoords.y = 1.0 - texCoords.y;
          gl_Position = vec4(position, 0, 1.0);
        }
      `;

    const fragShaderSource = `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        
        void main() {
          float brightness = ${this.calculateBrightness(brightness)};
          vec4 color = texture2D(textureSampler, texCoords);
          color.rgb += brightness;
          gl_FragColor = color;
        }
      `;

    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertShader, vertShaderSource);
    gl.shaderSource(fragShader, fragShaderSource);

    gl.compileShader(vertShader);
    gl.compileShader(fragShader);

    const program = gl.createProgram();

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);

    gl.linkProgram(program);

    gl.useProgram(program);

    /** Magic
     * set rectange
     */
    const vertices = new Float32Array([
      -1,
      -1,
      -1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      -1
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);
    /** Magic end */

    const draw = () => {
      requestAnimationFrame(() => {
        const texture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          this.video
        );

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        if (!this.stopVideo) {
          draw();
        } else {
          this.stopVideo = false;
        }
      });
    };

    draw();
  }
}

export default WebglVideo;
