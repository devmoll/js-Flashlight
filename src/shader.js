function fljs_fragment_shader_rect ()
{
    return `#version 300 es
    
    precision mediump float;

    uniform vec4 bg_color;
    
    in vec4 color;
    out vec4 outColor;
    
    void main(void) 
    {
        vec4 sp = color * 1.1;
        vec4 slideColor = vec4(0,0,0,0);
        
        slideColor = mix(slideColor, bg_color, smoothstep(0.8,1.0, abs(sp.x)));
        slideColor = mix(slideColor, bg_color, smoothstep(0.8,1.0, abs(sp.y)));
        outColor = slideColor;
        
    }
    `;
}

function fljs_fragment_shader_rect_real ()
{
    return `#version 300 es
    
    precision mediump float;

    uniform vec4 bg_color;
    
    in vec4 color;
    out vec4 outColor;
    
    void main(void) 
    {
        vec4 sp = color * 1.1;

        float steps[6] = float[6](0.0,0.80,0.91,0.93,0.95,0.96);
        
        vec4 colors[5] = vec4[5](
            vec4(0),
            vec4(0,0,0.5,0.0125),
            vec4(0.1098,0.2471,0.3255,0.3666),
            vec4(0.4745,0.3686,0.5255, 0.6),
            bg_color
            );
        
        vec4 mash_color = colors[0];
        
        for(int i=0;i < colors.length();i++)
        {   
            mash_color = mix(mash_color, colors[i], smoothstep(steps[i],steps[i+1], abs(sp.x)));
            mash_color = mix(mash_color, colors[i], smoothstep(steps[i],steps[i+1], abs(sp.y)));
        }
        
        outColor = mash_color;
        
        vec4 slideColor = vec4(0,0,0,0);
        
        slideColor = mix(slideColor, bg_color, smoothstep(0.78,1.0, abs(sp.x)));
        slideColor = mix(slideColor, bg_color, smoothstep(0.78,1.0, abs(sp.y)));
        outColor = mix( mash_color,slideColor, 0.85);
        
    }
    `;
}

function fljs_fragment_shader_real ()
{
    return `#version 300 es
    
    precision mediump float;

    uniform vec4 bg_color;
    
    in vec4 color;
    out vec4 outColor;
    
    void main(void) 
    {
        vec4 sp = color * 1.0;
        
        float visibility = clamp(pow((distance(sp.xy, vec2(0,0))), 0.6), 0.0,1.0);
        
        float steps[6] = float[6](0.0,0.83,0.88,0.93,0.96,1.0);
        
        vec4 colors[6] = vec4[6](
            vec4(0),
            vec4(0),
            vec4(0,0,1,0.0125),
            vec4(0.1098,0.2471,0.5255,0.5666),
            vec4(0.4745,0.3686,0.5255,1),
            vec4(0.4745,0.3686,0.5255,0.75));
        
        vec4 mash_color = colors[0];
        
        for(int i=1;i < steps.length();i++)
        {   
            mash_color = mix(mash_color, colors[i], smoothstep(steps[i-1],steps[i], (distance(sp.xy, vec2(0,0)))));
        }
        
        vec4 slideColor = vec4(0,0,0,0);
        
        slideColor = mix(slideColor, bg_color, smoothstep(0.78,1.0, (distance(sp.xy, vec2(0,0)))));
        
        outColor = mix( mash_color,slideColor, visibility);
        
    }
    `;
}

function fljs_fragment_shader_real_simple ()
{
    return `#version 300 es
    
    precision mediump float;

    uniform vec4 bg_color;
    
    in vec4 color;
    out vec4 outColor;
    
    void main(void) 
    {
        vec4 sp = color * 1.1;
        vec4 slideColor = vec4(0,0,0,0);
        
        slideColor = mix(slideColor, bg_color, smoothstep(0.78,1.0, (distance(sp.xy, vec2(0,0)))));
        outColor = slideColor;
        
    }
    `;
}

function fljs_vertex_shader ()
{
    return `#version 300 es
    
    in vec2 aVertexPosition;
    uniform mat4 transformationMatrix;
    uniform vec4 perspectiveVector;
    
    out vec4 color;

    void main(void)
    {
        color = vec4(aVertexPosition, 0.0, 1.0);
        
        gl_Position =  perspectiveVector * color * transformationMatrix;
    }
    `;
}

function setUniformTransformationMatrix(gl, shaderProgram, data_array)
{
    gl.useProgram(shaderProgram);
    let uniform = gl.getUniformLocation(shaderProgram, "transformationMatrix");
    gl.uniformMatrix4fv(uniform, false, new Float32Array(data_array));
}

function setUniformBGColor(gl, shaderProgram, data_array)
{
    gl.useProgram(shaderProgram);
    let uniform = gl.getUniformLocation(shaderProgram, "bg_color");
    gl.uniform4fv(uniform, new Float32Array(data_array));
}

function setUniformPerspectiveVector(gl, shaderProgram, data_array)
{
    gl.useProgram(shaderProgram);
    let uniform = gl.getUniformLocation(shaderProgram, "perspectiveVector");
    gl.uniform4fv(uniform, new Float32Array(data_array));
}