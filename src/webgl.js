//Vars
let transformationMatrix = new TransformationMatrix();
let perspectiveVector;
let square,simpelShader,realShader,simpelRectShader,realRectShader;

//Shader Loading
function loadShader(gl, shadername, type)
{
    let shader = type === "fragment" ? gl.createShader(gl.FRAGMENT_SHADER) : (type === "vertex" ? gl.createShader(gl.VERTEX_SHADER) : null);
    if(shader == null) return null;
    gl.shaderSource(shader, window[shadername]());
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.log("Shader Compilation failed: "+shadername + gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
function initShaderProgram(gl, frag_shadername)
{
    let fragmentShader = loadShader(gl, frag_shadername, "fragment");
    let vertexShader = loadShader(gl, "fljs_vertex_shader", "vertex");

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        console.log("Shader initialisation failed: " + frag_shadername);
    }

    gl.useProgram(shaderProgram);
    let vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    return shaderProgram;
}

function initSquareBuffer(gl)
{
    let squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    let vertices = [
        1,  1,  0.0,
        -1, 1,  0.0,
        1,  -1, 0.0,
        -1, -1, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    return squareVerticesBuffer;
}



function getCurrentShader()
{
    switch(fl_type)
    {
        case 1: return simpelShader;
        case 2: return realShader;
        case 4: return realShader;
        case 5: return simpelRectShader;
        case 6: return realRectShader;
        case 7: return simpelRectShader;
        case 8: return realRectShader;
        default: return simpelShader;
    }
}

let drawWebGL2 = function (gl)
{
    let shaderProgram = getCurrentShader();
    let xf = -(window.innerWidth/2 - fl_data.x) / (window.innerWidth/2);
    let yf = (window.innerHeight/2 - fl_data.y) / (window.innerHeight/2);
    transformationMatrix.setTranslation(xf,yf,0);
    let sf = fl_data.size / fl_data.default;
    transformationMatrix.setScale(sf,sf * fl_data.height, sf);

    gl.useProgram(shaderProgram);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    setUniformTransformationMatrix(gl, shaderProgram , transformationMatrix.getMatrixAsArray());
    setUniformPerspectiveVector(gl, getCurrentShader() , perspectiveVector.getVectorAsArray());
    gl.bindBuffer(gl.ARRAY_BUFFER, square);
    gl.vertexAttribPointer(gl.getAttribLocation(shaderProgram, 'aVertexPosition'), 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

function initWebGL(canvas)
{
    let gl = canvas.getContext("webgl2");
    if(!gl)
    {
        console.log("JS Flashlight: No WebGL2 context found");
        return false;
    }
    console.log("JS Flashlight using WebGL2");
    draw = drawWebGL2;
    fl_data.size = 40;
    fl_type = 3;
    gl.clearColor(0.375, 0.375, 0.375, 0.6875);
    gl.clear(gl.COLOR_BUFFER_BIT);
    square = initSquareBuffer(gl);

    simpelShader = initShaderProgram(gl, "fljs_fragment_shader_real_simple");
    realShader = initShaderProgram(gl, "fljs_fragment_shader_real");
    simpelRectShader = initShaderProgram(gl, "fljs_fragment_shader_rect");
    realRectShader = initShaderProgram(gl, "fljs_fragment_shader_rect_real");

    transformationMatrix.setCompleteScale(fl_data.size/200);
    transformationMatrix.translate(0,0,-1);

    setUniformBGColor(gl,simpelShader, [0.375, 0.375, 0.375, 0.6875]);
    setUniformBGColor(gl,realShader, [0.375, 0.375, 0.375, 0.6875]);
    setUniformBGColor(gl,simpelRectShader, [0.375, 0.375, 0.375, 0.6875]);
    setUniformBGColor(gl,realRectShader, [0.375, 0.375, 0.375, 0.6875]);

    perspectiveVector = new PerspectiveVector(canvas.clientWidth/canvas.clientHeight);
    setUniformPerspectiveVector(gl, getCurrentShader() , perspectiveVector.getVectorAsArray());
    window.addEventListener( 'resize', function(e)
    {
        ctx.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        perspectiveVector.updateAspectRatio(gl.drawingBufferWidth/gl.drawingBufferHeight);
    }, false );

    return gl;
}